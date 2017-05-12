import * as AsyncAwait from './asyncawait.js';

const baseURL = 'https://jsonplaceholder.typicode.com';
const users = [
    `${baseURL}/users/1`,
    `${baseURL}/users/2`,
    `${baseURL}/users/4`,
    `${baseURL}/users/6`,
    `${baseURL}/users/9`,
];

// Call function after a 5 second delay
function delayedShow() {
    console.log('After 5 sec');
}

async function waitAndShow() {
    await AsyncAwait.delay(5000);
    delayedShow();
}

console.log('before delay');
// Either call an async function that contains an await
waitAndShow();
// or call the function as a Promise in the main code.
AsyncAwait.delay(5000).then(delayedShow);
console.log('after delay');

// Timeout the execution of an async function
console.log('Load with timeout');
async function loadWithTimeout() {
    try {
        const data = await AsyncAwait.timeout(500, AsyncAwait.getUsers());
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// Either call an async function that contains an await
loadWithTimeout();
// or call the function as a Promise in the main code.
AsyncAwait.timeout(500, AsyncAwait.getUsers())
    .then(data => console.log(data))
    .catch(error => console.log(error));

// Simple Ajax request using async/await
console.log('load users');
async function getUsers() {
    try {
        const data = await AsyncAwait.getUsers();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
getUsers();

// 3 sequential Ajax request with error handling
console.log('load user extras sequentially');
async function loadSequentially() {
    try {
        const userData = await AsyncAwait.getUser(1);
        console.log(userData);

        const albums = await AsyncAwait.getUserAlbums(1);
        console.log(albums);

        const comments = await AsyncAwait.getPostComments(1);
        console.log(comments);
    } catch (error) {
        console.log(error);
    }
}
loadSequentially();

// 3 parallel Ajax requests with a trigger when all have completed
console.log('load user extras in parallel');
async function parallelLoad() {
    try {
        const userData = AsyncAwait.getUser(1);
        const albums = AsyncAwait.getUserAlbums(1);
        const comments = AsyncAwait.getPostComments(1);

        console.log(await albums);
        console.log(await userData);
        console.log(await comments);
        console.log('All done');
    } catch (error) {
        console.log(error);
    }
}
parallelLoad();
