// function addAnswer() {
//     $(".answers").append("<p><input type='text' placeholder='Відповідь' class='input-answer'><select name='' id=''><option value=''>Категория 1</option><option value=''>Категория 2</option><option value=''>Категория 3</option></select><a href='#' class='delete'>Удалить</a></p>");
// }

function addQuestion() {
    $("#questions").append("<div id='question'><div id='answers' telnum='' class='answers'><p><input type='text' placeholder='Назва запитання'><select name='' id=''><option value=''>Категория 1</option><option value=''>Категория 2</option><option value=''>Категория 3</option></select><a href='#' class='delete'>Удалить</a></p><p><input type='text' placeholder='Відповідь' class='input-answer'><select name='' id=''><option value=''>Категория 1</option><option value=''>Категория 2</option><option value=''>Категория 3</option></select><a href='#' class='delete'>Удалить</a></p><p><input type='text' placeholder='Відповідь' class='input-answer'><select name='' id=''><option value=''>Категория 1</option><option value=''>Категория 2</option><option value=''>Категория 3</option></select><a href='#' class='delete'>Удалить</a></p></div><button class='button' onclick='addAnswer()'>Додати відповідь</button></div>");
}

function loadAdminTests() {
    $.getJSON(getUrl() + "api/v1.0/tests", function (data) {
        var out = "";
        for (i = 0; i < data.length; i++) {
            out += "<li><p class='view-all-test'>" +
                "<a href='/update/" + data[i].id + "' class='name-test'>" + data[i].test + "</a>" +
                "<a href='/update/" + data[i].id + "' class='update'>Редагувати</a>" +
                "</p></li>";
        }
        document.getElementById("a_list_tests").innerHTML = out;
    });
}

function deleteTest(id) {
    // alert(id)
    var name = "business_c_token";
        var token = getCookie(name);
        var json = '{"token": "' + token + '", "id": "' + id + '"}';
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', getUrl() + "api/v1.0/tests", false);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        // send the collected data as JSON
        xhr.send(JSON.stringify(json));
}

function viewHowCreate() {
    document.getElementById("how-create").innerHTML =
        'Щоб створити тест потрібно знати лише кілька властивостей! ЇХ ВСІ ПОТРІБНО ПРОЧИТАТИ!!!' +
        '<h1></h1>' +
        '1) Кнопка "Додати тест", відкриється нова сторінка, в якій можна буде створити назву нового тесту. ' +
        '<h1></h1>' +
        '2) Кнопка "Додати категорію", відкриється нова сторінка в якій можна додати категорію(ключ в питанні),' +
        ' та додати фінальну відповідь яка буде відображатись коли тест пройдено та останнім ключем є дана категорія. ' +
        '<h1></h1>' +
        '3) У створених тестів є кнопка "Редагувати", відкриється нова сторінка в якій можна створювати та видаляти нові' +
        ' питання і відповіді до них. <h1></h1>' +
        '4) Як правильно створити тест? Коли створено назву тесту, потрібно створити відповідні ключі(Категорії) за' +
        ' допомогою яких зможемо рахувати кількість співпадінь категорій. Потім обираємо "Редагувати" відпвідний тест' +
        ' у головному вікні. Після чого переходимо до створення нового запитання. Небхідно написати запитання так як воно' +
        ' буде виглядати, додати відповідну кількість відповідей до запитання. Ключ у запитанні : щоб питання було' +
        ' відображено при проходженнні ПЕРШОЇ частини тесту потрібно обрати ключ "загальне питання", і обрати ключі для кожної відповіді.' +
        ' Під час проходження тесту будуть відображені всі питання з ключем запитання "загальне питання" і будуть' +
        ' підраховані ключі кожної відповіді відповіді, якщо ключі будуть повторюватись то потрібно зараніше створювати' +
        ' контрольне питання . <h1></h1>' +
        ' Приклад роботи : Виводяться всі запитання які мають ключ "загальне питання" після чого за підсумками відповідей' +
        ' виходить що ключі "Програмна інженерія" і "Маркетинг" мають однакову кількість повторів, буде показано контрольне питання з ключем "загальне питання"' +
        ' і будуть відповіді з цими двома категоріями. Обирається тільки одна! НАприклад обрали "Маркетинг". то буде перевірено чи є ПИТАННЯ з ключем "Маркетинг"' +
        ' і будуть проведені всі дії так само як з ключем "загальне питання". Кінець тесту визначається тим що питання з ключем "Маркетинг"' +
        ' не були створені і буде виведено відповідь категорії яка найчастіше повторювалась наприклад: "Маркетинг" .'
}