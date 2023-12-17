import { Component } from '@angular/core';
import { Meal } from 'src/app/data/models/meal';
import {MEALS} from 'src/app/data/mock/meals.data'
import { Nutrition } from 'src/app/data/models/nutrition';
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent{
  meals:Meal[];

  ngOnInit() {
    this.meals = MEALS;
    this.sortNutritionals = this.sortNutritionals.bind(this);
  }
  sortNutritionals(nutritionals: Nutrition[]): Nutrition[] {
    const order = ['calorific_value', 'fats', 'carbohydrates', 'sugars', 'proteins', 'salt'];
    return nutritionals.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
  }
}
