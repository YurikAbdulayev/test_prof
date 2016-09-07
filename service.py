import json
from test_crud import (create_test, create_direction, create_question,
                       delete_question, delete_direction, delete_answer, delete_test,
                       update_question, update_test, update_direction
                       )
from test_crud import (get_tests, get_direction)
from admin import equals


def answer_to_json(answer):
    return {
        'id': answer.id,
        'body': answer.answer,
        'direction': answer.direction_id
    }


def answers_to_json(question):
    tmp_answers = []
    for a in question.answers:
        tmp_answers.append(answer_to_json(a))
    return tmp_answers


def question_to_json(question):
    return {
        'id': question.id,
        'body': question.question,
        'direction': question.direction_id,
        'direction_name': get_direction(question.direction_id),
        'test_id': question.test_id,
        'answers': answers_to_json(question),
        'is_control': question.is_control
    }


def questions_to_json(test):
    list_questions = []
    for q in test.questions:
        list_questions.append(question_to_json(q))
    return {
        'test': test.name_test,
        'questions': list_questions
    }


def direction_to_json(direction):
    return {'direction': direction}


def directions_to_json(directions):
    list_directions = []
    for d in directions:
        list_directions.append({
            'id': d.id,
            'direction': d.name_direction
        })
    return list_directions


def questions_id_list(test, direction):
    list_ids = []
    for q in test.questions:
        if direction == "all":
            list_ids.append({
                'question_id': q.id,
                'direction_id': q.direction_id
            })
        elif int(direction) == q.direction_id:
            if not q.is_control:
                list_ids.append({
                    'question_id': q.id,
                    'direction_id': q.direction_id
                })
    return {'list_ids': list_ids}


def create_question_service(j):
    obj = json.loads(j)
    if equals(obj["token"]):
        create_question(obj)


def create_test_service(j):
    obj = json.loads(j)
    if equals(obj["token"]):
        create_test(obj["name"])


def create_direction_service(j):
    obj = json.loads(j)
    if equals(obj["token"]):
        create_direction(obj["direction"], obj["body"])


def delete_question_service(j):
    obj = json.loads(j)
    if equals(obj["token"]):
        delete_question(obj["id"])


def delete_direction_service(j):
    obj = json.loads(j)
    if equals(obj["token"]):
        delete_direction(int(obj["id"]))


def delete_answer_service(j):
    obj = json.loads(j)
    if equals(obj["token"]):
        delete_answer(obj["id"])


def delete_test_service(j):
    obj = json.loads(j)
    if equals(obj["token"]):
        delete_test(obj["id"])


def get_test_service():
    tests = get_tests()
    list_test = []
    for test in tests:
        list_test.append(
            {"test": test.name_test, "id": test.id}
        )
    return list_test


def direction_a_to_json(direction_answer):
    return {
        'id': direction_answer.id,
        'body': direction_answer.answer_body
    }


def update_question_service(j):
    obj = json.loads(j)
    if equals(obj["token"]):
        update_question(obj)


def update_test_service(j):
    obj = json.loads(j)
    if equals(obj["token"]):
        update_test(obj["id"], obj["name"])


def update_direction_service(j):
    obj = json.loads(j)
    if equals(obj['token']):
        update_direction(obj["id"], obj["direction"], obj["body"])
