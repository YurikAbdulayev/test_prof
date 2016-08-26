function loadTest() {
    localStorage.removeItem("list_answ");
    localStorage.removeItem("counterQ");
    localStorage.removeItem("counter");
    localStorage.removeItem("direction")
    $.getJSON(getUrl() + "api/v1.0/tests", function (data) {
        var out = "";
        for (i = 0; i < data.length; i++) {
            out += "<p><a href='test" + data[i].id + "'>" + data[i].test + "</a></p>";
        }
        document.getElementById("listTest").innerHTML = out;
    })
}