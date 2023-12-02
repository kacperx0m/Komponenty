import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit{
  reactiveForm: FormGroup; //teraz bez bledu bo ustawione w tsconfig json

  ngOnInit(): void {
      this.reactiveForm = new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
      });
  }

  onSubmit() {
    console.log(this.reactiveForm);
  }
}
