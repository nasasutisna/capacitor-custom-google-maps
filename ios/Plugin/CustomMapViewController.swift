import UIKit
import Capacitor
import GoogleMaps

class CustomWKWebView: WKWebView {
    open override func hitTest(_ point: CGPoint, with event: UIEvent?) -> UIView? {
        let view = super.hitTest(point, with: event)
        return view
    }
}

class CustomMapViewController: CAPBridgeViewController, UIScrollViewDelegate {
    open override func webView(with frame: CGRect, configuration: WKWebViewConfiguration) -> WKWebView {
        return CustomWKWebView(frame: frame, configuration: configuration)
    }
}
