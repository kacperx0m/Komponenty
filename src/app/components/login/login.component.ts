import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  reactiveForm: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  constructor(private router: Router){}

  onSubmit() {
    this.isSubmitted = true;
    if (this.reactiveForm.valid){
      this.router.navigate(['/home']);
    } else {
      console.log("formularz jest bledny");
    }
    
  }
}
