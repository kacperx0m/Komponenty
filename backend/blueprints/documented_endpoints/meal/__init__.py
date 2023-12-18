from flask_restx import Namespace, Resource, fields
import requests
from resources.variables import apiUrl
from blueprints.documented_endpoints.ingredient import ingredientNameModel
from blueprints.documented_endpoints.nutrition import nutritionWithValueModel

mealNamepsace = Namespace('meal', 'Meals endpoint')

mealModel = mealNamepsace.model('Basic meal object', {
    'id': fields.Integer(),
    'name': fields.String(),
    'type': fields.String()
})

extendedMealModel = mealNamepsace.model('Extended meal object', {
    'id': fields.Integer(),
    'name': fields.String(),
    'type': fields.String(),
    'ingredients': fields.List(fields.Nested(ingredientNameModel)),
    'nutritions': fields.List(fields.Nested(nutritionWithValueModel))
})

extendedMealModelWithoutId = mealNamepsace.model('Extended meal object without id', {
    'name': fields.String(),
    'type': fields.String(),
    'ingredients': fields.List(fields.Nested(ingredientNameModel)),
    'nutritions': fields.List(fields.Nested(nutritionWithValueModel))
})

messageModel = mealNamepsace.model('Returned message', {
    'message': fields.String()
})

@mealNamepsace.route('')
class Meal(Resource):
    @mealNamepsace.marshal_list_with(mealModel)
    def get(self):
        ret = requests.get(apiUrl + '/meal')
        return ret.json()
    
    @mealNamepsace.expect(extendedMealModelWithoutId)
    @mealNamepsace.marshal_with(messageModel)
    def post(self):
        ret = requests.post(apiUrl + '/meal', json=mealNamepsace.payload)
        return ret.json()
    
    @mealNamepsace.expect(extendedMealModel)
    @mealNamepsace.marshal_with(messageModel)
    def patch(self):
        ret = requests.patch(apiUrl + '/meal', json=mealNamepsace.payload)
        return ret.json()
    
@mealNamepsace.route('/<int:meal_id>')
class MealById(Resource):
    @mealNamepsace.marshal_with(extendedMealModel)
    def get(self, meal_id):
        ret = requests.get(apiUrl + '/meal/' + str(meal_id))
        return ret.json()
    
    @mealNamepsace.marshal_with(messageModel)
    def delete(self, meal_id):
        ret = requests.delete(apiUrl + '/meal/' + str(meal_id))
        return ret.json()