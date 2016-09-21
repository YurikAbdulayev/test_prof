from __init__ import db


class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name_test = db.Column(db.String(120))
    questions = db.relationship('Questions', backref='test', lazy='dynamic')

    def __init__(self, name):
        self.name_test = name


class Questions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200))
    direction_id = db.Column(db.Integer, db.ForeignKey('directions.id'))
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'))
    answers = db.relationship('Answers', backref='questions', lazy='dynamic')
    is_control = db.Column(db.Boolean)

    def __init__(self, question, direction_id, test_id, is_control):
        self.question = question
        self.direction_id = direction_id
        self.test_id = test_id
        self. is_control = is_control


class Answers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(120))
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    direction_id = db.Column(db.Integer, db.ForeignKey('directions.id'))

    def __init__(self, answer, question_id, direction_id):
        self.answer = answer
        self.question_id = question_id
        self.direction_id = direction_id


class Directions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name_direction = db.Column(db.String(50))

    def __init__(self, name):
        self.name_direction = name


class DirectionBody(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer_body = db.Column(db.String())
    full_name = db.Column(db.String)

    def __init__(self, new_id, body):
        self.id = new_id
        self.answer_body = body


# db.create_all()
# db.session.commit()
