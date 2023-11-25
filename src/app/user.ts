import { Goal } from "./goal";

export interface User {
    username: string;
    password: string;
    name: string;
    weight: number;
    height: number;
    age: number;
    goal: Goal;
}