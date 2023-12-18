from flask_restx import Namespace, Resource, fields
import requests
from resources.variables import apiUrl

historyNamespace = Namespace('history', 'History endpoint')

historyModel = historyNamespace.model('History object', {
    'id': fields.Integer(),
    'user_id': fields.Integer(),
    'meal_id': fields.Integer(),
    'type': fields.String(),
    'date': fields.Date()
})

historyModelWithoutId = historyNamespace.model('History object without id', {
    'user_id': fields.Integer(),
    'meal_id': fields.Integer(),
    'type': fields.String(),
    'date': fields.Date()
})

messageModel = historyNamespace.model('Returned message', {
    'message': fields.String()
})

@historyNamespace.route('')
class History(Resource):
    @historyNamespace.expect(historyModelWithoutId)
    @historyNamespace.marshal_with(messageModel)
    def post(self):
        ret = requests.post(apiUrl + '/history', json=historyNamespace.payload)
        return ret.json()
    
    @historyNamespace.expect(historyModel)
    @historyNamespace.marshal_with(messageModel)
    def patch(self):
        ret = requests.patch(apiUrl + '/history', json=historyNamespace.payload)
        return ret.json()
    
@historyNamespace.route('/<int:history_id>')
class HistoryById(Resource):
    @historyNamespace.marshal_with(messageModel)
    def delete(self, history_id):
        ret = requests.delete(apiUrl + '/history/' + str(history_id))
        return ret.json()
    
@historyNamespace.route('/user/<int:user_id>')
class HistoryByUser(Resource):
    @historyNamespace.marshal_list_with(historyModel)
    def get(self, user_id):
        ret = requests.get(apiUrl + '/history/user/' + str(user_id))
        return ret.json()