import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { JsonData } from './json-data';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  // private imageDataSource = new BehaviorSubject<any[]>([]);
  // currentImageData = this.imageDataSource.asObservable();

  // changeImageData(images: any[]) {
  //   this.imageDataSource.next(images);
  // }
  private _UrlData = new BehaviorSubject<JsonData[]>([]);
  public currentUrlData = this._UrlData.asObservable();

  constructor(private http: HttpClient) { }

  fetchUrlData(endpoint:string):Observable<JsonData[]>{
    return this.http.get<JsonData[]>(endpoint).pipe(
      tap((data)=>this._UrlData.next(data))
      ,catchError(
        (error)=>{
        console.error("Error",error)
        return [];
      })
    )
  }
}
