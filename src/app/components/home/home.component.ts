import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../data/models/user';
import { CalculateService } from 'src/app/services/calculate/calculate.service';
import { bmiCategory } from 'src/app/data/enums/bmiCategory.enum';
import { Goal } from 'src/app/data/enums/goal.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  user: User;
  jakasKategoriaCzyCos: bmiCategory;
  userBMI: number;
  userBMR: number;
  userTDEE: number;
  userCalories: number;
  today: Date = new Date();
  goalCalories: number;
  editing: boolean = false;
  goals = Object.values(Goal);

  isRightPanelOpen: boolean = true;

  constructor(private calculateService: CalculateService) {}

  tempHeight: number;
  tempWeight: number;
  tempGoal: Goal;
  tempActivity: string;

  ngOnInit(): void {
    this.user = this.calculateService.getUser();
    console.log(this.user);

    this.tempHeight = this.user.height;
    this.tempWeight = this.user.weight;
    this.tempGoal = this.user.goal;
    this.tempActivity = this.user.activityLevel;

    // do testow
    this.userBMI = this.calculateService.calculateBMI(this.user.weight, this.user.height);//this.calculateService.bmi;
    this.userBMR = this.calculateService.calculateBMR(this.user.gender, this.user.weight, this.user.height, this.user.age);//.bmr;
    this.userTDEE = this.calculateService.calculateTDEE(this.user.activityLevel, this.user.gender, this.user.weight, this.user.height, this.user.age);//.tdee;
    this.jakasKategoriaCzyCos = this.calculateService.categorizeWeight(this.userBMI);
    this.goalCalories = this.calculateService.calculateGoal(this.user.goal);
    this.userCalories = this.calculateService.calculatePercentage(1234, this.goalCalories);
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


  // @ViewChild('goalSelect') goalSelect: any;
  // @ViewChild('heightInput') heightInput: any;
  // @ViewChild('weightInput') weightInput: any;
  // @ViewChild('activitySelect') activitySelect: any;

  save() {
    this.editing = false;
    this.user.goal = this.tempGoal;
    this.user.height = this.tempHeight;
    this.user.weight = this.tempWeight;
    this.user.activityLevel = this.tempActivity;
    this.userBMI = this.calculateService.calculateBMI(this.user.weight, this.user.height);
    this.userBMR = this.calculateService.calculateBMR(this.user.gender, this.user.weight, this.user.height, this.user.age);
    this.userTDEE = this.calculateService.calculateTDEE(this.user.activityLevel, this.user.gender, this.user.weight, this.user.height, this.user.age);
    this.jakasKategoriaCzyCos = this.calculateService.categorizeWeight(this.userBMI);
    this.goalCalories = this.calculateService.calculateGoal(this.user.goal);
    this.userCalories = this.calculateService.calculatePercentage(1234, this.goalCalories);
  }
}
