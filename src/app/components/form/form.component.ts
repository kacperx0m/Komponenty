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
      //Object.assign(this.user, this.reactiveForm.value);

      this.user = new User(
        this.reactiveForm.get('username').value,
        this.reactiveForm.get('password').value,
        this.reactiveForm.get('name').value,
        this.reactiveForm.get('weight').value,
        this.reactiveForm.get('height').value,
        this.reactiveForm.get('age').value,
        this.reactiveForm.get('goal').value,
        this.reactiveForm.get('gender').value,
        this.reactiveForm.get('activityLevel').value
      );

      this.calculateService.calculateBMI(this.user.weight, this.user.height);
      this.calculateService.calculateBMR(this.user.gender, this.user.age, this.user.weight, this.user.height);
      this.calculateService.calculateTDEE(this.user.activityLevel, this.user.gender, this.user.weight, this.user.height, this.user.age);

      this.calculateService.setUser(this.user);

      this.router.navigate(['/login']);
    } else {
      console.log("formularz jest bledny");
    }
    
  }

  getValues() {
    for (const field in this.reactiveForm.controls) {
      const control = this.reactiveForm.get(field);
    }
  }
}
