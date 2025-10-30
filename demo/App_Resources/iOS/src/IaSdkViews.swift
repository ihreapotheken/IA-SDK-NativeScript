import SwiftUI
import IACore
import IAIntegrations
import IAOverTheCounter
import IAOrdering

@objc
class SampleViewProvider: UIViewController, SwiftUIProvider {
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }

  required public init() {
    super.init(nibName: nil, bundle: nil)
  }

  public override func viewDidLoad() {
    super.viewDidLoad()
    setupSwiftUIView(content: swiftUIView)
  }

  private var swiftUIView = IAIntegrations.IAStartScreen()

  /// Receive data from NativeScript
  func updateData(data: NSDictionary) {
      // can be empty
  }

  /// Allow sending of data to NativeScript
  var onEvent: ((NSDictionary) -> ())?
}