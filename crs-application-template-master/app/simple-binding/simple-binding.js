import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

/**
 * Simple binding of values to a form
 */
export default class SimpleBinding extends ViewBase {
    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    /**
     * Preload values that are needed to initialise the view
     * @param {*} setPropertyCallback 
     */
    async preLoad(setPropertyCallback) {
        const data = {
            firstName: "John",
            lastName: "Doe",
            age: 20
        };

        const label = {
            firstName: "First Name",
            lastName: "Last Name",
            age: "Age",
            reset: "Reset"
        };

        this.setProperty("initialData", {...data});
        this.setProperty("data", data);
        this.setProperty("label", label);
    }

    /**
     * Reset form
     */
    reset() {
        this.setProperty("data", {...this.getProperty("initialData")});
    }
}