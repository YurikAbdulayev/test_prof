/**
 * Created by yurik on 15.08.16.
 */
var j = null;
    var xmlhttp = new XMLHttpRequest();

    function loadCategories() {
        $.getJSON(getUrl() + "api/v1.0/direction/all", function (data) {
        j = data;
        var out = "";
        for (i = 0; i < data.length; i++) {
            out += "<p class='font-all-category'>" +
                    "<a onclick='loadUpdateCategory(" + i + ")'><label>" + data[i]["direction"] + "</label></a>" +
                    "<a href='/category' " +
                    "onclick='deleteCategory(" + data[i]["id"] + ")' class='delete-category'>Видалити</a></p>"
        }
        document.getElementById("all_category").innerHTML = out;
    });
    }

    function deleteCategory(id) {
        var name = "business_c_token";
        var token = getCookie(name);
        var json = '{"token": "' + token + '", "id": "' + id + '"}';
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', getUrl() + "api/v1.0/direction/" + id, false);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // send the collected data as JSON
        xhr.send(JSON.stringify(json));
    }

    function loadUpdateCategory(id) {
        document.getElementById("name_c").value = j[id]["direction"];
        document.getElementById("text_a_name_c").value = "";
        var url = getUrl() + "api/v1.0/dir/" + j[id]["id"];
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var resp = JSON.parse(xmlhttp.responseText);
                document.getElementById("text_a_name_c").value = resp["body"]
            }
        };
        xmlhttp.open("GET", url, false);
        xmlhttp.send();
        document.getElementById("btn").innerHTML = "<button onclick='updateCategory(" + j[id]["id"] + ")' " +
                "class='button'>Оновити</button>"
    }

    function updateCategory(id) {
        alert("update" + JSON.stringify(id));
        var direction = document.getElementById("name_c").value;
        if (direction.length != 0) {
            var directionBody = document.getElementById("text_a_name_c").value;
            if (directionBody.length == 0) {
                directionBody = " ";
            }
            var name = "business_c_token";
            var token = getCookie(name);
            var json = '{"token": "' + token + '", "id": "' + id + '", "direction": "' + direction + '",' +
                    ' "body": "' + directionBody + '"}';
            var xhr = new XMLHttpRequest();
            xhr.open('PUT', getUrl() + "api/v1.0/direction/0", false);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            // send the collected data as JSON
            xhr.send(JSON.stringify(json));
        }
    }

    function createDirection() {
        var direction = document.getElementById("name_c").value;
        if (direction.length != 0) {
            var directionBody = document.getElementById("text_a_name_c").value;
            if (directionBody.length == 0) {
                directionBody = " ";
            }
            var name = "business_c_token";
            var token = getCookie(name);
            var json = '{"token": "' + token + '", "direction": "' + direction + '", "body": "' + directionBody + '"}';
            var xhr = new XMLHttpRequest();
            xhr.open('POST', getUrl() + "api/v1.0/direction/0", false);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            // send the collected data as JSON
            xhr.send(JSON.stringify(json));
        }
    }