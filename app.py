import os
from werkzeug.utils import secure_filename
from __init__ import app, ALLOWED_EXTENSIONS
from flask import render_template, request, make_response, redirect
from admin import auth, equals
import datetime
# jAisdhD5


@app.route('/update/<test_id>')
def update_test(test_id):
    return render_template('create_update_question.html', t_id=test_id)


@app.route('/category')
def create_update_category():
    return render_template('new_category.html')


@app.route('/test<test_id>')
def run_test(test_id):
    return render_template('question_in_test.html', t_id=test_id)


@app.route('/login', methods=['GET', 'POST'])
def get_user():
    if request.method == 'GET':
        if equals(request.cookies.get('business_c_token')):
            return render_template('admin.html')
        else:
            return render_template('login.html')
    elif request.method == 'POST':
        token = auth(request.form['login'], request.form['password'])
        if token:
            expire_date = datetime.datetime.now()
            expire_date = expire_date + datetime.timedelta(days=365)
            resp = make_response(redirect('/login'))
            resp.set_cookie('business_c_token', value=token, expires=expire_date)
            return resp
        else:
            return render_template('login.html', mesg='error validation')


@app.route("/logout", methods=['GET'])
def logout():
    resp = make_response(redirect('/login'))
    resp.set_cookie('business_c_token', '', expires=0)
    return resp


@app.route('/new_test', methods=['GET'])
def new_test():
    return render_template('new_test.html')


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/img-upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            print('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            print('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            new_filename = request.args.get('direction_id') + '.' + filename.rsplit('.',1)[1]
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], new_filename))
    return render_template('img-upload.html')

if __name__ == '__main__':
    app.run(debug=True)
