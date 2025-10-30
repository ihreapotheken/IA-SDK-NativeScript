import { EventData } from "@nativescript/core/data/observable";
import { Page } from "@nativescript/core/ui/page";

/**
 * This function is called when the page is about to be displayed.
 * It matches the navigatingTo="onNavigatingTo" in the XML.
 */
export function onNavigatingTo(args: EventData) {
    const page = args.object as Page;
    console.log("Navigated to Home Page");
    
    // You can add any page initialization logic here
    // (e.g., load data from an API)
}