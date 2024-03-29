import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../data/models/user';
import { bmiCategory } from 'src/app/data/enums/bmiCategory.enum';
import { Goal } from 'src/app/data/enums/goal.enum';
import { Meal } from 'src/app/data/models/meal';
import { nutritionType } from 'src/app/data/enums/nutritionType.enum';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/data/models/ingredient';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ingredient: Ingredient;
  user: User;
  jakasKategoriaCzyCos: bmiCategory;
  userBMI: number;
  userBMR: number;
  userTDEE: number;
  userCalories: number = 0;
  userCaloriesPercentage:number;
  today: Date = new Date();
  goalCalories: number;
  editing: boolean = false;
  goals = Object.values(Goal);
  selectedMeals: Meal[] = [];
  totalMealCalories: number = 0;
  params: any;

  isRightPanelOpen: boolean = true;

  constructor(private ingredientService: IngredientService, private authService: AuthService, private router: Router) {}

  tempHeight: number;
  tempWeight: number;
  tempGoal: Goal;
  tempActivity: string;
  ingredients: Ingredient[] = [];

  ngOnInit(): void {
    this.user = this.authService.user;

    this.tempHeight = this.user.height;
    this.tempWeight = this.user.weight;
    this.tempGoal = this.user.goal;
    this.tempActivity = this.user.activityLevel;
    //  this.getIngredient('Budyn');
    this.getIngredients();

    // do testow
    this.userBMI = this.user.bmi;//this.calculateService.bmi;
    this.userBMR = this.user.bmr;//.bmr;
    this.userTDEE = this.user.tdee;//.tdee;
    this.jakasKategoriaCzyCos = this.user.weightCategory;
    this.goalCalories = this.user.goalCalories;
    this.userCaloriesPercentage = this.user.calories;
  }

  // getIngredient(ingredientName: string) {
  //   this.ingredientService.getIngredientDetails(ingredientName).subscribe(
  //     data => {
  //       this.ingredient = data;
  //     },
  //     error => {
  //       console.error('There was an error retrieving the ingredient!', error);
  //     }
  //   );
  // }

  getIngredients(): void {
    this.ingredientService.getIngredients().subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
        this.ingredients.forEach((ingredient) => {
          console.log('Ingredient taken:', ingredient.name);
        });
      },
      error => {
        console.error('Error fetching ingredients', error);
      }
    );
  }


  togglePanel() {
    this.isRightPanelOpen = !this.isRightPanelOpen;
  }

  currentDate: Date = new Date();
  daytoday: string = this.formatDate(this.currentDate);
  yesterday: string = this.formatDate(this.getPreviousDate(this.currentDate));
  tomorrow: string = this.formatDate(this.getNextDate(this.currentDate));

  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', weekday: 'long' };
    return date.toLocaleDateString('pl-PL', options);
  }

  private getPreviousDate(date: Date): Date {
    return new Date(date.getTime() - 24 * 60 * 60 * 1000);
  }

  private getNextDate(date: Date): Date {
    return new Date(date.getTime() + 24 * 60 * 60 * 1000);
  }

  edit() {
    this.editing = true;
  }

  onMealSelected(event: { meal: Meal, isChecked: boolean }) {
    if (event.isChecked) {
      this.selectedMeals.push(event.meal);
    } else {
      this.selectedMeals = this.selectedMeals.filter(meal => meal !== event.meal);
    }
    this.totalMealCalories = this.calculateTotalMealCalories();
    this.updateUserCalories();
  }

  private calculateTotalMealCalories(): number {
    return this.selectedMeals.reduce((totalCalories, meal) => {
      const mealCalories = meal.ingredients.reduce((mealTotal, ingredient) => {
        const calorificValueNutrition = ingredient.nutritionals.find(nutrition => nutrition.type === nutritionType.calorific_value);
        return mealTotal + (calorificValueNutrition ? calorificValueNutrition.value : 0);
      }, 0);
      return totalCalories + mealCalories;
    }, 0);
  }


  private updateUserCalories() {
    this.userCalories = this.user.updateCalorie(this.totalMealCalories);
   // this.userCaloriesPercentage = this.userCalories / 100;
    this.userCaloriesPercentage = this.user.calculatePercentage(this.totalMealCalories, this.goalCalories);

  }


  // @ViewChild('goalSelect') goalSelect: any;
  // @ViewChild('heightInput') heightInput: any;
  // @ViewChild('weightInput') weightInput: any;
  // @ViewChild('activitySelect') activitySelect: any;

  save() {
    this.user.goal = this.tempGoal;
    this.user.height = this.tempHeight;
    this.user.weight = this.tempWeight;
    this.user.activityLevel = this.tempActivity;
    this.userBMI = this.user.calculateBMI(this.user.weight, this.user.height);
    this.userBMR = this.user.calculateBMR(this.user.gender, this.user.weight, this.user.height, this.user.age);
    this.userTDEE = this.user.calculateTDEE(this.user.activityLevel, this.user.gender, this.user.weight, this.user.height, this.user.age);
    this.jakasKategoriaCzyCos = this.user.categorizeWeight(this.userBMI);
    this.goalCalories = this.user.calculateGoal(this.user.goal);
    this.updateUserCalories();

    this.params = {
      'id': this.authService.user.id,
      'username': this.authService.user.Username,
      'password': this.authService.user.Password,
      'name': this.authService.user.name,
      'weight': this.authService.user.weight,
      'height': this.authService.user.height,
      'age': this.authService.user.age,
      'goal': this.authService.user.goal,
      'gender': this.authService.user.gender,
      'activity_level': this.authService.user.activityLevel
    }

    this.authService.update(this.params).subscribe((response) => {
      if (response['message'] == 'Ok') {
        this.editing = false;
      } else {
        alert(response['message']);
      }
    })
    
  }

  logout() {
    this.authService.user = null;
    this.router.navigate(['/login']);
  }
}
