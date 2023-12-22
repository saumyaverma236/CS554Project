import {ObjectId} from 'mongodb';

const exportedMethods = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  },

  validName(name, varName) {
    name = name.trim();

    if (nameValid.length === 0){
      throw [400,`Name cannot be an empty string or string with just spaces`];
      return;
    }
    if(!name.match(/^[a-z ,.'-]+$/gi)){
      throw [400,`Name shouldn't contain numbers`];
    }
    if (name.length < 2 || name.length > 26)
      throw [400,`Name should contain atleast 2 characters and less than 26 characters`];
    return name;
  },

  validPassword(password, varName){
    console.log("password check")
    if (!password || password.length < 8 || password.includes(" ")) {
      console.error("Invalid password: length or spaces");
      throw [400,`Password must be at least 8 characters long and cannot contain empty spaces`];
    }
    const upperCase = /[A-Z]/;
    const numberCase = /[0-9]/;
    const specialCharCase = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    if (
      !upperCase.test(password) ||
      !numberCase.test(password) ||
      !specialCharCase.test(password)
    ) {
      console.error("Invalid password: criteria not met");
      throw [400,` Password must contain at least one uppercase character, one number, and one special character`];
    }
    console.log("password", password)
    return password;    
  },
  

  validEmail(email, varName){
    let emailValid = email.trim().toLowerCase();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(emailValid)) {
      throw [400,"Invalid email address"];
    }
    if (!emailValid.endsWith("@gmail.com")) {
      throw [400,"Email domain must be @gmail.com"];
    }
    if (!/^[^\s@]{3,}@gmail\.com$/.test(emailValid)) {
      throw [400,"Email address must have at least 3 characters before the @gmail.com domain"];
    }
    return emailValid;
  }

};

export default exportedMethods;