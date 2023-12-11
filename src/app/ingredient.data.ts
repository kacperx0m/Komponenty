import { Ingredient } from "./ingredient";
import { nutritionType } from "./nutritionType.enum";

export const INGREDIENTS:Ingredient[] = [
  {
    name: "Jajko",
    nutritionals: [
      {type:nutritionType.calorific_value,value:300},
        {type: nutritionType.proteins, value:8},
      {type: nutritionType.fats, value:9}
    ]
  },

  {
    name: "Chleb",
    nutritionals: [
      {type: nutritionType.carbohydrates,value:50},
      {type: nutritionType.proteins,value : 9}
    ]
  },

  {
    name: "Maslo",
    nutritionals: [
      { type: nutritionType.fats, value: 81 },
      { type: nutritionType.proteins, value: 1 }
    ]
  }
]
