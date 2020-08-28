import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

/**
 * Simple Array of Items
 */
export default class SimpleArray extends ViewBase {
    async connectedCallback() {
        await super.connectedCallback();
        this.load();
    }

    /**
     * Preload values that are needed to initialise the view
     * @param {*} setPropertyCallback
     */
    async preLoad(setPropertyCallback) {
        const items = [
            {
                title: "Item 1",
                isDone: false
            },
            {
                title: "Item 2",
                isDone: false
            }
        ];

        setPropertyCallback("items", items);
    }

    /**
     * Load UI after connected
     */
    load() {
        crsbinding.data.updateUI(this, "items");
        //TODO: SA - Check why this throws an error in console
        //super.load();
    }

    /**
     *Add item
     */
    addItem() {
        const title = prompt("Please enter a unique title", "");
        const valid = this.validate(title);

        if(valid === true) {
            const proxy = crsbinding.data.array(this, "items");
            const newItem = {
                title: title,
                isDone: false
            };

            proxy.push(newItem);
        } else {
            this.addItem();
        }
    }

    /**
     * Remove selected items
     */
    removeItems() {
        let proxy = crsbinding.data.array(this, "items");
        proxy = proxy.filter(x => x.isSelected != true);

        this.setProperty("items", proxy);
    }

    /**
     * Update first item title to "Hello World"
     */
    editFirst() {
        if(this.getProperty("items")[0].length === 0) return;

        crsbinding.data.setProperty(this.getProperty("items")[0], "title", "Hello World");
    }

    /**
     * Validate the received value
     * @param value - {string}
     * @return {boolean}
     */
    validate(value) {
        if(value != null && value != "" && value.length > 0) {
            const proxy = crsbinding.data.array(this, "items");
            if(proxy.filter(x => x.title == value).length === 0) {
                return true;
            }
        }

        return false;
    }
}