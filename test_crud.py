from models import Questions, Answers, Directions, DirectionBody, Test, db


def create_test(name):
    test = Test(name)
    db.session.add(test)
    db.session.commit()


def create_question(json):
    question = Questions(json["body"], json["direction"], json["test_id"], json["is_control"])
    # question = Questions(json["body"], json["direction"], json["test_id"], False)
    db.session.add(question)
    db.session.flush()
    answers = json["answers"]
    for answer in answers:
        create_answers(answer, question.id)
    db.session.commit()


def create_answers(answer, id):
    answer = Answers(answer["answer"], id, answer["direction_id"])
    db.session.add(answer)
    db.session.commit()


def create_direction(j):
    direction = Directions(j["direction"])
    db.session.add(direction)
    db.session.flush()
    direction_body = DirectionBody(direction.id, j["body"])
    db.session.add(direction_body)
    db.session.commit()


def update_question(obj):
    question = Questions.query.filter_by(id=obj["id"]).first()
    question.question = obj["body"]
    question.direction_id = obj["direction"]
    question.is_control = obj["is_control"]
    db.session.add(question)
    db.session.flush()
    for a in obj["answers"]:
        update_answer(a["id"], a["direction_id"], a["answer"], question.id)
    db.session.commit()


def update_answer(id, direction, body, question_id):
    if id == 0:
        answer = Answers(body, question_id, direction)
    else:
        answer = Answers.query.filter_by(id=id).first()
        answer.answer = body
        answer.direction_id = direction
    db.session.add(answer)
    db.session.commit()


def update_direction(obj):
    direction = Directions.query.filter_by(id=obj["id"]).first()
    if not direction:
        direction = Directions(obj["direction"])
    else:
        direction.name_direction = obj["direction"]
    db.session.add(direction)
    db.session.flush()
    direction_body = DirectionBody.query.filter_by(id=obj["id"]).first()
    if not direction_body:
        direction_body = DirectionBody(direction.id, obj["body"])
    else:
        direction_body.answer_body = obj["body"]
    db.session.add(direction_body)
    db.session.commit()


def update_test(id, name):
    test = Test.query.filter_by(id=id).first()
    test.name_test = name
    db.session.add(test)
    db.session.commit()


def get_question(id):
    question = Questions.query.filter_by(id=id).first()
    return question


def get_control_question(test_id, direction_id):
    control_question = Questions.query.filter_by(test_id=test_id, direction_id=direction_id, is_control=True).first()
    return control_question


def get_direction(id):
    direction = Directions.query.filter_by(id=id).first()
    return direction


def get_directions():
    directions = Directions.query.all()
    return directions


def get_test(id):
    test = Test.query.filter_by(id=id).first()
    return test


def get_tests():
    return Test.query.all()


def get_dir_answer(id):
    return DirectionBody.query.filter_by(id=id).first()


def delete_question(id):
    question = Questions.query.filter_by(id=id).first()
    for a in question.answers:
        delete_answer(a.id)
    db.session.delete(question)
    db.session.commit()


def delete_direction(id):
    direction = Directions.query.filter_by(id=id).first()
    d_body = DirectionBody.query.filter_by(id=id).first()
    db.session.delete(d_body)
    db.session.delete(direction)
    db.session.commit()


def delete_test(id):
    test = Test.query.filter_by(id=id).first()
    questions = Questions.query.filter_by(test_id=id).all()
    for q in questions:
        delete_question(q.id)
    db.session.delete(test)
    db.session.commit()


def delete_answer(id):
    answer = Answers.query.filter_by(id=id).first()
    db.session.delete(answer)
    db.session.commit()

