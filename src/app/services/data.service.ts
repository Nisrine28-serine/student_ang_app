import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../models/data';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Récupérer toutes les données (pour le développement)
  getData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/data')
      .pipe(
        tap(response => console.log('Réponse brute de l\'API:', response))
      );
  }

  // Rechercher un étudiant par ID
  getStudentById(studentId: string): Observable<any> {
    // Comme nous n'avons pas d'API réelle de recherche, nous simulons la recherche côté client
    // Dans un environnement de production, vous pourriez avoir un endpoint API comme:
    // return this.http.get<any>(`http://localhost:3000/data/student/${studentId}`);
    
    return this.http.get<any>('http://localhost:3000/data').pipe(
      tap(response => console.log('Réponse brute de l\'API:', response)),
      map(data => {
        // Vérifier si les données existent et si l'ID correspond
        if (data && data.info && data.info.idNum === studentId) {
          return data;
        }
        return null;
      })
    );
  }
}
