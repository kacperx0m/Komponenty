import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

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
    console.log("przeslano formularz");
  }
}
