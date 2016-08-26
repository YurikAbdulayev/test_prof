/**
 * Created by yurik on 19.08.16.
 */
var id;
var all_q = "";
var xmlhttp = new XMLHttpRequest();
var list_dir;
var j;
var categoryResponse = "";

function loadCreateQuestions(test_id) {
    id = test_id;
    list_dir = loadCategory(0);
    loadQuestions();
    setId("new_question_select", list_dir);
    setId("new_answer_1", list_dir);
    setId("new_answer_2", list_dir);
}

function loadCategory(id) {
    var url = getUrl() + "api/v1.0/direction/all";
    var out = "";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var resp = JSON.parse(xmlhttp.responseText);
            j = resp;
            categoryResponse = resp;
            for (i = 0; i < resp.length; i++) {
                if (id == resp[i]["id"]) {
                    out += "<option selected value='" + resp[i]["id"] + "'>" + resp[i]["direction"] + "</option>"
                } else {
                    out += "<option value='" + resp[i]["id"] + "'>" + resp[i]["direction"] + "</option>"
                }
            }
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return out
}

function getCategoryToQuestion(id) {
    var out = "";
    var resp = j;
    for (i = 0; i < resp.length; i++) {
        if (id == resp[i]["id"]) {
            out = resp[i]["direction"]
        }
    }
    return out
}

function deleteDialog() {
    if (confirm('Ви впевнені що хочете видалити цей тест ?')) {
        deleteTest(id);
    } else {
        // Do nothing!
    }
}

function updateQuestion(quest_id, position) {
    var question = document.getElementById("i_new_question").value;
    if (question.length != 0) {
        var direction = getSelectedId("new_question_select");
        var leng = document.getElementById("c_new_answers").childElementCount;
        var isControl = document.getElementById("is_control").checked;
        var name = "business_c_token";
        var token = getCookie(name);
        var listAnswers = [];
        id_a = [];
        for (q = 0; q < all_q[position]["answers"].length; q++) {
            if (all_q[position]["answers"][q]["id"] > 0) {
                id_a.push(all_q[position]["answers"][q]["id"])
            } else {
                id_a.push(0);
            }
        }
        for (i = 1; i < leng; i++) {
            if (document.getElementById("i_new_answer_" + i).value.length != 0) {
                listAnswers.push({
                    "id": id_a[i - 1],
                    "direction_id": getSelectedId("new_answer_" + i),
                    "answer": document.getElementById("i_new_answer_" + i).value
                })
            }
        }
        var json = '{"token": "' + token + '", "id": "' + quest_id + '", ' +
            ' "direction": "' + direction + '", "is_control":' + isControl + ', "body": "' + question + '", "answers": ' + JSON.stringify(listAnswers) + '}';
//            alert(json);
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', getUrl() + "api/v1.0/question/0", false);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // send the collected data as JSON
        xhr.send(JSON.stringify(json));
    }
}

function loadToUpdate(q_id) {
    window.scrollTo(0, document.body.scrollHeight);
    var out = "";
    out += "<p>" +
        "<input id='i_new_question' type='text' placeholder='Назва запитання' value='" + all_q[q_id]["body"] + "'>" +
        "<label for='new_question_select'> Ключ-</label>" +
        "<select id='new_question_select'></select>" +
        "<a href='/update/" + id + "' onclick='deleteQuestion(" + all_q[q_id]["id"] + ")' class='delete'>Видалити</a></p>";
    for (i = 0; i < all_q[q_id]["answers"].length; i++) {
        out += "<p><input type='text' id='i_new_answer_" + (i + 1) + "' placeholder='Відповідь' value='" + all_q[q_id]["answers"][i]["body"] + "' " +
            "class='input-answer'>" +
            "<label for='new_answer_" + (i + 1) + "'> Ключ-</label>" +
            "<select id='new_answer_" + (i + 1) + "'></select>" +
            "<a href='' onclick='deleteAnswer(" + all_q[q_id]["answers"][i]["id"] + ")' class='delete'>Видалити</a></p>";
    }
    document.getElementById("c_new_answers").innerHTML = out;
    document.getElementById("is_control").checked = all_q[q_id]["is_control"];
    document.getElementById("btn_update").innerHTML =
        "<a href='/update/" + id + "'>" +
        "<button type='submit' class='button' onclick='updateQuestion(" + all_q[q_id]["id"] + ", " + q_id + ")'>Оновити</button>" +
        "</a>" +
        "<a href='/update/" + id + "'><button type='submit' class='button' onclick='createQuestion()'>Створити питання</button></a>"
    setId("new_question_select", loadCategory(all_q[q_id]["direction"]));
    for (i = 0; i <= all_q[q_id]["answers"].length + 1; i++) {
        setId("new_answer_" + (i + 1), loadCategory(all_q[q_id]["answers"][i]["direction"]))
    }
    setId("new_answer_" + (2), loadCategory(all_q[q_id]["answers"][1]["direction"]));
    setId("new_answer_" + (3), loadCategory(all_q[q_id]["answers"][2]["direction"]));
    setId("new_answer_" + (4), loadCategory(all_q[q_id]["answers"][3]["direction"]));
    setId("new_answer_" + (5), loadCategory(all_q[q_id]["answers"][4]["direction"]));
    setId("new_answer_" + (6), loadCategory(all_q[q_id]["answers"][5]["direction"]));
}

function deleteAnswer(answer_id) {
    var name = "business_c_token";
    var token = getCookie(name);
    var json = '{"token": "' + token + '", "id": "' + answer_id + '"}';
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', getUrl() + "api/v1.0/delete/answer", false);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    // send the collected data as JSON
    xhr.send(JSON.stringify(json));
}

function deleteQuestion(question_id) {
    var name = "business_c_token";
    var token = getCookie(name);
    var json = '{"token": "' + token + '", "id": "' + question_id + '"}';
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', getUrl() + "api/v1.0/question/0", false);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    // send the collected data as JSON
    xhr.send(JSON.stringify(json));
}

function loadQuestions() {
    var url = getUrl() + "api/v1.0/questions/" + id;
    var out = "";
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var resp = JSON.parse(xmlhttp.responseText);
            var json = resp["questions"];
            all_q = json;
            for (i = 0; i < json.length; i++) {
                out += "<p><a onclick='loadToUpdate(" + i + ")'>" + (i + 1) + ") " + json[i]["body"] + " категорія :" +
                    json[i]["direction"] + "</a></p>"
            }
        }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    document.getElementById("all_category").innerHTML = out
}

function setId(block, to) {
    document.getElementById(block).innerHTML = to;
}

function getSelectedId(from) {
    var e = document.getElementById(from);
    var value = e.options[e.selectedIndex].value;
    return value;
}

function createQuestion() {
    var question = document.getElementById("i_new_question").value;
    if (question.length != 0) {
        var direction = getSelectedId("new_question_select");
        var leng = document.getElementById("c_new_answers").childElementCount;
        var isControl = document.getElementById("is_control").checked;
        var name = "business_c_token";
        var token = getCookie(name);
        var listAnswers = [];
        for (i = 1; i < leng; i++) {
            if (document.getElementById("i_new_answer_" + i).value.length != 0) {
                listAnswers.push({
                    "direction_id": getSelectedId("new_answer_" + i),
                    "answer": document.getElementById("i_new_answer_" + i).value
                })
            }
        }
        var json = '{"token": "' + token + '", "test_id": "' + id + '", ' +
            ' "direction": "' + direction + '", "is_control":' + isControl + ', "body": "' + question + '", "answers": ' + JSON.stringify(listAnswers) + '}';
        var xhr = new XMLHttpRequest();
        xhr.open('POST', getUrl() + "api/v1.0/question/0", false);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // send the collected data as JSON
        xhr.send(JSON.stringify(json));
    }
}

function addAnswer() {
    var leng = document.getElementById("c_new_answers").childElementCount;
    $(".answers").append("<p><input type='text' id='i_new_answer_" + leng + "' placeholder='Відповідь' class='input-answer'>" +
        "<select id='new_answer_" + leng + "'></select>" +
        "<label for='new_answer_" + leng + "'> Ключ-</label>" +
        "<a href='' class='delete'>Видалити</a></p>");
    setId("new_answer_" + leng, list_dir);
}
