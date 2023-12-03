import { Injectable } from '@angular/core';
import { FormComponent } from '../components/form/form.component';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  user: FormComponent;

  constructor() {

  }

  // body mass index - body fat
  calculateBMI(weight: number, height: number): number {
    return weight/(height*height);
  }

  // basal metabolic rate - calories at rest
  calculateBMR(gender: string, weight: number, height: number, age: number): number {
    if (gender == 'm') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
  }

  // total daily energy expenditure - calories burnt a day, more precise
  calculateTDEE(activity: string, gender: string, weight: number, height: number, age: number): number {
    let bmr = this.calculateBMR(gender, weight, height, age);
    let scale = 1;
    // poziomy aktywnosci
    if (activity == 'niski') {
      scale = 1.2;
    }
    return bmr * scale;
  }
}
