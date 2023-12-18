import { Component } from '@angular/core';
import { nutritionType } from 'src/app/data/enums/nutritionType.enum';
import { MEALS } from 'src/app/data/mock/meals.data';
import { Meal } from 'src/app/data/models/meal';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent {
  meals:Meal[];
  currentDate: Date = new Date();
  showTrue = false;
  selectedMeal: Meal;
  new = false;
  nutrients = Object.values(nutritionType);
  ingredients: string[] = [''];

  ngOnInit() {
    this.meals = MEALS;
  }

  toggleShow(meal: Meal) {
    if (this.selectedMeal!=meal) {
      this.selectedMeal = meal;
      this.showTrue = true;
    }
    else {
      if (!this.showTrue) this.showTrue = true;
      else this.showTrue = false;
    }
  }

  addNew() {
    this.new = !this.new;
    console.log(this.nutrients);
  }

  onIngredientChange(index: number) {
    if (this.ingredients[index].length >= 3 && index === this.ingredients.length - 1) {
      this.ingredients.push('');
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}
