import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable(
  {
    providedIn: 'root',
  }
)
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}
  public getToken(): string {
    return localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken')! : "";
  }

  public isAuthenticated(): boolean {
    try{
      const token = this.getToken();
      return !this.jwtHelper.isTokenExpired(token);
    }
    catch(err){
      console.error(err)
      return false
    }
  }
}
