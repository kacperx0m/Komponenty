Wymagany Python3
Aby odpalić backend przejdź w terminalu do tego folderu i wpisuj do terminala

python -m venv venv
pip install -r requirements.txt
set FLASK_APP=main.py
set FLASK_ENV=development
flask run

Po tym na adresie http://localhost:5000 powinien uruchomić się serwer flaska.
Pod adresem http://localhost:5000/documented_api/swagger znajdziesz dokumentację endpointów z możliwością ich testowania