from flask_restx import Namespace, Resource, fields
import requests
from resources.variables import apiUrl

nutritionNamespace = Namespace('nutrition', 'Nutritions endpoint')

nutritionModel = nutritionNamespace.model('Nutrition object', {
    'name': fields.String()
})

nutritionWithValueModel = nutritionNamespace.model('Nutrition with value object', {
    'name': fields.String(),
    'value': fields.Float()
})

@nutritionNamespace.route('')
class Nutrition(Resource):
    @nutritionNamespace.marshal_list_with(nutritionModel)
    def get(self):
        ret = requests.get(apiUrl + '/nutrition')
        return ret.json()