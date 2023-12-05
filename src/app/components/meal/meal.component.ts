import { Component } from '@angular/core';
import { Meal } from 'src/app/meal';
import {MEALS} from 'src/app/meals.data'
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent{
  meals:Meal[];

  ngOnInit() {
    this.meals = MEALS;
  }
}
