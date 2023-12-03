import { Component } from '@angular/core';
import { User } from '../user';
import { CalculateService } from '../calculate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User;
  jakasKategoriaCzyCos: any;
  userBMI: CalculateService;
  userBMR: CalculateService;
  userTDEE: CalculateService;
}
