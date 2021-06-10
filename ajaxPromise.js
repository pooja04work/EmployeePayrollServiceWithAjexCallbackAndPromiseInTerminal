
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            // console.log(methodType + "State Changed Called at: " + showTime() + ": " + xhr.readyState + " States: " + xhr.status);
            if (xhr.readyState === 4) {
                if (xhr.status == 200 || xhr.status === 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject[{
                        status: xhr.status,
                        statusText: xhr.statusText
                    }];
                    // console.log("XHR Failed");
                    console.log("Handle 400 Clien Error or 500 Server Error" + showTime());
                }
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            // console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + "request send to the server" + showTime());
    });
}

const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: " + showTime() + " data: " + responseText)
    })
    .catch(error => console.log("Get Error Status: " + JSON.stringify(error)));
console.log("made GET AJAX call to server" + showTime());

const deleteURL = "http://127.0.0.1:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log("Delete User Data: " + showTime() + " data: " + responseText)
    })
    .catch(error => console.log("Delete Error Status: " + JSON.stringify(error)));
console.log("made DELETE AJAX call to server" + showTime());

const postURL = "http://127.0.0.1:3000/employees/";
const emplData = { "name": "Harry", "salary": "5000" };
makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        console.log("Post User Data: " + showTime() + " data: " + responseText)
    })
    .catch(error => console.log("Post Error Status: " + JSON.stringify(error)));
console.log("made POST AJAX call to server" + showTime());
