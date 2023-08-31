export const BASE_URL = "https://swapi.dev/api/"

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

export const getAllCategory = async (nameOfCategory) => {
    return sendAPI("GET", "application/json", null, nameOfCategory);
}

export const getCategory = async (nameOfCategory, id) => {
    return sendAPI("GET", "application/json", null, nameOfCategory + "/" + id);
}

export const getCategoryItem = async (id) => {
    return sendAPI("GET", "application/json", null, id)
}




