import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { UserInterface } from "../interfaces/user/user.interface";
import { State } from "../interfaces/responses/state.interface";
import { UserCreateInterface } from "../interfaces/user/user.create.interface";
import { UserUpdateInterface } from "../interfaces/user/user.update.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private url = `${environment.apiURL}/${environment.apiVersion}/User`
    constructor(private httpService: HttpClient) {}
    createUser(user:UserCreateInterface): Observable<State<UserInterface>>{
        return this.httpService.post<State<UserInterface>>(`${this.url}`,user)
    }
    getUser(): Observable<UserInterface>{
        return this.httpService.get<UserInterface>(`${this.url}`)
    }
    updateUser(user:UserUpdateInterface): Observable<State<UserInterface>>{
        return this.httpService.put<State<UserInterface>>(`${this.url}`,user)
    }
    uploadImage(file:File, name:string): Observable<State<null>>{

        const formData = new FormData(); 
        
        formData.append("userImage", file, name);
        return this.httpService.post<State<null>>(`${this.url}/Image`,formData)
    }
    getImage(name:string): Observable<any>{
        return this.httpService.get<any>(`${this.url}/Image/${name}`)
    }

}