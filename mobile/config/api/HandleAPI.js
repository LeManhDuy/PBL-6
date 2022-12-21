import AsyncStorage from '@react-native-async-storage/async-storage';

// const REACT_APP_API_ENDPOINT="http://192.168.1.133:8000/"
//const REACT_APP_API_ENDPOINT = "http://192.168.1.13:8000/"
const REACT_APP_API_ENDPOINT = "https://blue-school-api.onrender.com/"

async function getToken() {
    const data = JSON.parse(await AsyncStorage.getItem("@Login"))
    return data.type + " " + data.accessToken;
}

async function APIGetPublic(url, params) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    const response = await fetch(url, {
        method: "GET",
        body: JSON.stringify(params),
    });
    return await response.json();
}

async function APIPostPublic(url) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
}

async function APIGetWithToken(url) {
    // const token = await getToken()
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: await getToken(),
        },
    });
    return await response.json();
}

async function APIPost(url, params) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
    return await response.json();
}

async function APIPostWithToken(url, params) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: await getToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });
        return await response.json();
}




const HandleApi = {
    APIPostPublic,
    APIPost,
    APIGetWithToken,
    APIPostWithToken,
    APIGetPublic,

};

export default HandleApi;
