import { GestureEventData, Frame, EventData, Page } from '@nativescript/core'
import { MainPageModel } from './main-view-model'

export function navigatingTo(args: EventData) {
  const page = <Page>args.object
  page.bindingContext = new MainPageModel()
}

/**
 * Called when the "Dashboard" button is tapped.
 * Matches tap="onDashTap" in the XML.
 */
export function onDashTap(args: GestureEventData) {
    console.log("Navigating to Dashboard");
    
    const frame = Frame.topmost();

    // Replace '~/dashboard/dashboard-page' with your actual page path.
    frame.navigate("~/dashboard/dashboard-page");
}

/**
 * Called when the "Profile" button is tapped.
 * Matches tap="onProfileTap" in the XML.
 */
export function onProfileTap(args: GestureEventData) {
    console.log("Navigating to Profile");
    
    const frame = Frame.topmost();

    // Replace '~/profile/profile-page' with your actual page path.
    frame.navigate("~/profile/profile-page");
}