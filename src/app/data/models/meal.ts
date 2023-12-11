import { Ingredient } from "./ingredient";
import { MealType } from "../enums/mealType.enum";
import { Nutrition } from "./nutrition";

export interface Meal {
  ingredients: Array<Ingredient>,
  name:string,
  type : MealType,
  nutritionals: Array<Nutrition>;
}
