const baseURL = 'https://jsonplaceholder.typicode.com';

const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

const timeout = (time, myPromise) => new Promise((resolve, reject) => {
    myPromise.then(resolve);
    setTimeout(() => { reject(new Error(`Timed out after ${time} ms`)); }, time);
});

const getJSON = (url) => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.responseType = 'json';

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(new Error(`Error loading JSON ${request.statusText}`));
            }
        }
    };

    request.onerror = function () {
        reject(new Error(`XMLHttpRequest error ${request.statusText}`));
    };

    request.onabort = function () {
        reject(new Error(`XMLHttpRequest abort ${request.statusText}`));
    };

    request.open('GET', url);
    request.send();
});

const getUsers = () => getJSON(`${baseURL}/users`);
const getUser = (id) => getJSON(`${baseURL}/users/${id}`);
const getPostComments = (id) => getJSON(`${baseURL}/posts/${id}/comments`);
const getUserAlbums = (id) => getJSON(`${baseURL}/users/${id}/albums`);

export {
    baseURL,
    delay,
    timeout,
    getJSON,
    getUsers,
    getUser,
    getPostComments,
    getUserAlbums
};
