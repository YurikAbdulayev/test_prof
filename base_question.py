from flask_restful import Resource, request
from service import (question_to_json, questions_to_json, direction_to_json,
                     questions_id_list,
                     create_test_service, create_direction_service, create_question_service,
                     delete_question_service, delete_test_service, delete_answer_service, delete_direction_service,
                     get_test_service,
                     direction_a_to_json,
                     directions_to_json,
                     update_question_service, update_direction_service, update_test_service)

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

    def post(self, id):
        j = request.json
        create_question_service(j)

    def delete(self, id):
        j = request.json
        delete_question_service(j)

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
        create_direction_service(j)

    def delete(self, id):
        j = request.json
        delete_direction_service(j)

    def put(self, id):
        j = request.json
        update_direction_service(j)


class QuestionsIds(Resource):
    def get(self, test_id, direction):
        return questions_id_list(get_test(test_id), direction)


class ControlQuestion(Resource):
    def get(self, test_id, direction_id):
        return question_to_json(get_control_question(test_id, direction_id))


class Tests(Resource):
    def get(self):
        return get_test_service()

    def delete(self):
        j = request.json
        delete_test_service(j)

    def post(self):
        j = request.json
        create_test_service(j)

    def put(self):
        j = request.json
        update_test_service(j)


class DirectionAnswer(Resource):
    def get(self, id):
        return direction_a_to_json(get_dir_answer(id))


class Answers(Resource):
    def delete(self):
        j = request.json
        delete_answer_service(j)
