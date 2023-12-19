import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../../data/models/ingredient';
@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private baseUrl = 'http://localhost:5000/documented_api'; // Adjust the base URL as needed
  private ingredientsUrl = 'http://localhost:5000/documented_api/ingredient';
  constructor(private http: HttpClient) {}

  // getIngredientDetails(ingredientName: string): Observable<Ingredient> {
  //   const encodedName = encodeURIComponent(ingredientName);
  //   return this.http.get<Ingredient>(`${this.baseUrl}/ingredient/${encodedName}`);
  // }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.ingredientsUrl);
  }
}
