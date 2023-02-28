/**
 * Application controller-representing class. Displaying the data from the model 
 * and presenting it onto the view are the tasks that fall under the role of 
 * the CakeController class. 
 */


export class CakeController {

    /**
     * Creates an object representing the cake controller.
     * 
     * @param {type} model - The model the controller interacts with.
     * @param {type} view - The view the controller interatcs with.
     * @returns {CakeController} The object representing the cake controller.
     */

    constructor(model, view) {
        this.model = model;
        this.view = view;

        /**
         * Rendering all selects
         */
        let properties = this.model.getProperties();
        this.view.renderSelects(properties);

        /**
         * Populating the first select
         */
        let firstSelectID = properties[0];
        this.view.addOptions(firstSelectID, this.model.getOptions(firstSelectID));

        /**
         * register one event handler for all select 'change' events
         */
        this.view.selects.forEach((select) => {
            select.addEventListener('change', this.handleSelectChange);
        });

        /**
         * Register form submit handler
         */
        this.view.cakeForm.addEventListener('submit', this.handleFormSubmit);

        /**
         * Register form reset handler
         */
        this.view.cakeForm.addEventListener('reset', this.handleFormReset);

    }

    /**
     * Dealt with the change event brought on by a select. 
     * After the "change" event was triggered, the code below ran.
     * @param {type} event
     * @returns {undefined}
     */
    handleSelectChange = (event) => {
        let select = event.target;

        /**
         * When a model property is modified, any subsequent model 
         * properties that were defined after it are reset to the 'value'
         * of "undefined."
         */
        this.model[select.id] = select.value;
        this.model.resetNextProperties(select.id);
        console.log(this.model);



        /**
         * Only if the currently selected option differs from the index of 
         * 0 will updating the selectsDiv reset the following selections and 
         * load new choices into the succeeding selection.
         */
        this.view.resetNextSiblings(select.id);
        let nextSelect = select.nextElementSibling;
        if (select.selectedIndex > 0 && nextSelect) {
            this.view.addOptions(nextSelect.id, this.model.getOptions(nextSelect.id));
        }


        /**
         * updating the cakeDiv
         */
        this.view.renderCake();
        this.view.renderResetButton(this.model.isChanged());
        this.view.renderSubmitButton(this.model.isFinished());
    }

    /**
     * 
     * A handler method that will be activated when the submit button on the form is clicked on.
     * @param {type} event 
     */
    handleFormSubmit = (event) => {
        //prevent the default action of a form (prevent submitting it)
        //event.preventDefault();
        this.model.persist();

    }

    /**
     * A handler for resetting all the properties of the cake that the user is trying to make.
     * The all the selects and their properties are reset to their initial stage as well as
     *  having the image of the cake be reset by renderingCake() method.
     * @param {type} event 
     */
    handleFormReset = (event) => {
        this.model.resetAllProperties();
        this.view.resetSelects(this.model.getProperties()[0]);
        this.view.renderCake();
    }


}

