import { Goal } from "../enums/goal.enum";

export class User {
    private username: string;
    private password: string;
    name?: string;
    weight?: number;
    height?: number;
    age?: number;
    goal?: Goal;
    gender?: string;
    activityLevel?: string;

    constructor(name: string, weight: number, height: number, age: number, goal: Goal, gender: string, activityLevel: string) {
        // this.username = username;
        // this.password = password;
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.age = age;
        this.goal = goal;
        this.gender = gender;
        this.activityLevel = activityLevel;
    }

    set Username(username: string) {
        this.username = username;
    }

    set Password(password: string) {
        this.password = password;
    }

    get Username(): string {
        return this.username;
    }

    get Password(): string {
        return this.password;
    }
}