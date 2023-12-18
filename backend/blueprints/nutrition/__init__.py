from flask import Blueprint
import sqlite3
from resources.variables import dbPath
import json

nutritionBlueprint = Blueprint('nutritions', __name__, url_prefix='/nutrition')

@nutritionBlueprint.route('', methods=['GET'])
def getNutritions():
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = 'SELECT * FROM Nutrition'
    res = cur.execute(sqlreq)
    data = res.fetchall()
    con.close()
    table = []
    print(data)
    for line in data:
        elem = {'name': line[0]}
        table.append(elem)
    return json.dumps(table)