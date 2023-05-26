import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService{
    private url = environment.apiURL + "/login"
    constructor(private httpService: HttpClient) {}
    login(loginInfos:{email:string, password:string}): Observable<string>{
        return this.httpService.post<string>(this.url,loginInfos)
    }
}