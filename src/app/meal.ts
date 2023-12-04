import { Ingredient } from "./ingredient";
import { Nutrition } from "./nutrition";

export interface Meal {
  ingredients: Array<Ingredient>,
  name:string,
  type : MealType,
  nutritionals: Array<Nutrition>;
}
