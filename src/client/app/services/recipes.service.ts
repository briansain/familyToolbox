import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../../../models/recipe.model';
@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private _httpClient: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this._httpClient.get<Recipe[]>('/api/recipes');
  }

  getRecipe(id: string): Observable<Recipe> {
    return this._httpClient.get<Recipe>('/api/recipes/'+id);
  }

  putRecipe(id: string, recipe: Recipe): Observable<any> {
    return this._httpClient.put('/api/recipes/' + id, recipe);
  }

  createRecipe(recipe: Recipe): Observable<any> {
    return this._httpClient.post('/api/recipes', recipe);
  }

  deleteRecipe(id: string): Observable<Recipe> {
    return this._httpClient.delete('/api/recipes/' + id);
  }
}
