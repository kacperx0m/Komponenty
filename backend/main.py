from flask import Flask
from blueprints.documented_endpoints import blueprint as documented_endpoints
from blueprints.auth import authBlueprint
from blueprints.ingredient import ingredientBlueprint
from blueprints.nutrition import nutritionBlueprint
from blueprints.meal import mealBlueprint
from blueprints.history import historyBlueprint

app = Flask(__name__)

app.register_blueprint(documented_endpoints)
app.register_blueprint(authBlueprint)
app.register_blueprint(ingredientBlueprint)
app.register_blueprint(nutritionBlueprint)
app.register_blueprint(mealBlueprint)
app.register_blueprint(historyBlueprint)

if __name__ == "__main__":
    app.run()