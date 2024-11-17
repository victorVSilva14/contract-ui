import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPaginatedBudgets(pageIndex: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/orcamento/getAll`, { params });
  }
}
