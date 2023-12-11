// meals.data.ts
import { Ingredient } from './ingredient';
import { Meal, } from './meal';
import { Nutrition } from './nutrition';
import { nutritionType } from './nutritionType.enum';
import {INGREDIENTS} from './ingredient.data';
import { MealType } from './mealType.enum';






export const MEALS:Meal[] = [
  {
    ingredients: [INGREDIENTS[0],INGREDIENTS[1],INGREDIENTS[2]],
    name: "kanapka z maslem i jajkami",
    type: MealType.Breakfast,
    nutritionals: calculateTotalNutrition([INGREDIENTS[0],INGREDIENTS[1],INGREDIENTS[2]])
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
