const baseURL = 'https://jsonplaceholder.typicode.com';

const delay = async (time) => new Promise(resolve => setTimeout(resolve, time));

const timeout = (time, myPromise) => new Promise((resolve, reject) => {
    myPromise.then(resolve);
    setTimeout(() => { reject(new Error(`Timed out after ${time} ms`)); }, time);
});

const getJSON = (url) => fetch(url).then(response => response.json());
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
