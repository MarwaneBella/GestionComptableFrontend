import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles') as any);
  }

  setUserName(userName:string){
    localStorage.setItem('userName', userName);
  }

  getUserName() {
    return localStorage.getItem('userName');
  }
 
  setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  clear() {
    localStorage.clear();
  }

  isLoggedIn() {
    if(this.getRoles() && this.getToken()){
      return true;
    }
    else{
      return false;
    }
  }

  

  
}
