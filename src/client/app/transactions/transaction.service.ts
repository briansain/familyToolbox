import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const url = '/api/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private _client: HttpClient) { }

  public getTransactions(startDate: Date, endDate: Date): Observable<any> {
    return this._client.get<any>(
      url 
      + '?startDate='+startDate.toLocaleDateString()
      + '&endDate=' + endDate.toLocaleDateString());
  }
}
