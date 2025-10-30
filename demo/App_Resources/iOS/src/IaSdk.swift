import UIKit
import Foundation
import IACore
import IAIntegrations
import IAOverTheCounter
import IAOrdering

@MainActor
@objcMembers
@objc(NSCIaSdk)
class NSCIaSdk: NSObject {
    public func initIaSdk(
        accessKey: String,
        clientId: String,
        completionHandler: @escaping (Error?) -> Void,
    ) {
      IASDK.configuration.apiKey = accessKey
      IASDK.configuration.clientID = clientId
      IASDK.setEnvironment(.staging)
      IASDK.register([
        .integrations,
        .overTheCounter,
        .ordering,
        .apofinder
      ])
      Task.init {
        do {
          let prerequisitesOptions = IASDKPrerequisitesOptions(
            shouldShowIndicator: true,
            isCancellable: true,
            isAnimated: true,
            shouldRunLegal: false,
            shouldRunOnboarding: false,
            shouldRunApofinder: true,
          )
          let _ = try await IASDK.initialize(
            options: .init(
              prerequisitesOptions: prerequisitesOptions
            ),
          )
          completionHandler(nil)
        } catch {
          completionHandler(error)
        }
      }
    }
}