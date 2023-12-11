import { Goal } from "../enums/goal.enum";

export interface User {
    username?: string;
    password?: string;
    name?: string;
    weight?: number;
    height?: number;
    age?: number;
    goal?: Goal;
    gender?: string;
    activityLevel?: string;
}