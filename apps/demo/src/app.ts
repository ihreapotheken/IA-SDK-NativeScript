import { Application, isAndroid } from '@nativescript/core';

const IA_SDK_ACTIVITY_PACKAGE_PREFIX = 'de.ihreapotheken.sdk.';

if (isAndroid) {
  // Apply display cutout insets so content is not rendered under the camera
  // notch on devices with enforced edge-to-edge display (Android 15+).
  Application.android.on('activityCreated', (args: any) => {
    const activity = args.activity;
    if (activity.getClass().getName().startsWith(IA_SDK_ACTIVITY_PACKAGE_PREFIX)) return;
    const contentView = activity.findViewById(android.R.id.content) as android.view.ViewGroup;
    androidx.core.view.ViewCompat.setOnApplyWindowInsetsListener(
      contentView,
      new androidx.core.view.OnApplyWindowInsetsListener({
        onApplyWindowInsets(view: android.view.View, insets: androidx.core.view.WindowInsetsCompat) {
          const bars = insets.getInsets(androidx.core.view.WindowInsetsCompat.Type.systemBars() | androidx.core.view.WindowInsetsCompat.Type.displayCutout());
          view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
          return insets;
        },
      }),
    );
    androidx.core.view.ViewCompat.requestApplyInsets(contentView);
  });
}

// With IA_E2E=true (injected by webpack.config.js) the app boots a minimal
// SDK-init smoke page used by the cross-platform E2E test; otherwise the demo.
declare const IA_E2E: boolean;

Application.run({
  moduleName: typeof IA_E2E !== 'undefined' && IA_E2E ? 'e2e/smoke-page' : 'app-root',
});
