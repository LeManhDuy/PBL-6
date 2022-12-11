import AuthenticationService from "../service/AuthenticationService";

// const { REACT_APP_API_ENDPOINT } = process.env;

const REACT_APP_API_ENDPOINT = "https://blue-school-api.onrender.com/";
// const REACT_APP_API_ENDPOINT = "http://localhost:8000/";;;

const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "",
};

function getToken() {
    if (AuthenticationService.isLogin()) {
        let data = JSON.parse(localStorage.getItem("@Login"));
        return data.type + " " + data.accessToken;
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
    formData.append("file", file);
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
    APIPostWithTokenFile,
};

export default HandleApi;
