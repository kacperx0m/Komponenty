from flask import Blueprint, request
import sqlite3
from resources.variables import dbPath
import json

mealBlueprint = Blueprint('meal', __name__, url_prefix='/meal')

@mealBlueprint.route('', methods=['GET'])
def getAllMeals():
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = "SELECT id, name, type FROM Meal"
    res = cur.execute(sqlreq)
    data = res.fetchall()
    con.close()
    table = []
    for line in data:
        elem = {'id': line[0],
                'name': line[1],
                'type': line[2]}
        table.append(elem)
    return json.dumps(table)

@mealBlueprint.route('', methods=['POST'])
def addMeal():
    name = request.json['name']
    meal_type = request.json['type']
    ingredients = request.json['ingredients']
    nutritions = request.json['nutritions']
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"INSERT INTO Meal(name, type) VALUES('{name}', '{meal_type}')"
    cur.execute(sqlreq)
    con.commit()
    sqlreq = f"SELECT id FROM Meal WHERE name = '{name}' ORDER BY id DESC"
    res = cur.execute(sqlreq)
    meal_id = res.fetchone()[0]
    if ingredients is not []:
        data = []
        for line in ingredients:
            elem = (meal_id, line['name'])
            data.append(elem)
        sqlreq="INSERT INTO IngredientsInMeal VALUES(?, ?)"
        cur.executemany(sqlreq, data)
        con.commit()
    if nutritions is not []:
        data = []
        for line in nutritions:
            elem = (meal_id, line['name'], line['value'])
            data.append(elem)
        sqlreq="INSERT INTO NutritionsForMeal VALUES(?, ?, ?)"
        cur.executemany(sqlreq, data)
        con.commit()
    con.close()
    return {'message': 'Ok'}

@mealBlueprint.route('', methods=['PATCH'])
def editMeal():
    meal_id = request.json['id']
    name = request.json['name']
    meal_type = request.json['type']
    ingredients = request.json['ingredients']
    nutritions = request.json['nutritions']
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"UPDATE Meal SET name = '{name}', type = '{meal_type}' WHERE id = {meal_id}"
    cur.execute(sqlreq)
    if ingredients is not []:
        sqlreq = f"DELETE FROM IngredientsInMeal WHERE meal_id = {meal_id}"
        cur.execute(sqlreq)
        con.commit()
        data = []
        for line in ingredients:
            elem = (meal_id, line['name'])
            data.append(elem)
        sqlreq="INSERT INTO IngredientsInMeal VALUES(?, ?)"
        cur.executemany(sqlreq, data)
        con.commit()
    if nutritions is not []:
        sqlreq = f"DELETE FROM NutritionsForMeal WHERE meal_id = {meal_id}"
        cur.execute(sqlreq)
        con.commit()
        data = []
        for line in nutritions:
            elem = (meal_id, line['name'], line['value'])
            data.append(elem)
        sqlreq="INSERT INTO NutritionsForMeal VALUES(?, ?, ?)"
        cur.executemany(sqlreq, data)
        con.commit()
    con.close()
    return {'message': 'Ok'}

@mealBlueprint.route('/<int:meal_id>', methods=['GET'])
def getMeal(meal_id):
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"SELECT id, name, type FROM Meal WHERE id = {meal_id}"
    res = cur.execute(sqlreq)
    data = res.fetchone()
    if data is None:
        return {'message': 'Meal doesn\'t exist'}
    meal_id = data[0]
    meal_name = data[1]
    meal_type = data[2]
    sqlreq = f"SELECT ingredient FROM IngredientsInMeal WHERE meal_id = {meal_id}"
    res = cur.execute(sqlreq)
    data = res.fetchall()
    ingredients = []
    for line in data:
        elem = {'name': line[0]}
        ingredients.append(elem)
    sqlreq = f"SELECT nutrition, quantity FROM NutritionsForMeal WHERE meal_id = {meal_id}"
    res = cur.execute(sqlreq)
    data = res.fetchall()
    nutritions = []
    for line in data:
        elem = {'name': line[0],
                'value': line[1]}
        nutritions.append(elem)
    con.close()
    ret = {'id': meal_id,
           'name': meal_name,
           'type': meal_type,
           'ingredients': ingredients,
           'nutritions': nutritions}
    return json.dumps(ret)

@mealBlueprint.route('/<int:meal_id>', methods=['DELETE'])
def deleteMeal(meal_id):
    con = sqlite3.connect(dbPath)
    cur = con.cursor()
    sqlreq = f"DELETE FROM Meal WHERE id = {meal_id}"
    cur.execute(sqlreq)
    con.commit()
    sqlreq = f"DELETE FROM IngredientsInMeal WHERE meal_id = {meal_id}"
    cur.execute(sqlreq)
    con.commit()
    sqlreq = f"DELETE FROM NutritionsForMeal WHERE meal_id = {meal_id}"
    cur.execute(sqlreq)
    con.commit()
    return {'message': 'Ok'}