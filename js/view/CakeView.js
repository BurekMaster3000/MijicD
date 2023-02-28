/**
 * Class that represents the application view. The view displays information 
 * contained in the model: type & color. The view does not obtain the information 
 * directly from the model, it uses the controller as a mediator which instructs 
 * it when and what to display. 
 * 
 * The view holds references to all UI elements with which the user interacts with
 * AND for which the event-handling mechanism needs to be implemented.
 */
export class CakeView {
    constructor() {
        this.cakeForm = document.querySelector("#form-cake");
        this.selectsDiv = document.querySelector("#div-selects");
        this.selects = null;
        this.cakeDiv = document.querySelector("#div-cake");
        this.resetButton = document.querySelector("#reset-button")
        this.submitButton = document.querySelector("#submit-button")
    }

    /**
     * Renders HTML select elements. The options are not loaded in the process,
     * meaning that there are no Option elements as part of the select element.
     *  
     * @param {Array} selectIDs - array of strings (select ids)  
     */
    renderSelects(selectIDs) {
        selectIDs.forEach((name) => {
            let select = document.createElement('select');
            select.setAttribute("id", name);
            select.options.add(new Option(` Select ${name} `, 'undefined'));
            this.selectsDiv.appendChild(select);
        });

        this.selects = this.selectsDiv.querySelectorAll('select');
    }

    /**
     * Resets all next selects, selects that are siblings to the one defined by
     * this method parameter.
     * 
     * @param {type} selectID - the ID of the select which next siblings are going to be reset
     */
    resetNextSiblings(selectID) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        let nextSelect = select.nextElementSibling;
        while (nextSelect) {
            nextSelect.length = 1;
            nextSelect = nextSelect.nextElementSibling;
        }
    }


    /**
     * Funciton that resets all the selects to "undefined" as well as hiding the submit and reset button
     * @param {type} selectID 
     */
    resetSelects(selectID) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        select.value = 'undefined';
        let nextSelect = select.nextElementSibling;

        while (nextSelect) {
            nextSelect.value = 'undefined';
            nextSelect.length = 1;
            nextSelect = nextSelect.nextElementSibling;
        }

        this.submitButton.style.display = "none";
        this.resetButton.style.display = "none";
    }

    /**
     * Adding of the options to a select.
     * 
     * @param {String} selectID
     * @param {Array} options - array of strings (option names)
     */
    addOptions(selectID, options) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);
        select.length = 1;
        options.forEach((option) => {
            select.options.add(new Option(option, option));
        });
    }

    /**
     * Renders the cake image depending on the which of the following select values are choosen.
     * 
     * @returns {undefined}
     */
    renderCake() {
        let imgSrc = 'assets/media/';

        this.selects.forEach((select) => {
            imgSrc += `${select.value}-`;
        });
        imgSrc = imgSrc.slice(0, -1) + '.png'; //remove the last character '-'.

        this.cakeDiv.querySelector('img').src = imgSrc;
    }

    /**
     * A function that determines whether or not the reset button is visible 
     * based on whether or not at least one selection has been made.
     * @param {type} isChanged 
     */
    renderResetButton(isChanged) {
        this.resetButton.style.display = isChanged ? "block" : "none";
    }

    /**
     *A function that determines whether or not the reset button is visible 
     * based on whether or not one set of all three possible selection have been made.
     * @param {type} isFinished 
     */
    renderSubmitButton(isFinished) {
        this.submitButton.style.display = isFinished ? "block" : "none";
    }


}