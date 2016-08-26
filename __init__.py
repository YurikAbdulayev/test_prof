from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
# app.config.from_object('config')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost/test_prof'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://xqbrjxcfhlefrz:KZoN0rcvcVcPWuqnVFE2Ed5k-0@ec2-54-83-44-117.compute-1.amazonaws.com:5432/dd6m7ubg1p71l7'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['SECRET_KEY'] = 'secret_key_'
UPLOAD_FOLDER = 'static/img'
ALLOWED_EXTENSIONS = set(['jpg'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
db = SQLAlchemy(app)

import views
