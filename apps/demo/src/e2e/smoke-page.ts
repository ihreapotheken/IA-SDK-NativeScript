import { Application, EventData, Label, Page, Utils } from '@nativescript/core';
import { IaSdk } from '@ihreapotheken/ia-sdk/common';
import { IaSdkBase } from '@ihreapotheken/ia-sdk/types';

declare const APPSDK_ACCESS_KEY: string;

/**
 * Minimal E2E smoke page (booted via IA_E2E — see app.ts).
 *
 * Verifies only what a cross-platform integration test needs: the app launches
 * without crashing and the SDK's initialize() completes successfully. It sets the
 * label to "SDK initialized" (or the error). The Maestro smoke flow launches the
 * app and asserts that text.
 *
 * IMPORTANT: initialize() is deferred to navigatedTo AND until the Android
 * Activity is resumed. The demo initializes on a user tap (after the app is fully
 * up); calling initIaSdk during initial startup — before getCurrentActivity() is
 * ready — leaves the SDK stuck on "Initializing…" forever. Mirroring the demo's
 * timing is what makes init actually complete.
 */
let statusLabel: Label | undefined;
let started = false;

export function navigatingTo(args: EventData) {
  statusLabel = (args.object as Page).getViewById<Label>('status');
  setStatus('Initializing…');
}

export function navigatedTo() {
  if (started) return;
  started = true;
  whenActivityReady(() => void run());
}

function whenActivityReady(cb: () => void) {
  const ready = () => !!(Utils.android && Utils.android.getCurrentActivity());
  if (ready()) {
    setTimeout(cb, 0);
    return;
  }
  const ev = Application.android.activityResumedEvent;
  const handler = () => {
    if (!ready()) return;
    Application.android.off(ev, handler);
    setTimeout(cb, 0);
  };
  Application.android.on(ev, handler);
}

function setStatus(text: string) {
  if (statusLabel) statusLabel.text = text;
}

async function run() {
  const iaSdk = new IaSdk();
  try {
    iaSdk.configureIaSdk({ footerShouldShowDataProcessing: false });
    await iaSdk.initIaSdk(APPSDK_ACCESS_KEY, '6001', IaSdkBase.ServerEnvironment.Staging, true);
    setStatus('SDK initialized');
  } catch (e) {
    setStatus('SDK init failed: ' + e);
  }
}
