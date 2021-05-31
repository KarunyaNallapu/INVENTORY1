import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inventory } from 'src/assets/utils/inventory';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  inventoryIdSource = new BehaviorSubject<number>(0);
  inventoryIdData: any;

  URL = 'http://localhost:3000'
  public headers = new HttpHeaders()
    .set('Content-Type', 'application/json')

  constructor(public http: HttpClient) {
    this.inventoryIdData = this.inventoryIdSource.asObservable();
  }
  editUser(id: any) {
    this.inventoryIdSource.next(id);
  }
  public getInventory(): Observable<any> {
    return this.http.get(this.URL + '/data', { headers: this.headers }).pipe(catchError(this.errorHandler));
  }

  public addInventory(params:Object): Observable<Inventory>{
    return this.http.post<Inventory>(this.URL + '/data', params, { headers: this.headers }).pipe(catchError(this.errorHandler))

  }

  public updateInventory(id: number, params: Object): Observable<Inventory> {
    return this.http.put<Inventory>(this.URL + '/data/' + id + '/', params, { headers: this.headers }).pipe(catchError(this.errorHandler))

  }
  public deleteInventory(params: number): Observable<Inventory> {
    return this.http.delete<Inventory>(this.URL + '/data/' + params, { headers: this.headers }).pipe(catchError(this.errorHandler))

  }
  public getInventoryUpdateData(inventoryId: number): Observable<Inventory> {
    let header = new HttpHeaders();
    header.append('Content-Type', 'applications/json');
    return this.http.get<Inventory>(this.URL + "/data/" + inventoryId, { headers: this.headers }).pipe(catchError(this.errorHandler))
  }
  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('error in API service', error);
    return throwError(error);
  }
}
