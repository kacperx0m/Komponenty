import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { CalculateService } from 'src/app/services/calculate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  user: User;
  jakasKategoriaCzyCos: any;
  userBMI: number;
  userBMR: number;
  userTDEE: number;
  userCalories: number;

  isRightPanelOpen: boolean = true;

  constructor(private calculateService: CalculateService) {}

  ngOnInit(): void {
    this.user = this.calculateService.getUser();
    console.log(this.user);

    // do testow
    this.userBMI = this.calculateService.calculateBMI(this.user.weight, this.user.height);//this.calculateService.bmi;
    this.userBMR = this.calculateService.calculateBMR(this.user.gender, this.user.weight, this.user.height, this.user.age);//.bmr;
    this.userTDEE = this.calculateService.calculateTDEE(this.user.activityLevel, this.user.gender, this.user.weight, this.user.height, this.user.age);//.tdee;
    this.userCalories = this.calculateService.calculatePercentage(1234);
  }

  togglePanel() {
    this.isRightPanelOpen = !this.isRightPanelOpen;
  }

  currentDate: Date = new Date();
  today: string = this.formatDate(this.currentDate);
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
}
