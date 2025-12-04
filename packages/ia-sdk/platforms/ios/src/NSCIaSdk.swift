import Combine
import Foundation
import IACore
import IAIntegrations
import IAOrdering
import IAOverTheCounter
import SwiftUI
import UIKit

@MainActor
@objcMembers
@objc(NSCIaSdk)
class NSCIaSdk: NSObject {
  static var isRegistered: Bool = false

  public func initIaSdk(
    accessKey: String,
    clientId: String,
    serverEnvironment: String,
    completionHandler: @escaping (String?) -> Void,
  ) {
    IASDK.configuration.apiKey = accessKey
    IASDK.configuration.clientID = clientId
    let specifiedServerEnvironment: EnvironmentID
    switch serverEnvironment {
    case "development":
      specifiedServerEnvironment = EnvironmentID.dev
      break
    case "staging":
      specifiedServerEnvironment = EnvironmentID.staging
      break
    case "production":
      specifiedServerEnvironment = EnvironmentID.prod
      break
    default:
      fatalError("Invalid environment ID: \(serverEnvironment)")
    }
    IASDK.setEnvironment(specifiedServerEnvironment)
    if !Self.isRegistered {
      IASDK.register([
        .integrations,
        .overTheCounter,
        .ordering,
        .apofinder,
      ])
    }
    let masterDelegate = IaClientDelegate()
    IASDK.setDelegates(
      sdk: masterDelegate,
      ordering: masterDelegate,
      prescription: masterDelegate,
      cardLink: masterDelegate,
    )
    Task.init {
      do {
        let prerequisitesOptions = IASDKPrerequisitesOptions(
          shouldShowIndicator: true,
          isCancellable: true,
          isAnimated: true,
          shouldRunLegal: true,
          shouldRunOnboarding: false,
          shouldRunApofinder: true,
        )
        let _ = try await IASDK.initialize(
          options: .init(
            shouldShowIndicator: false,
            prerequisitesOptions: prerequisitesOptions
          ),
        )
        completionHandler(nil)
      } catch {
        completionHandler("\(String(describing: error)) \(error.localizedDescription)")
      }
    }
  }

  /**
    * Forwards the client personal information to the ia.de library for checkout purposes.
    */
  public func setGuestUserData(
    salutation: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumberCountryCode: Int,
    phoneNumberWithoutCountryCode: Int,
    completionHandler: @escaping (String?) -> Void,
  ) {
    let iaSalutation: IAUserSalutation
    switch salutation.lowercased() {
    case "herr":
      iaSalutation = IAUserSalutation.male
    case "frau":
      iaSalutation = IAUserSalutation.female
    case "keine angabe":
      iaSalutation = IAUserSalutation.notSpecified
    default:
      iaSalutation = IAUserSalutation.diverse
    }
    Task.init {
      do {
        let userData = IAUserData(
          salutation: iaSalutation,
          firstName: firstName,
          lastName: lastName,
          countryCode: String(phoneNumberCountryCode),
          phoneNumber: String(phoneNumberWithoutCountryCode),
          email: email,
        )
        try await IASDK.setUserData(userData)
        completionHandler(nil)
      } catch {
        completionHandler("\(String(describing: error)) \(error.localizedDescription)")
      }
    }
  }

  public func transferPrescriptions(
    images: [Data]? = nil,
    pdfs: [Data]? = nil,
    codes: [String]? = nil,
    orderId: String? = nil,
    finishAction: String,
    completionHandler: @escaping (String?) -> Void,
  ) {
    Task.init {
      do {
        try await IAOrderingSDK.deleteCart()
        var specifiedFinishAction: TransferPrescriptionsFinishAction = .noAction
        switch finishAction {
        case "noAction":
          specifiedFinishAction = TransferPrescriptionsFinishAction.noAction
          break
        case "openCart":
          specifiedFinishAction = TransferPrescriptionsFinishAction.openCart
          break
        case "showBottomSheet":
          specifiedFinishAction = TransferPrescriptionsFinishAction.showBottomSheet
          break
        default:
          fatalError("Invalid finish action ID: \(finishAction)")
        }
        try await IAOrderingSDK.transferPrescriptions(
          images: images,
          pdfs: pdfs?.map { pdfBytes in PDFPrescription(data: pdfBytes) },
          codes: codes,
          orderID: orderId,
          finishAction: .noAction,
        )
        IaClientViews.cartScreen.iaScreen().present()
        completionHandler(nil)
      } catch {
        completionHandler("\(String(describing: error)) \(error.localizedDescription)")
      }
    }
  }

  public func startDashboardActivity(
    completionHandler: @escaping (String?) -> Void,
  ) {
    IaClientViews.startScreen.iaScreen().present()
  }

  public func finishAllActivities(
    completionHandler: @escaping (String?) -> Void,
  ) {
    UIApplication.shared.rootViewController?.dismiss(animated: true)
    completionHandler(nil)
  }

  public func clearCart(
    completionHandler: @escaping (String?) -> Void,
  ) {
    Task.init {
      do {
        try await IAOrderingSDK.deleteCart()
        completionHandler(nil)
      } catch {
        completionHandler("\(String(describing: error)) \(error.localizedDescription)")
      }
    }
  }

  public func logout(
    completionHandler: @escaping (String?) -> Void,
  ) {
    Task.init {
      do {
        try await IASDK.deleteAllUserRelatedData()
        completionHandler(nil)
      } catch {
        completionHandler("\(String(describing: error)) \(error.localizedDescription)")
      }
    }
  }

  /**
  * Order signature codes provided on successful checkout.
  */
  @objcMembers
  @objc(SignatureCodes)
  public class SignatureCodes: NSObject {
    var iaOrderCode: String
    var internalOrderCode: String

    public init(
      iaOrderCode: String,
      internalOrderCode: String
    ) {
      self.iaOrderCode = iaOrderCode
      self.internalOrderCode = internalOrderCode
    }
  }

  private var cancellable: Any?

  public func listenForSignatures(_ callback: @escaping (SignatureCodes?) -> Void) {
    cancellable = Self.orderSignatureListener.sink { value in
      callback(value)
    }
  }

  static public var orderSignatureListener = CurrentValueSubject<SignatureCodes?, Never>(nil)
}

class IaClientDelegate: SDKDelegate, OrderingDelegate, PrescriptionDelegate, CardLinkDelegate {
  func orderingWillShowThankYouScreen(orders: [IAOrder], dismissable: (any Dismissable)?)
    -> HandlingDecision
  {
    if let order = orders.first, let clientOrderID = order.clientOrderID {
      NSCIaSdk.orderSignatureListener.value = NSCIaSdk.SignatureCodes(
        iaOrderCode: order.orderCode,
        internalOrderCode: clientOrderID,
      )
      return .handled
    }
    return .performDefault
  }
}

/// Collection of views available for client display.
enum IaClientViews: CaseIterable {
  /**
   * Dashboard screen displaying main app content.
   */
  case startScreen

  /**
   * Cart screen displaying order overview.
   */
  case cartScreen

  /**
   * String identifier getter definition.
   */
  var name: String {
    return String(describing: self)
  }

  /**
   * Visual interface representation.
   */
  func iaScreen() -> any IAScreen {
    switch self {
    case IaClientViews.startScreen:
      IAStartScreen()

    case IaClientViews.cartScreen:
      IACartScreen()
    }
  }
}
