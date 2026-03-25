import { Application, isAndroid } from '@nativescript/core';

if (isAndroid) {
  // Apply display cutout insets so content is not rendered under the camera
  // notch on devices with enforced edge-to-edge display (Android 15+).
  Application.android.on('activityCreated', (args: any) => {
    const activity = args.activity;
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

Application.run({ moduleName: 'app-root' });
