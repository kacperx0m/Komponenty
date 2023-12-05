import { Injectable } from '@angular/core';
import { User } from '../user';
import { Goal } from '../goal.enum';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  user: User = {
    
      username: 'exampleUser',
      password: 'examplePassword',
      name: 'John Doe',
      weight: 70,
      height: 175,
      age: 25,
      goal: 0,
      gender: 'm',
      activityLevel: 'niski',
    
  };
  

  bmi: number;
  bmr: number;
  tdee: number;
  calories: number;

  constructor() {

  }

  setUser(user: User) {
    this.user = user;
    // console.log(this.user);
  }

  getUser(): User {
    return this.user;
  }

  // body mass index - body fat
  calculateBMI(weight: number, height: number): number {
    height/=100;
    this.bmi = weight/(height*height);
    console.log(weight);
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
    this.tdee = this.bmr * scale;
    return this.tdee;
  }

  calculatePercentage(calories: number): number {
    this.calories = calories/this.tdee * 100;
    return this.calories;
  }
}
