from flask import Flask
from blueprints.basic_endpoints import blueprint as basic_endpoints
from blueprints.documented_endpoints import blueprint as documented_endpoints
from blueprints.auth import authBlueprint

app = Flask(__name__)

app.register_blueprint(basic_endpoints)
app.register_blueprint(documented_endpoints)
app.register_blueprint(authBlueprint)

if __name__ == "__main__":
    app.run()