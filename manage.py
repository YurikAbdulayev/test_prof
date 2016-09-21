from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://xqbrjxcfhlefrz:KZoN0rcvcVcPWuqnVFE2Ed5k-0@ec2-54-83-44-117.compute-1.amazonaws.com:5432/dd6m7ubg1p71l7'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)


class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name_test = db.Column(db.String(120))
    questions = db.relationship('Questions', backref='test', lazy='dynamic')


class Questions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200))
    direction_id = db.Column(db.Integer, db.ForeignKey('directions.id'))
    test_id = db.Column(db.Integer, db.ForeignKey('test.id'))
    answers = db.relationship('Answers', backref='questions', lazy='dynamic')
    is_control = db.Column(db.Boolean)


class Answers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String(120))
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    direction_id = db.Column(db.Integer, db.ForeignKey('directions.id'))


class Directions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name_direction = db.Column(db.String(50))


class DirectionBody(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer_body = db.Column(db.String())
    full_name = db.Column(db.String)

if __name__ == '__main__':
    manager.run()
