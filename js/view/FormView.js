/**
 * A class that stands in for the View. It keeps track of all GUI components 
 * that the user interacts with and exposes methods for doing so in the View.
 */
export class FormView {
    constructor() {
        this.form = document.querySelector('#form-cake-name');
        this.inputs = this.form.querySelectorAll(`input[type="text"]`);
    }

    /**
     * Creates form inputs based on the injected JavaScript object with data.
     * 
     * @param {Object} dataObject - JS object containing input data for this form
     * @returns {undefined}
     */
    createInputs(dataObject) {
        for (let property in dataObject) {
            document.querySelector('div#empty-container #header').insertAdjacentHTML('afterend',
                `<p>${property.charAt(0).toUpperCase() + property.slice(1)}: ${dataObject[property]}</p>`);


        }
        /**
         * String meant for concatination as it will hold the relative path to an image of the
         * custom cake order depending on the attributes the string will recieve and add to the path
         */
        let imageString = "assets/media/"

        /**
         * concatination of the string
         */
        for (let property in dataObject) {
            imageString = imageString.concat(dataObject[property] + '-');
            //checking
            console.log(dataObject[property]);
            //checking
            console.log(imageString);
        }


        /**
         * adding the image to the "empty-container" div eleemnt
         */
        //trimming the last character: '-'
        imageString = imageString.substring(0, imageString.length - 1);
        //converting the stirng to lowercase
        imageString = imageString.toLowerCase();
        //adding the .png tag to the end to signify an image
        imageString = imageString.concat(".png");
        //checking
        console.log(imageString);
        //creating an element that will be inserted into the form.html
        var img = document.createElement("img");
        //changing the source of of the previously instantiated HTML img element
        img.src = imageString;
        //getting the div we want to place the image in
        var src = document.getElementById("empty-container");
        //appending the image
        src.appendChild(img);

    }

}

