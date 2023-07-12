import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs";
import { DietInterface } from "../interfaces/diet/diet.interface";
import { DietScheduleInterface } from "../interfaces/diet/diet.schedule.interface";
import { DietCreateInterface } from "../interfaces/diet/diet.create.interface";
import { State } from "../interfaces/responses/state.interface";

@Injectable({
    providedIn: 'root'
})
export class DietService{
    private url = `${environment.apiURL}/${environment.apiVersion}/Diet`
    constructor(private httpService: HttpClient) {}
    getDiets(): Observable<DietInterface[]>{
        return this.httpService.get<DietInterface[]>(`${this.url}`)
    }
    getDiet(dietId:number): Observable<DietInterface>{
        return this.httpService.get<DietInterface>(`${this.url}/${dietId}`)
    }
    getDietSchedule(dietScheduleId:number): Observable<DietScheduleInterface>{
        return this.httpService.get<DietScheduleInterface>(`${this.url}/DietSchedule/${dietScheduleId}`)
    }
    createDiet(dietInfos:DietCreateInterface):Observable<State<DietCreateInterface>>{
        return this.httpService.post<State<DietCreateInterface>>(`${this.url}`,dietInfos)
    }
    updateDietStatus(dietId:number):Observable<State<DietCreateInterface>>{
        return this.httpService.patch<State<DietCreateInterface>>(`${this.url}`,dietId)
    }
    getTodayDiet():Observable<DietScheduleInterface>{
        return this.httpService.get<DietScheduleInterface>(`${this.url}/todayDiet`)
    }
}