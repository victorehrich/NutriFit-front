import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { DietInterface } from "../interfaces/diet/diet.interface";

@Injectable({
    providedIn: 'root'
})
export class DietService{
    private url = `${environment.apiURL}/${environment.apiVersion}/Diet`
    constructor(private httpService: HttpClient) {}
    getDiets(): Observable<DietInterface[]>{
        return this.httpService.get<DietInterface[]>(`${this.url}`)
    }
    getDiet(dietScheduleId:number): Observable<any>{
        return this.httpService.get<any>(`${this.url}/${dietScheduleId}`)
    }
}