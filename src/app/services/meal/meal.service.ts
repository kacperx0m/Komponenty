import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from 'src/app/data/models/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private mealUrl = 'http://localhost:5000/documented_api/meal';

  constructor(private http: HttpClient) { }

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.mealUrl);
  }
  getMealById(id: number): Observable<Meal> {
    return this.http.get<Meal>(`${this.mealUrl}/${id}`);
  }
}
