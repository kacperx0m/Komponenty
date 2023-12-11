import { Component } from '@angular/core';
import { Meal } from 'src/app/data/models/meal';
import {MEALS} from 'src/app/data/mock/meals.data'
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
