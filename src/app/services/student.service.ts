import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getData(id: number): Observable<any> {
    const request  = { id: id };
    
    return this.http.post<any>(`${this.apiUrl}/student`, request);
  }
  // getInfosById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/info/${id}`).pipe(
  //     tap(response => console.log('Réponse API info:', response))
  //   );
  // }
  
  // getStudentsById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/student/${id}`).pipe(
  //     tap(response => console.log('Réponse API étudiant:', response))
  //   );
  // }

  // getCandidaciesById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/candidacy/${id}`).pipe(
  //     tap(response => console.log('Réponse API candidature:', response))
  //   );
  // }

}