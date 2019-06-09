import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Budget } from './budget.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private _http: HttpClient) { }

  getBudget(budgetMonth: Date): Observable<Budget> {
    return this._http.get<Budget>('/api/budget?budgetMonth=' + budgetMonth.toISOString())
      .pipe(map(response => {
        if (typeof response.month === 'string') {
          response.month = new Date(response.month as string);
        }
        return response;
      }));
  }

  addBudget(budget: Budget) {
    return this._http.post('/api/budget', budget);
  }
}
