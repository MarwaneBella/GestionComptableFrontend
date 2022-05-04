import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { User } from 'src/app/entities/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl ="http://localhost:8084/api/user/login";
  constructor(private httpClient: HttpClient) {}
 
  loging(user: User): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl}`,user);
  }
}
