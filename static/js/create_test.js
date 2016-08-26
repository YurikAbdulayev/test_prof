/**
 * Created by yurik on 07.08.16.
 */
function createTest() {
    var name = "business_c_token";
    var token=getCookie(name);
    // alert(token);
    var json = '{"token":"'+ token +'", "body":"'+ document.getElementById("c_test_name").value +'"}';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', getUrl() + "api/v1.0/create/test" , false);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    // send the collected data as JSON
    xhr.send(JSON.stringify(json));
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
