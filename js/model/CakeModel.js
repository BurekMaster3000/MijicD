import { selectData } from '../store/selectData.js';

/**
 * 
 * This is a class whose purpose is showcasing the applicaiton model.
 * The model includes data and details on the cake, including its layers, color
 * and decorations set on it.
 * Information abou thow the cake was selected to be in the form may be extracted 
 * from files that are either locally or remotely hosted or from a database.
 * 
 * The model is not made available to a view directly; rather, the controller 
 * is the one that uses the cake model respectively.
 */
export class CakeModel {
    static store = selectData; // external resource

    /**
     * Creates an object representing the cake model.
     * 
     * @returns {CakeModel} The object representing the cake model.
     */
    constructor() {
        this.layers = "undefined";
        this.flavor = "undefined";
        this.decorations = "undefined";
    }

    /**
     * Returns an array of this object's properties names.
     * The returned array is used by View to dynamically render the selects. 
     * For each Model property, a select is being rendered in View.
     * 
     * @returns {Array} array of property names (strings)
     */
    getProperties() {
        return Object.keys(this);
    }

    /**
     * Gets the data from the external resource to be used as select options.
     * 
     * @param {String} selectID - select ID
     * @returns {Array} array of select's options (strings)
     */
    getOptions(selectID) {
        // 1. extract the data from the external resource (CakeModel.store).
        let options; // a JS object
        switch (selectID) {
            case 'layers':
                options = Object.keys(CakeModel.store);
                // ["cat", "dog"]
                break;
            case 'flavor':
                options = Object.keys(CakeModel.store[this.layers]);
                // ["grey", "red"]} OR ["brown", "blue]
                break;
            case 'decorations':
                options = Object.keys(CakeModel.store[this.layers][this.flavor]);
                break;
        }

        /**
         * returning select options
         */
        return options;
    }

    /**
     * Resets this object's properties to "undefined". Not all properties are
     * going to be reset, only those that are listed after the property defined 
     * by this method parameter. 
     * 
     * @param {layers} property - property from which the reset starts.
     */
    resetNextProperties(property) {
        let properties = Object.keys(this);
        let index = properties.indexOf(property);
        while (++index < properties.length) {
            this[properties[index]] = "undefined";
        }
    }

    /**
     * methid for resetting all properties
     */
    resetAllProperties() {
        let properties = Object.keys(this);
        // for(let index = 0; index < properties.legnth; index++)
        properties.forEach((el, index) => {
            this[properties[index]] = "undefined";
        });

    }

    /**
     * 
     * @returns {boolean}
     * Method that returns true or false depending on wether or not the is requirement 
     * of no selected values being set as "undefined" is met
     */
    isFinished() {
        let values = Object.values(this);
        // returns true if there is no undefined values in model
        return !values.includes("undefined");
    }

    /**
     * 
     * @returns {boolean} 
     * Method that returns true or false depending on wether or not the requirement
     * of at least one selection being changed to "undefined" 
     */
    isChanged() {
        let values = Object.values(this);
        return values[0] !== "undefined";
    }

    /**
     * Method whose role is to save the cake data during the browser session. 
     * The model is kept in Window.localStorage as a JSON string with the key "cake."   
     */
    persist() {
        localStorage.setItem('cake', JSON.stringify(this));

    }
}