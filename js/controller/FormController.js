/**
 * This class's responsibility is to react to user input. 
 * FOrmtData, an in-built class that makes it simple to create a collection
 * of key-value pairs to represent form fields and their values, 
 * is utilized in this instance.
 */


/**
 * importing the validation of user inputs
 */
import { FormValidator } from "../validator/FormValidator.js";

/**
 * 
 */
export class FormController {
    /**
     * 
     * @param {type} model takes in the cake model as a parameter, the controller interacts with
     * @param {type} view the controller engages with the view after receiving it as a parameter
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.createInputs(this.model.getInputData());
        this.view.form.addEventListener('submit', this.handleFormSubmit);

        /**
         * Instantiating the eventListener for the purpose of checking/validating the input change every time the user tries to input their data
         */
        this.view.inputs.forEach(input => {
            input.addEventListener("change", this.handleInputChange);
        });

        /**
         * instantiating the validator for the form that will check the user inputs which will. later on be added to the cake object in the local storage
         */
        this.validator = new FormValidator();
    }

    /**
     * * A validation of the value set or not set in the 
     * aforementioned data field is triggered each time a 
     * user successfully or unsuccessfully enters values into it.
     * @param {type} event 
     */
    handleInputChange = (event) => {
        let input = event.target;
        this.model[input.name] = input.value;

        if (input.getAttribute("name") == "email") {
            this.validator.emailChecker(input.value);
        } else if (input.getAttribute("name") == "phone") {
            this.validator.phoneNumberChecker(input.value);
        }

    }

    /**
     * 
     * When the submit button is clicked, both the form and the user's input are verified. 
     * A confirmation message is displayed by manipulating the HTML code in the form.html code
     * in the event that the inputs are successful and accurate. If not, a message will appear 
     * asking the user to provide their information again and blocking both the submission
     *  and modification of the cake object in the local storage.
     * @param {type} event 
     */
    handleFormSubmit = (event) => {
        event.preventDefault();

        if (this.validator.validateForm()) {
            console.log("We are all good");
            document.getElementById("confirmation_div").innerHTML =
                `<p>Thank you for ordering! We will reach out to you shortly.</p>`;
            this.model.persist();
            console.log(document.getElementById("cake"));

        } else {
            document.getElementById("confirmation_div").innerHTML =
                `<p>Please retry</p>`;
        }


    }


}


