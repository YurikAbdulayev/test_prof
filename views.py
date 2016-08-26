from __init__ import app

from base_question import Question, DirectionAnswer, \
    Questions, Direction, QuestionsIds, ControlQuestion, Create, Tests, Answers
from unicode_api import UnicodeApi

api = UnicodeApi(app, prefix='/api/v1.0')
api.add_resource(Question, '/question/<id>')
api.add_resource(Direction, '/direction/<id>')
api.add_resource(Tests, '/tests')
api.add_resource(Questions, '/questions/<test_id>')
api.add_resource(QuestionsIds, '/questions/<test_id>/direction/<direction>')
api.add_resource(ControlQuestion, '/control/<test_id>/direction/<direction_id>')
api.add_resource(DirectionAnswer, '/dir/<id>')
api.add_resource(Answers, '/delete/answer')
