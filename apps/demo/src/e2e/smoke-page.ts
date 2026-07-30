import { EventData, Label, Page } from '@nativescript/core';
import { IaSdk } from '@ihreapotheken/ia-sdk/common';
import { IaSdkBase } from '@ihreapotheken/ia-sdk/types';

declare const APPSDK_ACCESS_KEY: string;

/**
 * Minimal E2E smoke page (booted via IA_E2E — see app.ts).
 *
 * Verifies only what a cross-platform integration test needs: the app launches
 * without crashing and the SDK's initialize() completes successfully. On load it
 * initializes the SDK and sets the label to "SDK initialized" (or the error). The
 * Maestro smoke flow launches the app and asserts that text.
 *
 * The label text is set directly on the view (by id) rather than via data
 * binding so the marker is independent of Observable/binding wiring.
 */
let statusLabel: Label | undefined;

export function navigatingTo(args: EventData) {
  statusLabel = (args.object as Page).getViewById<Label>('status');
  setStatus('Initializing…');
  void run();
}

function setStatus(text: string) {
  console.log('SMOKE_STATUS: ' + text);
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
