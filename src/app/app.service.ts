import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PeoplePickerQuery } from "./Model/App.Model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json;odata=verbose' })
};

@Injectable()
export class AppService {
  private siteURL = 'https://incyte.sharepoint.com/sites/Dev';

  RequestDigest: string;

  constructor(
    private _http: HttpClient) { }

  public getUserSuggestions(url: string, jsonBody: any, res: any): Observable<any> {
    const httpOptions1 = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json;odata=verbose')
        .set('X-HTTP-Method', 'MERGE')
        .set('If-Match', '*')
        .set('X-RequestDigest', res)
    };
    const httpURL = this.siteURL + url;
    const data = JSON.stringify(jsonBody);
    return this._http.post<any>(httpURL, data, httpOptions1).pipe(
      tap(httpres => this.log('Fetched Data')),
      catchError(this.handleError('addListItem', []))
    );

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error('Verbose Logging'); // log to console instead
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      //return of(result as T);
      return Observable.throw(error.error.error.message.value);
    };
  }

  private log(message: string) {
    console.log('AppService: ' + message);
  }

  getService(): Observable<any> {
    const appweburl = this.siteURL + '/_api/contextinfo';
    return this._http.post<any>(appweburl, {}, httpOptions).pipe(
      tap(data => this.log('Fetched RequestDigest')),
      catchError(this.handleError('getService', []))
    );
  }
}

