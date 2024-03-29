from flask import Blueprint
from flask_restx import Api
from blueprints.documented_endpoints.auth import authNamespace
from blueprints.documented_endpoints.ingredient import ingredientNamepsace
from blueprints.documented_endpoints.nutrition import nutritionNamespace
from blueprints.documented_endpoints.meal import mealNamepsace 
from blueprints.documented_endpoints.history import historyNamespace

blueprint = Blueprint('documented_api', __name__, url_prefix='/documented_api')

api_extension = Api(
    blueprint,
    title='Flask RESTplus Demo',
    version='1.0',
    description='Flask RESTplus extension for better project structure and auto generated documentation',
    doc='/swagger'
)

api_extension.add_namespace(authNamespace)
api_extension.add_namespace(ingredientNamepsace)
api_extension.add_namespace(nutritionNamespace)
api_extension.add_namespace(mealNamepsace)
api_extension.add_namespace(historyNamespace)