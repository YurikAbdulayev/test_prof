from flask_restful import Resource, request
from service import (question_to_json,
                     questions_to_json,
                     direction_to_json,
                     questions_id_list,
    # control_question_to_json,
                     create,
                     delete_q, delete_t, delete_a, delete_d,
                     get_t,
                     direction_a_to_json,
                     directions_to_json,
                     create_question_service,
                     update_question_service)

from test_crud import (get_question,
                       get_test,
                       get_direction,
                       get_control_question,
                       get_dir_answer,
                       create_direction,
                       get_directions,
                       update_direction)

from admin import equals
import json


class Question(Resource):
    def get(self, id):
        return {'question': question_to_json(get_question(id))}

    def delete(self, id):
        j = request.json
        return delete_q(j)

    def post(self, id):
        j = request.json
        create_question_service(j)

    def put(self, id):
        j = request.json
        update_question_service(j)


class Questions(Resource):
    def get(self, test_id):
        return questions_to_json(get_test(test_id))


class Direction(Resource):
    def get(self, id):
        if id == 'all':
            return directions_to_json(get_directions())
        else:
            return direction_to_json(get_direction(id))

    def post(self, id):
        j = request.json
        obj = json.loads(j)
        if equals(obj['token']):
            create_direction(obj)

    def delete(self, id):
        j = request.json
        delete_d(j)

    def put(self, id):
        j = request.json
        obj = json.loads(j)
        if equals(obj['token']):
            update_direction(obj)


class QuestionsIds(Resource):
    def get(self, test_id, direction):
        return questions_id_list(get_test(test_id), direction)


class ControlQuestion(Resource):
    def get(self, test_id, direction_id):
        return question_to_json(get_control_question(test_id, direction_id))


class Create(Resource):
    def post(self, method):
        j = request.json
        return create(method, j)


class Tests(Resource):
    def get(self):
        return get_t()

    def delete(self):
        j = request.json
        delete_t(j)


class DirectionAnswer(Resource):
    def get(self, id):
        return direction_a_to_json(get_dir_answer(id))


class Answers(Resource):
    def delete(self):
        j = request.json
        delete_a(j)
