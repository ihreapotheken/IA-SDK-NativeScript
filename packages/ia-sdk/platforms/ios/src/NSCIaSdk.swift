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
    IASDK.register([
      .integrations,
      .overTheCounter,
      .ordering,
      .apofinder,
    ])
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
        IaClientViews.cartScreen.start()
        completionHandler(nil)
      } catch {
        completionHandler("\(String(describing: error)) \(error.localizedDescription)")
      }
    }
  }

  public func startDashboardActivity(
    completionHandler: @escaping (String?) -> Void,
  ) {
    IaClientViews.startScreen.start()
  }

  public func finishAllActivities(
    completionHandler: @escaping (String?) -> Void,
  ) {
    IaClientViewUIKitViewController.finishAllActivities()
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
    if let order = orders.first {
      NSCIaSdk.orderSignatureListener.value = NSCIaSdk.SignatureCodes(
        iaOrderCode: order.orderCode,
        internalOrderCode: order.clientOrderID!,
      )
    }
    return .handled
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
  func view(navigationController: UINavigationController? = nil) -> AnyView {
    switch self {
    case IaClientViews.startScreen:
      if navigationController == nil {
        return AnyView(IAIntegrations.IAStartScreen())
      } else {
        return AnyView(
          IAIntegrations.IAStartScreen().hostEmbedStyle(
            .navigation(
              onDismiss: {
                navigationController?.dismiss(animated: true)
                navigationController?.popViewController(animated: true)
              }
            )
          )
        )
      }
    case IaClientViews.cartScreen:
      if navigationController == nil {
        return AnyView(IAOrdering.IACartScreen())
      } else {
        return AnyView(
          IAOrdering.IACartScreen().hostEmbedStyle(
            .navigation(
              onDismiss: {
                navigationController?.dismiss(animated: true)
                navigationController?.popViewController(animated: true)
              }
            )
          )
        )
      }
    }
  }

  public func start(
    viewId: String? = nil,
  ) {

    let baseViewController: UIViewController? = UIApplication.shared.connectedScenes
      .compactMap { ($0 as? UIWindowScene)?.keyWindow }
      .first?.rootViewController
    func getTopViewController(base: UIViewController? = baseViewController) -> UIViewController? {
      if let nav = base as? UINavigationController {
        return getTopViewController(base: nav.visibleViewController)
      }
      if let tab = base as? UITabBarController,
        let selected = tab.selectedViewController
      {
        return getTopViewController(base: selected)
      }
      if let presented = base?.presentedViewController {
        return getTopViewController(base: presented)
      }
      return base
    }
    guard
      let topViewController = getTopViewController()
    else {
      fatalError("No UIViewController object found.")
    }
    let viewController = IaClientViewUIKitViewController(
      viewId: viewId ?? name,
    )
    let navController = UINavigationController(
      rootViewController: viewController,
    )
    navController.addChild(viewController)
    navController.modalPresentationStyle = .fullScreen
    topViewController.present(navController, animated: true)
  }
}

@objcMembers
@objc(IaClientViewUIKitViewController)
public class IaClientViewUIKitViewController: UIViewController {
  static private var controllers: [IaClientViewUIKitViewController] = []

  let viewId: String!

  init(
    viewId: String!,
  ) {
    self.viewId = viewId
    super.init(nibName: nil, bundle: nil)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  public override func viewDidLoad() {
    super.viewDidLoad()
    guard
      let swiftUIView = IaClientViews.allCases.first(where: { view in view.name == viewId })?.view(
        navigationController: self.navigationController
      )
    else {
      fatalError("View ID \(viewId!) not defined for display.")
    }
    let hostingController = UIHostingController(
      rootView: swiftUIView,
    )
    addChild(hostingController)
    hostingController.view.translatesAutoresizingMaskIntoConstraints = false
    view.addSubview(hostingController.view)
    NSLayoutConstraint.activate([
      hostingController.view.topAnchor.constraint(equalTo: view.topAnchor),
      hostingController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor),
      hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
      hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
    ])
    hostingController.didMove(toParent: self)
    if !Self.controllers.contains(self) {
      Self.controllers.append(self)
    }
  }

  public override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    navigationController?.setNavigationBarHidden(true, animated: false)
  }

  public override func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    navigationController?.setNavigationBarHidden(false, animated: animated)
    if isMovingFromParent || isBeingDismissed {
      Self.controllers.removeAll(where: { it in it == self })
    }
  }

  public static func finishAllActivities() {
    Task.init {
      for controller in controllers.reversed() {
        controller.dismiss(animated: true)
        controller.navigationController?.popToRootViewController(animated: true)
        controller.navigationController?.popViewController(animated: true)
        controller.navigationController?.dismiss(animated: true)
        try await Task.sleep(nanoseconds: 1_000_000_000)
      }
    }
  }
}
