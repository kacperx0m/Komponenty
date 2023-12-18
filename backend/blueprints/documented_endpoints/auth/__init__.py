from flask import request
from flask_restx import Namespace, Resource, fields
from blueprints.auth import login
import requests
from resources.variables import apiUrl
import sys

authNamespace = Namespace('auth', 'Authorization endpoint')

loginModel = authNamespace.model('Login data', {
    'username': fields.String(),
    'password': fields.String()
})

userModel = authNamespace.model('User data', {
    'username': fields.String(),
    'password': fields.String(),
    'name': fields.String(),
    'weight': fields.Float(),
    'height': fields.Float(),
    'age': fields.Integer(),
    'goal': fields.String()
})

messageModel = authNamespace.model('Response message', {
    'message': fields.String()
})

@authNamespace.route('/login')
class Login(Resource):
    @authNamespace.marshal_with(userModel)
    @authNamespace.expect(loginModel)
    def post(self):
        ret = requests.post(apiUrl + '/auth/login', json=authNamespace.payload)
        return ret.json()
    
@authNamespace.route('/register')
class Register(Resource):
    @authNamespace.marshal_with(messageModel)
    @authNamespace.expect(userModel)
    def post(self):
        ret = requests.post(apiUrl + '/auth/register', json=authNamespace.payload)
        return ret.json()