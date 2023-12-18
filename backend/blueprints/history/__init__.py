from flask import Blueprint, request
import sqlite3
from resources.variables import dbPath
import json

historyBlueprint = Blueprint('history', __name__, url_prefix='/history')

@historyBlueprint.route('', methods=['POST'])
def addHistory():
    user_id = request.json['user_id']
    meal_id = request.json['meal_id']
    history_type = request.json['type']
    date = request.json['date']
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"INSERT INTO History(user_id, meal_id, type, date) VALUES({user_id}, {meal_id}, '{history_type}', '{date}')"
    cur.execute(sqlreq)
    con.commit()
    con.close()
    return {'message': 'Ok'}

@historyBlueprint.route('', methods=['PATCH'])
def editHistory():
    id = request.json['id']
    user_id = request.json['user_id']
    meal_id = request.json['meal_id']
    history_type = request.json['type']
    date = request.json['date']
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"UPDATE History SET user_id = {user_id}, meal_id = {meal_id}, type = '{history_type}', date = '{date}' WHERE id = {id}"
    cur.execute(sqlreq)
    con.commit()
    con.close()
    return {'message': 'Ok'}

@historyBlueprint.route('/<int:history_id>', methods=['DELETE'])
def deleteHistory(history_id):
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlerq = f"DELETE FROM History WHERE id = {history_id}"
    cur.execute(sqlerq)
    con.commit()
    con.close()
    return {'message': 'Ok'}

@historyBlueprint.route('/user/<int:user_id>', methods=['GET'])
def getHistoryForUser(user_id):
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlerq = f"SELECT id, user_id, meal_id, type, date FROM History WHERE user_id = {user_id}"
    res = cur.execute(sqlerq)
    data = res.fetchall()
    con.close()
    table = []
    for line in data:
        elem = {'id': line[0],
                'user_id': line[1],
                'meal_id': line[2],
                'type': line[3],
                'date': line[4]}
        table.append(elem)
    return json.dumps(table)