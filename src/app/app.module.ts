import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MealComponent } from './components/meal/meal.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { DirectiveDirective } from './data/directives/directive/directive.directive';
import { CapitalizePipe } from './data/pipes/capitalize/capitalize.pipe';
import { DayViewComponent } from './components/day-view/day-view.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MealComponent,
    FormComponent,
    HomeComponent,
    LoginComponent,
    DirectiveDirective,
    CapitalizePipe,
    DayViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
