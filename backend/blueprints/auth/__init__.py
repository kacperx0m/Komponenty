from flask import Blueprint, request
import json
import sqlite3
from resources.variables import dbPath

authBlueprint = Blueprint('auth', __name__, url_prefix='/auth')

@authBlueprint.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    con = sqlite3.connect(dbPath)
    cursor = con.cursor()
    sqlreq = f"SELECT * FROM User WHERE username='{username}' AND password='{password}'"
    res = cursor.execute(sqlreq)
    data = res.fetchone()
    con.close()
    if data is not None:
        user = {'id': data[0],
                'username': data[1],
                'password': data[2],
                'name': data[3],
                'weight': data[4],
                'height': data[5],
                'age': data[6],
                'goal': data[7],
                'gender': data[8],
                'activity_level': data[9]}
        return json.dumps(user)
    else:
        return {}

@authBlueprint.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    name = request.json['name']
    weight = request.json['weight']
    height = request.json['height']
    age = request.json['age']
    goal = request.json['goal']
    gender = request.json['gender']
    activity_level = request.json['activity_level']
    con = sqlite3.connect('projectdb.db')
    cursor = con.cursor()
    sqlreq = "SELECT * FROM User WHERE username='" + username + "'"
    res = cursor.execute(sqlreq)
    data = res.fetchone()
    if data is not None:
        con.close()
        message = "Account exists"
    else:
        sqlreq = f"INSERT INTO User(username, password, name, weight, height, age, goal, gender, activity_level)\
                  VALUES ('{username}', '{password}', '{name}', {weight}, {height}, {age}, '{goal}', '{gender}', {activity_level})"
        cursor.execute(sqlreq)
        con.commit()
        con.close()
        message = "Ok"
    return json.dumps({'message': message})

@authBlueprint.route('/user', methods=['PATCH'])
def editUser():
    user_id = request.json['id']
    username = request.json['username']
    password = request.json['password']
    name = request.json['name']
    weight = request.json['weight']
    height = request.json['height']
    age = request.json['age']
    goal = request.json['goal']
    gender = request.json['gender']
    activity_level = request.json['activity_level']
    con = sqlite3.connect('projectdb.db')
    cursor = con.cursor()
    sqlreq = f"SELECT * FROM User WHERE id = {user_id}"
    res = cursor.execute(sqlreq)
    data = res.fetchone()
    if data is None:
        con.close()
        message = "Account doesn\'t exist"
    else:
        sqlreq = f"SELECT * FROM User WHERE username='{username}' AND id != {user_id}"
        res = cursor.execute(sqlreq)
        data = res.fetchone()
        if data is not None:
            con.close()
            message = "Username occupied by another user"
        else:
            sqlreq = f"UPDATE User SET username = '{username}', password = '{password}', name = '{name}', weight = {weight}, height = {height}, age = {age}, goal = '{goal}', gender = '{gender}', activity_level = {activity_level} WHERE id = {user_id}"
            cursor.execute(sqlreq)
            con.commit()
            con.close()
            message = "Ok"
    return json.dumps({'message': message})