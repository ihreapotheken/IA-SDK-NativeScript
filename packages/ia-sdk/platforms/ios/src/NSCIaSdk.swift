import Combine
import Foundation
import IACore
import IAIntegrations
import IAOrdering
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
        .ordering,
        .apofinder,
      ])
    }
    IASDK.setDelegate(
      IaClientDelegate(),
    )
    Task.init {
      do {
        let prerequisitesOptions = IASDKPrerequisitesOptions(
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
   * Configures the ia.de SDK.
   *
   * @param options Dictionary with configuration keys:
   *   - "footerShouldShowDataProcessing": Bool
   */
  public func configureIaSdk(
    _ options: [String: Any]
  ) {
    if let footerShouldShowDataProcessing = options["footerShouldShowDataProcessing"] as? Bool {
      IASDK.configuration.footer.shouldShowDataProcessing = footerShouldShowDataProcessing
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
        try await IASDK.ordering.deleteCart()
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
        try await IASDK.ordering.transferPrescriptions(
          images: images,
          pdfs: pdfs?.map { pdfBytes in PDFPrescription(data: pdfBytes, insuranceType: .privateInsurance) },
          codes: codes,
          orderID: orderId,
          showActivityIndicator: false,
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

  public func setPharmacyId(
    pharmacyId: String,
    completionHandler: @escaping (String?) -> Void,
  ) {
    Task.init {
      do {
        guard let pharmacyIdInt = Int(pharmacyId) else {
          completionHandler("Failed to convert pharmacyId to Int")
          return
        }
        try await IASDK.Pharmacy.setPharmacyID(pharmacyIdInt)
        completionHandler(nil)
      } catch {
        completionHandler("\(String(describing: error)) \(error.localizedDescription)")
      }
    }
  }

  public func clearCart(
    completionHandler: @escaping (String?) -> Void,
  ) {
    Task.init {
      do {
        try await IASDK.ordering.deleteCart()
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
        try await IASDK.clearAllData()
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

class IaClientDelegate: SDKDelegate {
  func orderingDidFinishOrders(orders: [IAOrder]) {
    guard let orderCode = orders.first?.orderCode else { return }
    guard let clientOrderID = orders.compactMap(\.clientOrderID).first else { return }
    NSCIaSdk.orderSignatureListener.value = NSCIaSdk.SignatureCodes(
      iaOrderCode: orderCode,
      internalOrderCode: clientOrderID,
    )
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
