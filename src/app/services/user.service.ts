import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { UserInterface } from "../interfaces/user/user.interface";
import { State } from "../interfaces/responses/state.interface";
import { UserCreateInterface } from "../interfaces/user/user.create.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private url = `${environment.apiURL}/${environment.apiVersion}/User`
    constructor(private httpService: HttpClient) {}
    createUser(user:UserCreateInterface): Observable<State<UserInterface>>{
        return this.httpService.post<State<UserInterface>>(`${this.url}`,user)
    }
}