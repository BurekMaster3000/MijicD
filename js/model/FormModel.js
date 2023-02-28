/**
 * A class with the role of representing the form model. 
 * The model contains information and specifics about the cake, 
 * such as its composition, color, and added decorations. 
 * The input names and values will then be added to the cake object
 * in the local storage as the cakes attributes and properties, 
 * depending on the validity of the user data that was provided.
 */


export class FormModel {

    /**
     * constructor which upon the initialization of the FormModel immediatelly callss the init() funciton
     */
    constructor() {
        this.init();
    }


    /**
     * Initialization of "this" objects properties. New properties are added based on the
     * infromation loaded from the localStorage.
     * 
     * @returns {undefined}
     */
    init() {
        let cake = JSON.parse(localStorage.getItem('cake'));
        for (let property in cake) {
            this[property] = cake[property];
        }
    }

    /**
     * 'This' object is converted into a data object for the view.
     * @returns {Object} a simple data object with inputs for the form view 
     */
    getInputData() {
        // stringify the "this" object to get rid of this object methods
        let inputsString = JSON.stringify(this);
        // return the previously stringified object as plain JS data object
        console.log("hello!!!" + inputsString);
        //returning the result
        return JSON.parse(inputsString);
    }

    /**
     * Function whose role is to save the cake and form data during the browser session. 
     * The model is kept in Window.localStorage as a JSON string with the key "cake."   
     */
    persist() {
        localStorage.setItem('cake', JSON.stringify(this));
    }
}


