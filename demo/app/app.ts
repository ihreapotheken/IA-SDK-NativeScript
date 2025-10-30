/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application } from '@nativescript/core'
import { registerSwiftUI, UIDataDriver } from '@nativescript/swift-ui'

// A. You can generate types for your own Swift Provider with 'ns typings ios'
// B. Otherwise you can ignore by declaring the class name you know you provided
declare const SampleViewProvider: any

registerSwiftUI(
  'sampleView',
  (view) => new UIDataDriver(SampleViewProvider.alloc().init(), view),
);

Application.run({ moduleName: 'app-root' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/