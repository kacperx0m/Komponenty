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
    ingredients: [INGREDIENTS[3]],
    name: "budyn",
    type: MealType.Supper,
    nutritionals: calculateTotalNutrition([INGREDIENTS[3]])
  },
  {
    ingredients: [INGREDIENTS[4],INGREDIENTS[5],INGREDIENTS[6]],
    name: "schabowy z ziemniakami i surowka",
    type: MealType.Dinner,
    nutritionals: calculateTotalNutrition([INGREDIENTS[4],INGREDIENTS[5],INGREDIENTS[6]])
  },
  {
    ingredients: [INGREDIENTS[7],INGREDIENTS[8],INGREDIENTS[9]],
    name: "salatka z tunczykiem",
    type: MealType.Lunch,
    nutritionals: calculateTotalNutrition([INGREDIENTS[7],INGREDIENTS[8],INGREDIENTS[9]])
  },

  {
    ingredients: [INGREDIENTS[10],INGREDIENTS[11],INGREDIENTS[12]],
    name: "kotlet schabowy z ziemniakami i mizeria ",
    type: MealType.Dinner,
    nutritionals: calculateTotalNutrition([INGREDIENTS[10],INGREDIENTS[11],INGREDIENTS[12]])
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
