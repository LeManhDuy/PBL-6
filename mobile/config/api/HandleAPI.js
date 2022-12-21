import AsyncStorage from '@react-native-async-storage/async-storage';

// const REACT_APP_API_ENDPOINT="http://192.168.1.133:8000/"
//const REACT_APP_API_ENDPOINT = "http://192.168.1.13:8000/"
const REACT_APP_API_ENDPOINT = "https://blue-school-api.onrender.com/"

async function getToken() {
    const data = await AsyncStorage.getItem("@Login")
    if (data !== null) {
        const dataJSON = JSON.parse(data)
        // console.log(dataJSON.accessToken)
        return dataJSON.type + " " + dataJSON.accessToken;
    }
}

function APIGetPublic(url, params) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    return fetch(url, {
        method: "GET",
        body: JSON.stringify(params),
    }).then((response) => response.json());
}

function APIPostPublic(url) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

function APIGetWithToken(url) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    return fetch(url, {
        method: "GET",
        headers: {
            Authorization: getToken(),
        },
    }).then((response) => response.json());
}

function APIPost(url, params) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    }).then((response) => response.json());
}

function APIPostWithToken(url, params) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    return fetch(url, {
        method: "POST",
        headers: {
            Authorization: getToken(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    }).then((response) => response.json());
}

function APIPostWithTokenIMG(url, params) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    return fetch(url, {
        method: "POST",
        headers: {
            Authorization: getToken(),
        },
        body: params,
        redirect: "follow",
    }).then((response) => response.json());
}

function APIPostWithTokenFile(url, file) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    const formData = new FormData();
    formData.append('scheduleFile', file)
    return fetch(url, {
        method: "POST",
        headers: {
            Authorization: getToken(),
        },
        body: formData,
        redirect: "follow",
    }).then((response) => response.json());
}

function APIPutWithToken(url, params) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    return fetch(url, {
        method: "PUT",
        headers: {
            Authorization: getToken(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    }).then((response) => response.json());
}

function APIPutWithTokenIMG(url, params) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    return fetch(url, {
        method: "PUT",
        headers: {
            Authorization: getToken(),
        },
        body: params,
        redirect: "follow",
    }).then((response) => response.json());
}

function APIDelete(url) {
    url = REACT_APP_API_ENDPOINT + "api/" + url;
    return fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: getToken(),
        },
    }).then((response) => response.json());
}

const HandleApi = {
    APIPostPublic,
    APIPost,
    APIGetWithToken,
    APIPostWithToken,
    APIDelete,
    APIPostWithTokenIMG,
    APIPutWithTokenIMG,
    APIPutWithToken,
    APIGetPublic,
    APIPostWithTokenFile
};

export default HandleApi;
