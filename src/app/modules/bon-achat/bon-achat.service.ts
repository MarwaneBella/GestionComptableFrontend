import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BonAchat } from 'src/app/entities/bon-achat';

@Injectable({
  providedIn: 'root'
})
export class BonAchatService {

  private baseUrl ="http://localhost:8084/api/bonAchat";

  constructor(private httpClient: HttpClient) {}

  getNextBonANum(date: Date):Observable<any>{
    return this.httpClient.post(`${this.baseUrl+"/next"}`, date,{responseType: 'text'});
  }

 
  getBonAchatList(): Observable<BonAchat[]>{
    return this.httpClient.get<BonAchat[]>(`${this.baseUrl}`);
  }

  getBonAchatById(id :number):Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }

  addBonAchat(bonAchat: BonAchat): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, bonAchat);
  }
  
  updateBonAchat( id :number, bonAchat: BonAchat) :Observable<BonAchat>{
    return this.httpClient.put<BonAchat>(`${this.baseUrl}/${id}`,bonAchat);
  }

  deleteBonAchatById(id :number):Observable<BonAchat>{
   return this.httpClient.delete<BonAchat>(`${this.baseUrl}/${id}`);
  }
}
