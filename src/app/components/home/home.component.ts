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

}
