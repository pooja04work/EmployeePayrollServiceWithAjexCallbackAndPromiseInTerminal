function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // console.log(methodType + "State Changed Called at: " + showTime() + ": " + xhr.readyState + " States: " + xhr.status);
            // if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
            //     resolve(xhr.responseText);
            // } else if (xhr.status.toString().toString.match('^[2][0-9]{2}$')) {
            if (xhr.readyState === 4) {
                // console.log("Response: " + xhr.response);
                if (xhr.status == 200 || xhr.status === 201) {
                    resolve(xhr.response);
                    // console.log("resolve: " + xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject[{
                        status: xhr.status,
                        statusText: xhr.statusText
                    }];
                    console.log("XHR Failed");
                    // console.log("Handle 400 Clien Error or 500 Server Error" + showTime());
                }

            }
        }
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhttp.statusText
            });
        };

        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        // console.log(methodType + "request send to the server" + showTime());
    });
}