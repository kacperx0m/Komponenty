import { nutritionType } from "../enums/nutritionType.enum";

export interface Nutrition {
  type: nutritionType;
  value: number;
}
