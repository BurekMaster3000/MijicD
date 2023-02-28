/**
* This is the MVC architectural pattern-based entry point for the program. 
* The controller, which joins the model and the view but also serves as 
* the application's 'brain', is currently being initialized.
* The controller manages the communication between the model and the view. 
* The controller conveys any changes to the model and keeps track of how the user interacts with the view.
*/

import { CakeView } from './view/CakeView.js';
import { CakeController } from './controller/CakeController.js';
import { CakeModel } from './model/CakeModel.js';

import { FormView } from './view/FormView.js';
import { FormController } from './controller/FormController.js';
import { FormModel } from './model/FormModel.js';

class App {
    constructor() {
        /*
         * as soon as App is instantiated, the code is on the way the requested page. 
         * In order to obtain the url window.location.href is used. 
         * With the usage of regular expression, the page name from the url is extracted.
         * The match() method of the string returns the outcome of comparing a string to a regular expression.
         * Return value is either null if no matches are discovered, or an Array whose contents depend 
         * on whether the global (g) flag is present or not.
         */
        const url = window.location.href; //getting the url
        let page = null;   // match returns an array of matches

        /**
         * regex
         */
        if (url.match(/[a-z]+.html/) != null) {
            page = url.match(/[a-z]+.html/)[0];
        }

        /**
         * Switching the page the user sees based on which of the two gets requested
         */
        switch (page) {

            case 'form.html':
                new FormController(new FormModel(), new FormView());
                break;
            case 'index.html':
            default:
                new CakeController(new CakeModel(), new CakeView());
                break;

        }
    }
}

/**
 * Initializaiton of the App
 */
const app = new App();

