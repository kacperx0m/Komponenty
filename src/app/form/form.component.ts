import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      name: new FormControl('', Validators.required),
      password: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
      age: new FormControl(''),
    });;
  }
 

  
  get username() {
    return this.userForm.get('username');
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form submitted!', this.userForm.value);
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
