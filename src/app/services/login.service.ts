import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginResponseInterface } from '../interfaces/login/login.response.interface';
import { LoginRequestInterface } from '../interfaces/login/login.request.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${environment.apiURL}/${environment.apiVersion}/Auth`;
  constructor(private httpService: HttpClient) {}
  login(login: LoginRequestInterface): Observable<LoginResponseInterface> {
    return this.httpService.post<LoginResponseInterface>(
      `${this.url}/login`,
      login
    );
  }
  recoveryPassword(email: string): Observable<string> {
    return this.httpService.post<string>(this.url + 'recoveryPassword', email);
  }
  teste(){
    return this.httpService.get<string>(this.url + 'teste');
  }
}
