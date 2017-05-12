var baseURL = 'https://jsonplaceholder.typicode.com';

function delay(time, callbackFunc) {
    setTimeout(function () {
        callbackFunc.apply(this);
    }, time);
}

function timeout(time, callbackFunc) {
    throw(new Error('Sorry, not working with callbacks !'));
}

function getJSON(url, successFunc, errorFunc) {
    var request = new XMLHttpRequest();
    request.responseType = 'json';

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                successFunc(request.response);
            } else {
                errorFunc('Error loading JSON ' + request.statusText);
            }
        }
    };

    request.onerror = function () {
        errorFunc('XMLHttpRequest error ' + request.statusText);
    };

    request.onabort = function () {
        errorFunc('XMLHttpRequest abort ' + request.statusText);
    };

    request.open('GET', url);
    request.send();
}

function getUsers(successFunc, errorFunc) {
    getJSON(baseURL + '/users', successFunc, errorFunc);
}

function getUser(id, successFunc, errorFunc) {
    getJSON(baseURL + '/users/' + id, successFunc, errorFunc);
}

function getPostComments(id, successFunc, errorFunc) {
    getJSON(baseURL + '/posts/' + id + '/comments', successFunc, errorFunc);
}

function getUserAlbums(id, successFunc, errorFunc) {
    getJSON(baseURL + '/users/' + id + '/albums', successFunc, errorFunc);
}

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
