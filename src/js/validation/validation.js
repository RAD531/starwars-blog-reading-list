export const checkIfName = (name) => {
    let regName = /^(?=.{1,50}$)[a-zA-Z]+(?: [a-zA-Z]+)*$/;

    if (checkValidityOfText(name, "string", 1, 50) && regName.test(name)){
        return true;
    }

    return false;
}

export const checkIfEmail = (email) => {
    let regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regEmail.test(email)){
        return true;
    }

    return false;
}

export const checkIfAddress = (address) => {
    if (checkValidityOfText(address, "string", 1, 50)){
        return true;
    }

    return false;
}

export const checkIfPhoneNum = (number) => {
    if (checkValidityOfText(number, "number", 1, 15)){
        return true;
    }

    return false;
}

function checkValidityOfText(value, dataType, minCharLength, maxCharLength) {

    if (dataType === "number"){
        value = parseInt(value);

        if (isNaN(value)){
            return false;
        }
    }

    else if (dataType === "string"){
        value = String(value);
    }

    if (typeof value != dataType || value.length < minCharLength ||  value.length <= 0 || value.length > maxCharLength || value === undefined || value === null) {
        return false;
    }

    return true;
}