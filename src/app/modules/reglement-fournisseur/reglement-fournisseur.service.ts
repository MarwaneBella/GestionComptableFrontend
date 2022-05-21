import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FournisseurDto } from 'src/app/entities/dto/fournisseurDto';

@Injectable({
  providedIn: 'root'
})
export class ReglementFournisseurService {

  private baseUrl ="http://localhost:8084/api/fournisseurDto";
  
 
  constructor(private httpClient: HttpClient) { }
  
 

  getFournisseurByCodF( id :number ):Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`)
  }
}
