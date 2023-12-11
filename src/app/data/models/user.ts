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

    constructor(username: string, password: string, name: string, weight: number, height: number, age: number, goal: Goal, gender: string, activityLevel: string) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.age = age;
        this.goal = goal;
        this.gender = gender;
        this.activityLevel = activityLevel;
    }

    setUsername(username: string): void {
        this.username = username;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }
}