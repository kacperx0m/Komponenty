import { bmiCategory } from "../enums/bmiCategory.enum";
import { Goal } from "../enums/goal.enum";

export class User {
    private username: string;
    private password: string;
    id: number;
    name?: string;
    weight?: number;
    height?: number;
    age?: number;
    goal?: Goal;
    gender?: string;
    activityLevel?: string;

    bmi?: number;
    bmr?: number;
    tdee?: number;
    weightCategory?: bmiCategory;
    calories?: number = 0;
    goalCalories?: number = 0;


    constructor(id: number, name: string, weight: number, height: number, age: number, goal: Goal, gender: string, activityLevel: string) {
        // this.username = username;
        // this.password = password;
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.age = age;
        this.goal = goal;
        this.gender = gender;
        this.activityLevel = activityLevel;
        this.bmi = this.calculateBMI(this.weight, this.height);//this.calculateService.bmi;
        this.bmr = this.calculateBMR(this.gender, this.weight, this.height, this.age);//.bmr;
        this.tdee = this.calculateTDEE(this.activityLevel, this.gender, this.weight, this.height, this.age);//.tdee;
        this.weightCategory = this.categorizeWeight(this.bmi);
        this.goalCalories = this.calculateGoal(this.goal);
        this.calories = this.updateCalorie(0);
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

    // body mass index - body fat
    calculateBMI(weight: number, height: number): number {
        height/=100;
        this.bmi = weight/(height*height);
        console.log(weight);
        this.weightCategory = this.categorizeWeight(this.bmi);
        return this.bmi;
    }

    // basal metabolic rate - calories at rest
    calculateBMR(gender: string, weight: number, height: number, age: number): number {
        if (gender == 'm') {
        this.bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        return this.bmr;
        } else {
        this.bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        return this.bmr;
        }
    }

     // total daily energy expenditure - calories burnt a day, more precise
    calculateTDEE(activity: string, gender: string, weight: number, height: number, age: number): number {
        this.bmr = this.calculateBMR(gender, weight, height, age);
        let scale = 1;
        // poziomy aktywnosci
        if (activity == 'niski') {
        scale = 1.2;
        }
        if (activity == 'lekki') {
        scale = 1.375;
        }
        if (activity == 'umiarkowany') {
        scale = 1.55;
        }
        if (activity == 'wysoki') {
        scale = 1.725;
        }
        if (activity == 'ultra') {
        scale = 1.9;
        }
        this.tdee = this.bmr * scale;
        return this.tdee;
    }

    calculatePercentage(calories: number, goalCalories: number): number {
        this.calories = calories/(this.tdee+goalCalories) * 100;
        return this.calories;
    }
    updateCalorie(calories:number): number{
        this.calories = calories;
        return this.calories;
     }

    categorizeWeight(bmi: number): bmiCategory {
        if (bmi < 18.5) {
            return bmiCategory.underweight;
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return bmiCategory.healthy;
        } else if (bmi >= 25.0 && bmi <= 29.9) {
            return bmiCategory.overweight;
        } else {
            return bmiCategory.obese;
        }
    }

    calculateGoal(goal: Goal): number {
        if (goal == Goal.przytyc) {
        return this.goalCalories = 500;
        } else if (goal == Goal.schudnac) {
        return this.goalCalories = -500;
        } else {
        return this.goalCalories=0;
        }
    }
}