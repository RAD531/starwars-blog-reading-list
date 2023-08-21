const BASE_URL = "https://playground.4geeks.com/apis/fake/contact/"

const sendAPI = async (method, contentType, body, addToUri) => {

    try {

        let url = BASE_URL;

        if (addToUri){
            url = BASE_URL + addToUri;
        }

        const fetchOptions = {
            method: method,
            headers: {
                "Content-Type": contentType
            }
        };
        
        if (method !== "GET" && body !== undefined && body !== null) {
            console.log('setting body..');
            fetchOptions.body = JSON.stringify(body);
           
        }

        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
            return (`Error: Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    }

    catch (error){
        return (`Error: ${error.message}`);
    }
}

export const getAllContacts = async (agendaSlug) => {
    return sendAPI("GET", "application/json", null, "agenda/" + agendaSlug);
}

export const getContact = async (contactId) => {
    return sendAPI("GET", "application/json", null, contactId);
}

export const createContact = async (contactInfo) => {
    return sendAPI("POST", "application/json", contactInfo);
}

export const updateContact = async (contactInfo, contactId) => {
    return sendAPI("PUT", "application/json", contactInfo, contactId);
}

export const deleteContact = async (contactId) => {
    return sendAPI("DELETE", "application/json", null, contactId);
}

export const deleteContacts = async (agendaSlug) => {
    return sendAPI("DELETE", "application/json", null), agendaSlug;
}