import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private router: Router, private authService: AuthService){}

  onSubmit() {
    this.isSubmitted = true;
    if (this.reactiveForm.valid){
      this.authService.isLoggedIn = true;
      this.router.navigate(['/home']);
    } else {
      console.log("formularz jest bledny");
    }
  }

  register() {
    this.router.navigate(['/register']);
  }
}
