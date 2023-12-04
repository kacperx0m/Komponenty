import { nutritionType } from "./nutritionType.enum";

export interface Nutrition {
  type: nutritionType;
  value: number;
}
