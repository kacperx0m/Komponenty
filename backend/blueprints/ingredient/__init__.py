from flask import Blueprint, request
import sqlite3
from resources.variables import dbPath
import json

ingredientBlueprint = Blueprint('ingredients', __name__, url_prefix='/ingredient')

@ingredientBlueprint.route('', methods=['GET'])
def getAllIngredients():
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = 'SELECT * FROM Ingredient'
    res = cur.execute(sqlreq)
    data = res.fetchall()
    con.close()
    table = []
    for line in data:
        elem = json.loads(getIngredientNutritions(line[0]))
        table.append(elem)
    return json.dumps(table)

@ingredientBlueprint.route('', methods=['POST'])
def addIngredient():
    name = request.json['name']
    nutrtions = request.json['nutritions']
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"SELECT * FROM Ingredient WHERE name='{name}'"
    res = cur.execute(sqlreq)
    data = res.fetchone()
    if data is not None:
        return {'message': 'Ingredient exists'}
    sqlreq = f"INSERT INTO Ingredient VALUES('{name}')"
    cur.execute(sqlreq)
    con.commit()
    if nutrtions is not []:
        data = []
        for line in nutrtions:
            elem = (name, line['name'], line['value'])
            data.append(elem)
        sqlreq="INSERT INTO NutritionsForIngredient VALUES(?, ?, ?)"
        cur.executemany(sqlreq, data)
        con.commit()
    con.close()
    return {'message': 'Ok'}

@ingredientBlueprint.route('', methods=['PATCH'])
def updateIngredient():
    name = request.json['name']
    nutrtions = request.json['nutritions']
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"SELECT * FROM Ingredient WHERE name='{name}'"
    res = cur.execute(sqlreq)
    data = res.fetchone()
    if data is None:
        return {'message': 'Ingredient doesn\'t exist'}
    if nutrtions is not []:
        data = []
        for line in nutrtions:
            elem = (line['value'], name, line['name'])
            data.append(elem)
        sqlreq="UPDATE NutritionsForIngredient SET quantity = ? WHERE ingredient = ? AND nutrition = ?"
        cur.executemany(sqlreq, data)
        con.commit()
    con.close()
    return {'message': 'Ok'}


@ingredientBlueprint.route('/<string:ingredientName>', methods=['DELETE'])
def deleteIngredient(ingredientName):
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"DELETE FROM Ingredient WHERE name='{ingredientName}'"
    cur.execute(sqlreq)
    con.commit()
    sqlreq = f"DELETE FROM NutritionsForIngredient WHERE ingredient='{ingredientName}'"
    cur.execute(sqlreq)
    con.commit()
    sqlreq = f"DELETE FROM IngredientsInMeal WHERE ingredient='{ingredientName}'"
    cur.execute(sqlreq)
    con.commit()
    con.close()
    return {'message': 'Ok'}

@ingredientBlueprint.route('/<string:ingredientName>', methods=['GET'])
def getIngredientNutritions(ingredientName):
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"SELECT nutrition, quantity FROM NutritionsForIngredient WHERE ingredient='{ingredientName}'"
    res = cur.execute(sqlreq)
    data = res.fetchall()
    con.close()
    table = []
    for line in data:
        elem = {'name': line[0],
                'value': line[1]}
        table.append(elem)
    ret = {'name': ingredientName,
           'nutritions': table}
    return json.dumps(ret)


