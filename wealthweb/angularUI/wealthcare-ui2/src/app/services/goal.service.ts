import { Injectable , OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { CommonAppService } from './common-app.service';
import { CommonUrlUtilService } from './common-url-util.service';

@Injectable({
  providedIn: 'root'
})

export class GoalService extends CommonAppService {

  constructor(public http: HttpClient, public urlService : CommonUrlUtilService) { super(http); }

  getAll(): Observable<any> {
    return this.http.get(this.getURL(), this.getHttpHeaders()).pipe(map(this.extractData));
   }
   
   getAllInfoByCustomerId(id): Observable<any> {
    return this.http.get(this.getURL() + "findInfoByCustomerId/" + id, this.getHttpHeaders()).pipe(map(this.extractData));
   }

   getInfoById(id): Observable<any> {
      return this.http.get(this.getURL()+ "findInfo/" + id, this.getHttpHeaders()).pipe(map(this.extractData));
    }

  getById(id): Observable<any> {
    return this.http.get(this.getURL()+ id, this.getHttpHeaders()).pipe(map(this.extractData));
  }

  add (mainData): Observable<any> {
    console.log("add ---> " + JSON.stringify(mainData));
    return this.http.post<any>(this.getURL() , JSON.stringify(mainData), this.getHttpHeaders()).pipe(
      tap((mainData) => console.log(`added  w/ id=${mainData.id}`)),
      catchError(this.handleError<any>('add'))
    );
  }
  update (id, mainData): Observable<any> {
    return this.http.put(this.getURL(), JSON.stringify(mainData), this.getHttpHeaders()).pipe(
      tap(_ => console.log(`updated  id=${id}`)),
      catchError(this.handleError<any>('update'))
    );
  }

  delete (id): Observable<any> {
    return this.http.delete<any>(this.getURL() + id, this.getHttpHeaders()).pipe(
      tap(_ => console.log(`deleted  id=${id}`)),
      catchError(this.handleError<any>('delete'))
    );
  }

  public getURL() {
    return this.urlService.getApiGatewayUrlFinancialplan() + '/financialplan/api/goal/';
  }
}

