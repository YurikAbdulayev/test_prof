import os
basedir = os.path.abspath(os.path.dirname(__file__))


SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:root@localhost/test_prof'
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')


# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:root@localhost/test_prof'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True