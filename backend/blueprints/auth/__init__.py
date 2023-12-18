from flask import Blueprint, request
import json
import sqlite3
from resources.models.user import User

authBlueprint = Blueprint('auth', __name__, url_prefix='/auth')

@authBlueprint.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    con = sqlite3.connect('projectdb.db')
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
                'goal': data[7]}
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
    con = sqlite3.connect('projectdb.db')
    cursor = con.cursor()
    sqlreq = "SELECT * FROM User WHERE username='" + username + "'"
    res = cursor.execute(sqlreq)
    data = res.fetchone()
    if data is not None:
        con.close()
        message = "Account exists"
    else:
        sqlreq = f"INSERT INTO User(username, password, name, weight, height, age, goal)\
                  VALUES ('{username}', '{password}', '{name}', {weight}, {height}, {age}, '{goal}')"
        cursor.execute(sqlreq)
        con.commit()
        con.close()
        message = "Ok"
    return json.dumps({'message': message})