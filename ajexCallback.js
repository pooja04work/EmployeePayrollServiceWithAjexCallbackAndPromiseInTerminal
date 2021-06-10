
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        // console.log(methodType + "State Changed Called at: " + showTime() + ": " + xhr.readyState + " States: " + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status == 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
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
}

const getURL = "http://127.0.0.1:3000/employees/1";
function getUserDetails(data) {
    console.log("Get User Data at: " + showTime() + " data: " + data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("made GET AJAX call to server" + showTime());

const deleteURL = "http://127.0.0.1:3000/employees/4";
function userDeleted(data) {
    console.log("user deleted " + showTime() + " data: " + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("made DELETE AJAX call to server" + showTime());

const postURL = "http://127.0.0.1:3000/employees/";
const emplData = { "name": "Harry", "salary": "5000" }
function userAdded(data) {
    console.log("user Added " + showTime() + " data: " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);
console.log("made POST AJAX call to server" + showTime());
