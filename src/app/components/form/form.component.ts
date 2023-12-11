import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../data/models/user';
import { Router } from '@angular/router';
import { CalculateService } from 'src/app/services/calculate/calculate.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  user: User;
  reactiveForm: FormGroup; //teraz bez bledu bo ustawione w tsconfig json
  passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,30}$/;
  isSubmitted = false;
  isValid = false;

  ngOnInit(): void {
      this.reactiveForm = new FormGroup({
        username: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.max(30), Validators.pattern('[a-zA-Z]*')]),
        password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.max(30), Validators.pattern(this.passwordPattern)]),
        name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.max(20), Validators.pattern('[A-Z][a-z]*')]),
        weight: new FormControl(null, [Validators.required, Validators.min(2), Validators.max(600), Validators.pattern('[0-9]*')]),
        height: new FormControl(null, [Validators.required, Validators.min(30), Validators.max(350), Validators.pattern('[0-9]*')]),
        age: new FormControl(null, [Validators.required, Validators.min(12), Validators.max(130), Validators.pattern('[0-9]*')]),
        goal: new FormControl(null, [Validators.required,]),
        gender: new FormControl(null, Validators.required),
        activityLevel: new FormControl(null, Validators.required),
      });
  }

  constructor(private router: Router, private calculateService: CalculateService){}


  // do optymalizacji
  onSubmit() {
    this.isSubmitted = true;
    if (this.reactiveForm.valid){
      this.user = {};
      Object.assign(this.user, this.reactiveForm.value);

      const weight = this.user.weight;
      const height = this.user.height;
      const age = this.user.age;
      const gender = this.user.gender;
      const activityLevel = this.user.activityLevel;
      this.calculateService.calculateBMI(weight, height);
      this.calculateService.calculateBMR(gender, age, weight, height);
      this.calculateService.calculateTDEE(activityLevel, gender, weight, height, age);

      this.calculateService.setUser(this.user);

      this.router.navigate(['/login']);
    } else {
      console.log("formularz jest bledny");
    }
    
  }
}
