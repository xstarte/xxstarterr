from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import secrets

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Измените на SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = secrets.token_hex(16)

db = SQLAlchemy(app)

# Модель пользователя
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    city = db.Column(db.String(50))
    age = db.Column(db.Integer)
    user_id = db.Column(db.Integer, unique=True)
    group_id = db.Column(db.Integer)

# Главная страница
@app.route('/')
def index():
    return render_template('index.html')

# Регистрация пользователя
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Empty data'}), 400

    name = data.get('name')
    city = data.get('city')
    age = data.get('age')

    if not name or not city or not age:
        return jsonify({'error': 'Missing fields'}), 400

    # Получаем текущее количество пользователей
    total_users = User.query.count()

    # Присваиваем user_id и group_id
    user_id = total_users + 1
    group_id = (total_users // 10) + 1

    new_user = User(name=name, city=city, age=age, user_id=user_id, group_id=group_id)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'userId': user_id, 'groupId': group_id}), 200

# Отображение очереди пользователя
@app.route('/queue/<int:user_id>', methods=['GET'])
def queue(user_id):
    user = User.query.filter_by(user_id=user_id).first()
    if user:
        return jsonify({
            'user_id': user.user_id,
            'group_id': user.group_id
        })
    else:
        return jsonify({'error': 'User not found'}), 404

# Создание базы данных при старте приложения
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)