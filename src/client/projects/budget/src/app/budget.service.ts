import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Budget } from './budget.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private _http: HttpClient) { }

  getBudget(budgetMonth: Date): Observable<Budget> {
    return this._http.get<Budget>('/api/budget?budgetMonth=' + budgetMonth.toISOString());
  }
}
