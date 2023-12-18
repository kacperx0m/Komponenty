from flask_restx import Namespace, Resource, fields
from blueprints.documented_endpoints.nutrition import nutritionWithValueModel
import requests
from resources.variables import apiUrl

ingredientNamepsace = Namespace('ingredient', 'Ingredients endpoint')

ingredientModel = ingredientNamepsace.model('Ingredient object with nutritions', {
    'name': fields.String(),
    'nutritions': fields.List(fields.Nested(nutritionWithValueModel))
})

messageModel = ingredientNamepsace.model('Returned message', {
    'message': fields.String()
})

@ingredientNamepsace.route('')
class Ingredient(Resource):
    @ingredientNamepsace.marshal_list_with(ingredientModel)
    def get(self):
        ret = requests.get(apiUrl + '/ingredient')
        print(ret.json())
        return ret.json()
    
    @ingredientNamepsace.expect(ingredientModel)
    @ingredientNamepsace.marshal_with(messageModel)
    def post(self):
        ret = requests.post(apiUrl + '/ingredient', json=ingredientNamepsace.payload)
        return ret.json()
    
    @ingredientNamepsace.expect(ingredientModel)
    @ingredientNamepsace.marshal_with(messageModel)
    def patch(self):
        ret = requests.patch(apiUrl + '/ingredient', json=ingredientNamepsace.payload)
        return ret.json()
    
@ingredientNamepsace.route('/<string:ingredientName>')
class IngredientByName(Resource):
    @ingredientNamepsace.marshal_with(messageModel)
    def delete(self, ingredientName):
        ret = requests.delete(apiUrl + '/ingredient/' + ingredientName)
        return ret.json()
    
    @ingredientNamepsace.marshal_list_with(ingredientModel)
    def get(self, ingredientName):
        ret = requests.get(apiUrl + '/ingredient/' + ingredientName)
        return ret.json()