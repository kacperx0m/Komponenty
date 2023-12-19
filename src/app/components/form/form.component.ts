import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  user: any;
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

  constructor(private router: Router, private auth: AuthService){}


  // do optymalizacji
  onSubmit() {
    this.isSubmitted = true;
    if (this.reactiveForm.valid){
      this.user = {
        'username': this.reactiveForm.get('username').value,
        'password': this.reactiveForm.get('password').value,
        'name': this.reactiveForm.get('name').value,
        'weight': +this.reactiveForm.get('weight').value,
        'height': +this.reactiveForm.get('height').value,
        'age': +this.reactiveForm.get('age').value,
        'goal': this.reactiveForm.get('goal').value,
        'gender': this.reactiveForm.get('gender').value,
        'activity_level': this.reactiveForm.get('activityLevel').value
      }
      this.auth.register(this.user).subscribe((resposne) => {
        if (resposne['message'] == 'Ok') {
          alert('Udało się utworzyć konto');
          this.router.navigate(['/login']);
        } else {
          alert(resposne['message'])
        }
      })      
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
