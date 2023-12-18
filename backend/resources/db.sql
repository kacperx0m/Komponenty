-- CREATE TABLE User(id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, name TEXT, weight REAL, height REAL, age INTEGER, goal TEXT);
-- CREATE TABLE Meal(id INTEGER PRIMARY KEY, name TEXT NOT NULL, type TEXT);
-- CREATE TABLE Ingredient(name TEXT PRIMARY KEY);
-- CREATE TABLE Nutrition(type TEXT PRIMARY KEY);
-- CREATE TABLE IngredientsInMeal(meal_id INTEGER, ingredient TEXT, FOREIGN KEY(meal_id) REFERENCES Meal(id), FOREIGN KEY(ingredient) REFERENCES Ingredient(name));
-- CREATE TABLE NutritionsForMeal(meal_id INTEGER, nutrition TEXT, quantity REAL, FOREIGN KEY(meal_id) REFERENCES Meal(id), FOREIGN KEY(nutrition) REFERENCES Nutrition(name));
-- CREATE TABLE NutritionsForIngredient(ingredient TEXT, nutrition TEXT, quantity REAL, FOREIGN KEY(ingredient) REFERENCES Ingredient(name), FOREIGN KEY(nutrition) REFERENCES Nutrition(name));
-- CREATE TABLE History(id INTEGER PRIMARY KEY, user_id INTEGER, meal_id INTEGER, type TEXT, date DATE, FOREIGN KEY(user_id) REFERENCES User(id), FOREIGN KEY(meal_id) REFERENCES Meal(id));

-- INSERT INTO User(username, password, name, weight, height, age, goal) VALUES('user', 'password', 'Admin', 90, 190, 22, 'keep')

SELECT * FROM User