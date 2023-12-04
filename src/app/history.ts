import { Meal } from "./meal";
import { User } from "./user";

 export interface History {
  username: User,
  meal: Meal,
  date: Date
}
