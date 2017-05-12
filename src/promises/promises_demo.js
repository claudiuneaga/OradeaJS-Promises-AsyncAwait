import * as Promises from './promises.js';

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

console.log('before delay');
Promises.delay(5000).then(delayedShow);
console.log('after delay');

// Timeout the execution of a promise - if it takes too long, reject it
console.log('load with timeout');
Promises.timeout(500, Promises.getUsers())
    .then(data => console.log(data))
    .catch(error => console.log(error));

// Simple Ajax request using promises
console.log('load users');
Promises.getUsers()
    .then(jsonData => console.log(jsonData))
    .catch(error => console.log(error));

// 3 sequential Ajax request with error handling
console.log('load user extras sequentially');
Promises.getUser(1)
    .then(userData => {
        console.log('User data:', userData);
        return Promises.getUserAlbums(1);
    })
    .then(albums => {
        console.log('Albums:', albums);
        return Promises.getPostComments(1);
    })
    .then(comments => console.log('Comments:', comments))
    .catch(error => console.log(error));

// 3 parallel Ajax requests with a trigger when all have completed
console.log('load user extras in parallel');
Promise.all([
    Promises.getUser(1),
    Promises.getPostComments(1),
    Promises.getUserAlbums(1)
])
.then(data => console.log('All done', data))
.catch(error => console.log(error));

const promiseArr = users.map(userURL => Promises.getJSON(userURL));
Promise.all(promiseArr).then(userData => console.log(userData));
