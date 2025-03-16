import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../models/data';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Get all data (for development)
  getData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/data')
      .pipe(
        tap(response => console.log('Raw API response:', response))
      );
  }

  // Search for a student by ID
  getStudentById(studentId: string): Observable<any> {
    // Since we don't have a real search API, we simulate client-side search
    // In a production environment, you might have an API endpoint like:
    // return this.http.get<any>(`http://localhost:3000/data/student/${studentId}`);
    
    return this.http.get<any>('http://localhost:3000/data').pipe(
      tap(response => console.log('Raw API response:', response)),
      map(data => {
        // Check if data exists and if the ID matches
        if (data && data.info && data.info.idNum === studentId) {
          return data;
        }
        return null;
      })
    );
  }
}
