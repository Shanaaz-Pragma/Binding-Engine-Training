import {ViewBase} from "./../../node_modules/crs-binding/crs-view-base.js";

/**
 * Simple Array
 */
export default class SimpleArray extends ViewBase {
    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    async connectedCallback() { 
        await super.connectedCallback();
        await this.load();
    }

    async disconnectedCallback() {    
        await super.disconnectedCallback();
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

        this.setProperty("items", items);
    }

    /**
     * Load UI after connected
     */
    async load() {
        crsbinding.data.updateUI(this, "items");
        super.load();
    }

    /**
     * Prompt for a title and then add a new item with that title and isDone defaulting to false.
     */
    async _addItem() {
        const proxy = crsbinding.data.array(this, "items");
        const title = prompt("Please enter a unique title", "");

        if(title == null || title === "" || proxy.filter(x => x.title === title).length > 0) {
            await this._addItem();
        } 
        else {
            const newItem = {
                title: title,
                isDone: false
            }

            proxy.push(newItem);
        }
    }

    /**
     * Get all the items from the array where isSelected is true and remove them.
     */
    async _removeItems() {
        let proxy = crsbinding.data.array(this, "items");

        //TODO: SA - Check why only 1 is being removed
        for (const item of proxy) {
            const index = proxy.indexOf(item);
            if(item.isSelected === true) {
                //proxy.splice(index, 1);
                proxy = proxy.filter(x => x.title === item.title);
            }
        }
    }

    /**
     * Set the title of the first item in the array to "Hello World"
     */
    async _editFirst() {
        if(this.getProperty("items")[0].length === 0) return;

        crsbinding.data.setProperty(this.getProperty("items")[0], "title", "Hello World");
    }
}