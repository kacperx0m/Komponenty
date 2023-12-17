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
    name: "ziemniaki",
    nutritionals: [
      {type:nutritionType.calorific_value,value:300},
      { type: nutritionType.carbohydrates, value: 60},
      { type: nutritionType.proteins, value: 10 }
    ]
  },

  {
    name: "mizeria",
    nutritionals: [

      { type: nutritionType.fats, value: 10 },
      { type: nutritionType.carbohydrates, value: 30 },
      { type: nutritionType.salt,value:1}

    ]
  },

  {
    name: "Kotlet schabowy",
    nutritionals: [
      {type:nutritionType.calorific_value,value:400},
      { type: nutritionType.fats, value: 20 },
      { type: nutritionType.proteins, value: 40 }
    ]
  }


]
