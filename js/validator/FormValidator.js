export class FormValidator {

   /**
    * 
    */
   constructor() {
      this.required_phone = document.querySelector("#required_phone")
      this.required_email = document.querySelector("#required_email")
   }

   /**
    * A process for determining whether the user-provided phone number is legitimate.
    * If the prerequisites listed below are met, no error notice asking the user to 
    * enter data again will appear.
    * @param {type} number 
    * @returns {boolean}
    */
   phoneNumberChecker(number) {

      let validPhone = true;

      if (isNaN(number) || number.toString().length < 10) {
         console.log("Not a number!");

         this.required_phone.style.display = "inline";
         validPhone = false;
      }
      else {
         this.required_phone.style.display = "none";
         validPhone = true;
      }

      return validPhone;
   }
   /**
    *  A system for verifying the accuracy of user-provided email addresses. 
    * The person will not see an error message asking them to enter their data again 
    * if the following conditions are met.
    * @param {type} email 
    * @returns {boolean}
    */
   emailChecker(email) {
      let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      let validEmail = true;

      if (!email.match(validRegex)) {
         console.log("Not email address!");
         this.required_email.style.display = "inline";
         validEmail = false;
      }
      else {
         this.required_email.style.display = "none";
         validEmail = true;
      }

      return validEmail;
   }

   /**
    * A function that will return a false boolean in the event that incorrect
    * phone number and email address inputs given by the user return, preventing 
    * the user from submitting the form.
    * @returns {boolean}
    */
   validateForm() {

      let inputs = document.querySelectorAll("input[type='text']");
      let inputsChecked = true;
      let phoneCheck = true;
      let emailCheck = true;

      inputs.forEach(input => {
         if (input.getAttribute("name") == "email") {
            emailCheck = this.emailChecker(input.value);
         } else if (input.getAttribute("name") == "phone") {
            phoneCheck = this.phoneNumberChecker(input.value);
         }
      });

      if (!phoneCheck || !emailCheck) {
         inputsChecked = false;
      }

      return inputsChecked;

   }

}