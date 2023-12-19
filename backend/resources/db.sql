-- CREATE TABLE User(id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, name TEXT, weight REAL, height REAL, age INTEGER, goal TEXT, gender TEXT, activity_level INTEGER);
-- CREATE TABLE Meal(id INTEGER PRIMARY KEY, name TEXT NOT NULL, type TEXT);
-- CREATE TABLE Ingredient(name TEXT PRIMARY KEY);
-- CREATE TABLE Nutrition(type TEXT PRIMARY KEY);
-- CREATE TABLE IngredientsInMeal(meal_id INTEGER, ingredient TEXT, FOREIGN KEY(meal_id) REFERENCES Meal(id), FOREIGN KEY(ingredient) REFERENCES Ingredient(name));
-- CREATE TABLE NutritionsForMeal(meal_id INTEGER, nutrition TEXT, quantity REAL, FOREIGN KEY(meal_id) REFERENCES Meal(id), FOREIGN KEY(nutrition) REFERENCES Nutrition(name));
-- CREATE TABLE NutritionsForIngredient(ingredient TEXT, nutrition TEXT, quantity REAL, FOREIGN KEY(ingredient) REFERENCES Ingredient(name), FOREIGN KEY(nutrition) REFERENCES Nutrition(name));
-- CREATE TABLE History(id INTEGER PRIMARY KEY, user_id INTEGER, meal_id INTEGER, type TEXT, date DATE, FOREIGN KEY(user_id) REFERENCES User(id), FOREIGN KEY(meal_id) REFERENCES Meal(id));

-- INSERT INTO User(username, password, name, weight, height, age, goal, gender, activity_level) VALUES('admin', 'admin', 'Admin', 90, 190, 22, 'urzymać', 'mężczyzna', 1)
-- INSERT INTO Nutrition VALUES('kcal'), ('tłuszcz'), ('węglowodany'), ('białko') 

-- ALTER TABLE User DROP COLUMN activity_level

SELECT * FROM User