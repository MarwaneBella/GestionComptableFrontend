import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  private baseUrl ="http://localhost:8084/api/statistiques";

  constructor(private httpClient: HttpClient) {}
  
  getNumbersOfAll(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl+"/getNumbersOfAll"}`);
  }

}
