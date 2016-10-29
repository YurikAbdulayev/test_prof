/**
 * Created by yurik on 07.08.16.
 */

var ids = [];
var xmlhttp = new XMLHttpRequest();
var list_answers;
var dir_answers;
var l;
var parse_dir_answers;
var id;
var direction = 0;
var tmp_ans = [];
var counterQ;
var counter;
// runTest();
function runTest(t_id) {
    list_answers = localStorage.getItem("list_answ");
    dir_answers = localStorage.getItem("dir_answ");
    direction = localStorage.getItem("direction");
    counterQ = JSON.parse(localStorage.getItem("counterQ"));
    counter = localStorage.getItem("counter");
    if (direction == null) {
        direction = 0;
        localStorage.setItem("direction", direction);
    }
    if (counter == null) {
        counter = 1;
        localStorage.setItem("counter", counter);
    }
    if (counterQ == null) {
        counterQ = '{"c":[]}';
        localStorage.setItem("counterQ", counterQ);
    }
    l = JSON.parse(list_answers);
    parse_dir_answers = JSON.parse(dir_answers);
    id = t_id;
    if (list_answers == null) {
        getListQuestionsIds(id, direction)
    } else {
        nextQuestion()
    }
}

function addCount() {
    counter++;
    localStorage.setItem("counter", counter)

}

function deleteStorage() {
    localStorage.removeItem("list_answ");
    localStorage.removeItem("dir_answ");
    localStorage.removeItem("counterQ");
    localStorage.removeItem("counter");
    localStorage.removeItem("direction");
}

function nextQuestion() {
    var obj = l;
    endPart = false;
    for (qw = 0; qw < obj["count"]; qw++) {
        if (obj["answers"][qw] == null) {
            getQuestion(qw, obj);
            endPart = false;
            break
        }
        else {
            endPart = true;
        }
    }
    if (endPart) {
        calculationAnswers(l["answers"])
    }
}
var max;
function calculationAnswers(list) {
    var listMap = {};
    var listKey = [];
    for (i = 0; i < list.length; i++) {
        var value = 0;
        count = 0;
        for (j = 0; j < list.length; j++) {
            value = list[i];
            if (value == list[j]) {
                count++
            }
        }
        listMap[list[i]] = count;
        listKey[i] = list[i];
    }
    max = 0;
    v = 0;
    var key = 0;
    for (i = 0; i < listKey.length; i++) {
        key = listKey[i];
        for (j = 0; j < listKey.length; j++) {
            v = listMap[key];
            if (v >= listMap[listKey[j]]) {
                max = key;
            }
        }
    }
    var povt = false;
    var povtL = [max];
    keyz = Object.keys(listMap);
    for (z = 0; z < Object.keys(listMap).length; z++) {
        if (listMap[keyz[z]] == listMap[max] && keyz[z] != max) {
            povtL.push(keyz[z]);
            povt = true;
        }
    }
    if (povt) {
        getControlQuestion(povtL);
    } else {
        tmp_ans.push(max);
        counterQ["c"].push(max);
        localStorage.setItem("counterQ", JSON.stringify(counterQ));
        direction = max;
        localStorage.setItem("direction", direction);
        getListQuestionsIds(id, direction)
    }
}

function saveToAnsw() {
    var answer = document.getElementsByName("answer");
    var answCount = answer.length;
    for (a = 0; a < answCount; a++) {
        if (answer[a].checked) {
            tmp_ans.push(parseInt(answer[a].value));
            counterQ["c"].push(parseInt(answer[a].value));
            localStorage.setItem("counterQ", JSON.stringify(counterQ));
            direction = parseInt(answer[a].value);
            localStorage.setItem("direction", direction);
            addCount();
            getListQuestionsIds(id, direction)
        }
    }
}

function parseControl(responseText, listP) {
    var respControl = JSON.parse(responseText);
    q_id = respControl["id"];
    var outAsnwers = "";
    document.getElementById("question_body").innerHTML = respControl["body"];
    outAsnwers += "<div id='myForm'>";
    for (i = 0; i < respControl["answers"].length; i++) {
        for (indexLp = 0; indexLp < listP.length; indexLp++) {
            if (listP[indexLp] == respControl["answers"][i]["direction"]) {
                outAsnwers += "<p class='answer'><input type='radio' class='radio' id='radio" +
                    respControl["answers"][i]["direction"] + "' " +
                    "name='answer' value='" + respControl["answers"][i]["direction"] + "'>" +
                    "<label for='radio" + respControl["answers"][i]["direction"] + "'" +
                    ">" + respControl["answers"][i]["body"] + "</label></p>"
            }
        }
    }
    outAsnwers += "</div>";
    outAsnwers += "<button onclick='saveToAnsw()' type='submit' class='button'>Далі</input>";
    document.getElementById("block_answers_in_q").innerHTML = outAsnwers;
    var count = localStorage.getItem("counter");
    document.getElementById("number_question_in_list").innerHTML = count + " - питання  |";
}

function getControlQuestion(listP) {
    var url = getUrl() + "api/v1.0/control/" + id + "/direction/" + direction;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            parseControl(xmlhttp.responseText, listP);
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
}

function getQuestion(questionId, obj) {
    var url = getUrl() + "api/v1.0/question/" + obj["questions"][questionId];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            parseQuestion(xmlhttp.responseText, questionId, obj);
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
}

function parseQuestion(result, questionId, storage) {
    var obj = JSON.parse(result);
    var count = localStorage.getItem("counter");
    st = storage;
    q_id = questionId;
    var outAsnwers = "";
    document.getElementById("question_body").innerHTML = obj["question"]["body"];
    document.getElementById("number_question_in_list").innerHTML = count + " - питання  |";
    ans = obj["question"];
    outAsnwers += "<div id='myForm'>";
    for (i = 0; i < ans["answers"].length; i++) {
        outAsnwers += "<p class='answer'>" +
            "<input class='radio' type='radio' id='radio" + ans["answers"][i]["id"] + "' " +
            "name='answer' value='" + ans["answers"][i]["direction"] + "'>" +
            "<label for='radio" + ans["answers"][i]["id"] + "'" +
            ">" + ans["answers"][i]["body"] + "</label></p>"
    }
    outAsnwers += "</div>";
    outAsnwers += "<button onclick='calcAnswer(q_id)' type='submit' class='button'>Далі</input>";
    document.getElementById("block_answers_in_q").innerHTML = outAsnwers;
}

function calcAnswer(questionId) {
    var answer = document.getElementsByName("answer");
    var answCount = answer.length;
    for (a = 0; a < answCount; a++) {
        if (answer[a].checked) {
            l["answers"][questionId] = parseInt(answer[a].value);
            localStorage.setItem("list_answ", JSON.stringify(l));
            addCount();
            nextQuestion()
        }
    }
}

function getListQuestionsIds(id, direction) {
    localStorage.removeItem("list_answ");
    var url = getUrl() + "api/v1.0/questions/" + id + "/direction/" + direction;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            parseListIds(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
}

function parseListIds(response) {
    var json = JSON.parse(response);
    if (json["list_ids"].length != 0) {
        for (i = 0; i < json["list_ids"].length; i++) {
            ids[i] = json["list_ids"][i]["question_id"]
        }
        list_answers = '{"count": "' + parseInt(json["list_ids"].length) + '", "answers":[], "questions":[' + ids + ']}';
        localStorage.setItem("list_answ", list_answers);
        dir_answers = '{"answ":[]}';
        localStorage.setItem("dir_answ", dir_answers);
        runTest(id)
    } else {
        finish();
    }
}

function getDirection(id) {
    var url = getUrl() + "api/v1.0/direction/" + id;
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            return JSON.stringify(JSON.parse(xmlhttp.responseText));
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
}

function finish() {
    counterQ = localStorage.getItem("counterQ");
    var keyz = JSON.parse(counterQ);
    var d = localStorage.getItem("dir_answ");
    document.getElementById("number_question_in_list").innerHTML =
        "<a onclick='deleteStorage()' href='/test" + id + "'>Почати спочатку</a> |";
    var faculty;
    d = JSON.parse(d);

    var url = getUrl() + "api/v1.0/direction/" + keyz["c"][0];
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            faculty = JSON.parse(xmlhttp.responseText)
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();

    var out = "";
    var aboutYour = "";
    // alert("check keys ");
    if (keyz["c"][1] != null) {

        url = getUrl() + "api/v1.0/dir/" + keyz["c"][1];
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                aboutYour = JSON.parse(xmlhttp.responseText);
                // alert("keys exist");
            }
        };
        xmlhttp.open("GET", url, false);
        xmlhttp.send();

    }
    if (id == 1) {
                // alert("it`s id 1");
        out = "<h1 class='head-text'>Найкраще для тебе підійде освітній напрям <b>«" +
            faculty["direction"] + "»!</b></h1>" +
            "<img src='../static/img/" + keyz["c"][1] + ".jpg' alt='' class='image'>" +
            "<p class='result'>";
        // if (!aboutYour["body"].empty()) {
        //     out += aboutYour["body"];
            out += "Test message";
        // }
        // alert(faculty["direction"]);
        // alert(aboutYour);
    } else {
        out = "<h1 class='head-text'>" + faculty["direction"] + "</h1>" +
            "<img src='../static/img/" + keyz["c"][0] + ".jpg' alt='' class='image'>" +
            "<p class='result'>";
        // if (!aboutYour["body"].empty()) {
        //     out += aboutYour["body"];
        // }
    }
    document.getElementById("content").innerHTML = out;
    deleteStorage()
}