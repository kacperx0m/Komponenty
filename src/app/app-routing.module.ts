import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { LoginGuard } from './services/auth/auth.service';
import { LoginComponent } from './components/login/login.component';
import { DayViewComponent } from './components/day-view/day-view.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: FormComponent},
  {path: 'home', component: HomeComponent, canActivate: [LoginGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'day-view', component: DayViewComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
