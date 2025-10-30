import { EventData } from "@nativescript/core/data/observable";
import { Page } from "@nativescript/core/ui/page";

/**
 * This function is called when the page is about to be displayed.
 */
export function onNavigatingTo(args: EventData) {
    const page = args.object as Page;
    console.log("Navigated to Dashboard Page");
}