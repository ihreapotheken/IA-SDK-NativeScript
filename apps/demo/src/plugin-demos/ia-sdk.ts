import { alert, EventData, isIOS, Observable, Page, View } from '@nativescript/core';
import { DemoSharedIaSdk } from '@demo/shared';
import { IaSdk } from '@ihreapotheken/ia-sdk/common';
import { IaSdkBase, OrderSignatureListener } from '@ihreapotheken/ia-sdk/types';
import { sampleImages, samplePdfs } from './test-data';

declare const APPSDK_ACCESS_KEY: string;
declare const ANDROID_APPSDK_VERSION: string;
declare const IOS_APPSDK_VERSION: string;
declare const APPSDK_SERVER_ENV: string;

const SERVER_ENVIRONMENTS: Record<string, IaSdkBase.ServerEnvironment> = {
  development: IaSdkBase.ServerEnvironment.Development,
  staging: IaSdkBase.ServerEnvironment.Staging,
  production: IaSdkBase.ServerEnvironment.Production,
};

const serverEnvironment = SERVER_ENVIRONMENTS[APPSDK_SERVER_ENV] ?? IaSdkBase.ServerEnvironment.Staging;

// Short environment tag shown to testers, matching scripts/dev-env-setup.sh and the
// launcher labels. Deliberately not the uppercased environment name: `staging` runs
// against the QA backend, and the Flutter and React Native demos both call it QA.
const SERVER_ENVIRONMENT_LABELS: Record<string, string> = {
  development: 'DEV',
  staging: 'QA',
  production: 'PROD',
};

const serverEnvironmentLabel = SERVER_ENVIRONMENT_LABELS[APPSDK_SERVER_ENV] ?? 'QA';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

/** A row of the demo: one SDK call, which shows a spinner while it runs. */
class DemoRow extends Observable {
  isBusy = false;
  /** Dimmed while another row's call runs. */
  isDimmed = false;

  constructor(
    readonly title: string,
    readonly subtitle: string,
    readonly action: () => Promise<unknown>,
    /** The first row of a card draws no divider above itself. */
    readonly isFirst = false,
  ) {
    super();
  }
}

interface DemoSection {
  title: string;
  rows: DemoRow[];
}

function section(title: string, rows: [string, string, () => Promise<unknown>][]): DemoSection {
  return { title, rows: rows.map(([rowTitle, subtitle, action], index) => new DemoRow(rowTitle, subtitle, action, index === 0)) };
}

export class DemoModel extends DemoSharedIaSdk {
  iaSdk = new IaSdk();

  /** Whether `initialize` succeeded, shown in the header. */
  isInitialized = false;

  // Home-screen labels truncate long names, so the environment is repeated here where it is always legible.
  platformLine = `NativeScript · ${isIOS ? 'iOS' : 'Android'} AppSDK ${isIOS ? IOS_APPSDK_VERSION : ANDROID_APPSDK_VERSION} · ${serverEnvironmentLabel}`;

  sections: DemoSection[] = [
    section('Prescriptions', [['Launch Dermanostic Experience', 'Initializes, sets the guest user and transfers sample prescriptions', () => this.launchDermanosticExperience()]]),
    section('SDK', [
      ['Initialize', 'Needed before the other calls', () => this.initialize()],
      ['Start Dashboard', "The SDK's start screen", async () => this.iaSdk.startDashboardActivity()],
    ]),
    section('Pharmacy', [
      ['Set Pharmacy 2163', 'A QA test pharmacy', () => this.iaSdk.setPharmacyId('2163')],
      ['Set Pharmacy 10041', 'A QA test pharmacy', () => this.iaSdk.setPharmacyId('10041')],
      ['Clear Pharmacy', 'Also empties the cart', () => this.iaSdk.clearPharmacy()],
    ]),
    section('Cart and user', [
      ['Clear Cart', 'Removes every prescription from the cart', async () => this.iaSdk.clearCart()],
      ['Transfer SDK v1 Data', 'Moves the user data of AppSDK v1', () => this.iaSdk.transferSDKv1UserData()],
      ['Logout', 'Resets the user data, pharmacy and cart', async () => this.iaSdk.logout()],
    ]),
  ];

  constructor() {
    super();
    this.iaSdk.signatureListener.addEventListener('change', (data) => {
      const observable = data.object as OrderSignatureListener;
      this.iaSdk.finishAllActivities();
      setTimeout(() => {
        alert({
          title: 'Order placed',
          message: 'ia.de order code: ' + observable.value.iaOrderCode + '\nHost app order code: ' + observable.value.hostAppOrderCode,
          okButtonText: 'OK',
        });
      }, 2000);
    });
  }

  /**
   * Runs the tapped row's call: the row shows a spinner and the others are dimmed and take no taps until it settles.
   * A failure is alerted. An arrow function, as rows bind it through their page.
   */
  onRowTap = async (args: EventData) => {
    const row = (args.object as View).bindingContext as DemoRow;
    const rows = this.sections.flatMap((each) => each.rows);
    if (rows.some((each) => each.isBusy)) return;
    row.set('isBusy', true);
    rows.filter((each) => each !== row).forEach((each) => each.set('isDimmed', true));
    try {
      await row.action();
    } catch (error) {
      console.error(`${row.title} failed:`, error);
      alert({ title: `${row.title} failed`, message: error instanceof Error ? error.message : String(error), okButtonText: 'OK' });
    } finally {
      row.set('isBusy', false);
      rows.forEach((each) => each.set('isDimmed', false));
    }
  };

  async initialize() {
    // Configure SDK settings before initialization
    this.iaSdk.configureIaSdk({
      footerShouldShowDataProcessing: false,
    });
    // Demo opts into analytics + automatic crash reporting so the report-service receives
    // events from this build. Production hosts default to `false` and must opt in explicitly.
    await this.iaSdk.initIaSdk(APPSDK_ACCESS_KEY, '6001', serverEnvironment, true);
    this.set('isInitialized', true);
  }

  async launchDermanosticExperience() {
    await this.initialize();
    await this.iaSdk.setGuestUserData(IaSdkBase.Salutation.NotDisclosed, 'First', 'Last', 'Email@email.com', 49, 24332442);
    await this.iaSdk.transferPrescriptions(sampleImages, samplePdfs, ['{"urls":["Task\/test9ba2fee0d07e4ef2b6205f8012e1445b\/$accept?ac=5e24cc059ff244bdbb01efcccf834a6329bdac67a4a64733938fe1b799ac19a9"]}'], 'TEST_CODE');
  }
}
