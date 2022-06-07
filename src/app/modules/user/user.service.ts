import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { User } from 'src/app/entities/user';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl ="http://localhost:8084/api";

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient,private userAuthService: UserAuthService) {}
 
  loging(user: User): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl+"/authenticate"}`,user,{headers: this.requestHeader});
  }

  roleMatch(allowedRoles : any) {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }

    return false;
    
  }
}
