import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JasperReportService {

  private apiUrl = `${environment.apiUrl}/jasper`;

  constructor(private http: HttpClient) { }

  gerarRelatorio(numOrcamento: number): Observable<Blob> {
    const url = `${this.apiUrl}/${numOrcamento}`;
    return this.http.get(url, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf',
      }),
    });
  }
}