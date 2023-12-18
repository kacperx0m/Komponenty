from flask import Flask, request, Response
from flask_cors import CORS

from blueprints.documented_endpoints import blueprint as documented_endpoints
from blueprints.auth import authBlueprint
from blueprints.ingredient import ingredientBlueprint
from blueprints.nutrition import nutritionBlueprint
from blueprints.meal import mealBlueprint
from blueprints.history import historyBlueprint

app = Flask(__name__)
CORS(app)

@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        res = Response()
        res.headers['X-Content-Type-Options'] = '*'
        return res

app.register_blueprint(documented_endpoints)
app.register_blueprint(authBlueprint)
app.register_blueprint(ingredientBlueprint)
app.register_blueprint(nutritionBlueprint)
app.register_blueprint(mealBlueprint)
app.register_blueprint(historyBlueprint)

if __name__ == "__main__":
    app.run()
