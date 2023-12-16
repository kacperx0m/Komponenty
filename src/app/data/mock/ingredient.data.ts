import { Ingredient } from "../models/ingredient";
import { nutritionType } from "../enums/nutritionType.enum";

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
  },

  {
    name: "Budyn",
    nutritionals: [
      { type: nutritionType.fats, value: 20 },
      { type: nutritionType.proteins, value: 10 },
      { type: nutritionType.sugars, value:10 }
    ]
  },

  {
    name: "Kotlet Schabowy",
    nutritionals: [
      { type: nutritionType.fats, value: 30 },
      { type: nutritionType.proteins, value: 20 },
      { type: nutritionType.salt, value:2 }
    ]
  },

  {
    name: "Ziemniaki",
    nutritionals: [
      { type: nutritionType.carbohydrates, value: 30 },
      { type: nutritionType.proteins, value: 3 },
      { type: nutritionType.salt, value:1 }
    ]
  },

  {
    name: "Surowka",
    nutritionals: [
      { type: nutritionType.calorific_value, value: 50 },
      { type: nutritionType.proteins, value: 13 },
      { type: nutritionType.salt, value:1 }
    ]
  },

  {
    name: "Tunczyk",
    nutritionals: [
      { type: nutritionType.fats, value: 20 },
      { type: nutritionType.proteins, value: 20 },
      { type: nutritionType.salt, value:2 }
    ]
  },

  {
    name: "Sos",
    nutritionals: [
      { type: nutritionType.carbohydrates, value: 5 },
      { type: nutritionType.sugars, value: 5 },
    ]
  },

  {
    name: "Salatka",
    nutritionals: [
      { type: nutritionType.proteins, value: 20 },
      { type: nutritionType.calorific_value, value:40 }
    ]
  }
]
