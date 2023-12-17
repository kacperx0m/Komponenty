// meals.data.ts
import { Ingredient } from '../models/ingredient';
import { Meal, } from '../models/meal';
import { Nutrition } from '../models/nutrition';
import { nutritionType } from '../enums/nutritionType.enum';
import {INGREDIENTS} from './ingredient.data';
import { MealType } from '../enums/mealType.enum';






export const MEALS:Meal[] = [
  {
    ingredients: [INGREDIENTS[0],INGREDIENTS[1],INGREDIENTS[2]],
    name: "kanapka z maslem i jajkami",
    type: MealType.Breakfast,
    nutritionals: calculateTotalNutrition([INGREDIENTS[0],INGREDIENTS[1],INGREDIENTS[2]])
  },
  {
    ingredients: [INGREDIENTS[3],INGREDIENTS[4],INGREDIENTS[5]],
    name: "kotlet schabowy z ziemniakami i mizeria ",
    type: MealType.Dinner,
    nutritionals: calculateTotalNutrition([INGREDIENTS[3],INGREDIENTS[4],INGREDIENTS[5]])
  }
];




function calculateTotalNutrition(ingredients: Ingredient[]): Nutrition[] {
  let totalNutrition: Nutrition[] = [];

  ingredients.forEach(ingredient => {
    ingredient.nutritionals.forEach(nutritional => {
      const existingNutritional = totalNutrition.find(n => n.type === nutritional.type);
      if (existingNutritional) {
        existingNutritional.value += nutritional.value;
      } else {
        totalNutrition.push({ ...nutritional });
      }
    });
  });

  return totalNutrition;
}
