import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { Rate } from '../model/rate.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  apiUrl = 'http://localhost:8080/api/rating';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

  constructor(
    private httpClient: HttpClient
  ) { }

  rate(rate: any): Observable<Rate> {
    return this.httpClient.post<Rate>(this.apiUrl + '/rate', JSON.stringify(rate), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getTypes(): Observable<string[]>{
    return this.httpClient.get<string[]>(this.apiUrl + '/types'); 
  }

  getCountGood(): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + '/good');
  }

  getCountBad(): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + '/bad');
  }

  getCountNotBad(): Observable<number> {
    return this.httpClient.get<number>(this.apiUrl + '/notbad');
  }
}
