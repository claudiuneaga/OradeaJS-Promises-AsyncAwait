import * as Callbacks from './callbacks.js';

var users = [
    Callbacks.baseURL + '/users/1',
    Callbacks.baseURL + '/users/2',
    Callbacks.baseURL + '/users/4',
    Callbacks.baseURL + '/users/6',
    Callbacks.baseURL + '/users/9',
];

// Call function after a 5 second delay
function delayedShow() {
    console.log('After 5 sec');
}

console.log('before delay');
Callbacks.delay(5000, delayedShow);
console.log('after delay');

// Simple JSON load with success and error callbacks
console.log('load users');
try {
    Callbacks.getUsers(
        function (jsonData) {
            console.log(jsonData);
        },
        function (error) {
            console.log(error);
        }
    );
} catch (error) {
    console.log('Ajax error:', error.message);
}

// 3 sequential Ajax requests with their corresponding success and error
// callbacks -> leads to so called "callback hell"
console.log('load user extras sequentially -> callback hell');
try {
    Callbacks.getUser(
        1,
        function (userData) {
            console.log('User data:', userData);
            try {
                Callbacks.getUserAlbums(
                    1,
                    function (albumData) {
                        console.log('Albums:', albumData);
                        try {
                            Callbacks.getPostComments(
                                1,
                                function (comments) {
                                    console.log('Comments:', comments);
                                },
                                function (error) {
                                    console.log(error);
                                }
                            );
                        } catch (error) {
                            console.log('Comments ajax error:', error.message);
                        }
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            } catch (error) {
                console.log('Albums ajax error:', error.message);
            }
        },
        function (error) {
            console.log(error);
        }
    );
} catch (error) {
    console.log('User ajax error:', error.message);
}

// 3 parallel Ajax requests with a trigger when all have completed
console.log('Parallel requests - wait until all of them ready');
var jsonCount = 0;

function dataLoaded (data) {
    jsonCount++
    console.log(jsonCount, data);
    if (jsonCount === users.length) {
        console.log('All done');
    }
}

try {
    users.map(function (userURL) {
        Callbacks.getJSON(
            userURL,
            dataLoaded,
            function (error) {
                console.log(error);
            }
        );
    });
} catch (error) {
    console.log(error.message);
}
