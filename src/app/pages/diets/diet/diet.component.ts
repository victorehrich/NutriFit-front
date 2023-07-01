import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DietInterface } from 'src/app/interfaces/diet/diet.interface';
import { DietScheduleInterface } from 'src/app/interfaces/diet/diet.schedule.interface';
import { DietScheduleDietInterface } from 'src/app/interfaces/diet/diet.scheduleDiet.interface';
import { DietService } from 'src/app/services/diet.service';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss'],
})
export class DietComponent implements OnInit {
  dietId: number = 0;
  isLoading: boolean = true;
  diet?: DietInterface;
  dietsInfosToShow?: DietScheduleDietInterface;
  requestCounter:number = 0
  constructor(
    private dietService: DietService,
    private router: Router,
    private routeParams: ActivatedRoute
  ) {
    this.dietId = parseInt(this.routeParams.snapshot.paramMap.get('dietId')!);
  }

  ngOnInit(): void {
    this.getDiet();
  }
  handlerSchedulesIds(): void {
    this.getDietsSchedule(this.diet!.mondayScheduleId, 'monday')
    this.getDietsSchedule(this.diet!.tuesdayScheduleId, 'tuesday')
    this.getDietsSchedule(this.diet!.wednesdayScheduleId, 'wednesday')
    this.getDietsSchedule(this.diet!.thursdayScheduleId, 'thursday')
    this.getDietsSchedule(this.diet!.fridayScheduleId, 'friday')
    this.getDietsSchedule(this.diet!.saturdayScheduleId, 'saturday')
    this.getDietsSchedule(this.diet!.sundayScheduleId, 'sunday')
    this.dietsInfosToShow = {...this.diet!, ...this.dietsInfosToShow!}
  }
  getDiet(): void {
    this.isLoading=true
    this.dietService.getDiet(this.dietId).subscribe({
      next: (response: DietInterface) => {
        this.diet = response;
      },
      error: (err: HttpErrorResponse) => {
        this.router.navigate(['pagina-de-erro']);
      },
      complete: () => {
        this.handlerSchedulesIds();
      },
    });
  }
  getDietsSchedule(dietScheduleId: number, dayOfWeek:string): DietScheduleInterface | void {
    this.dietService.getDietSchedule(dietScheduleId).subscribe({
      next: (response: DietScheduleInterface) => {
        this.fillDayOfWeek(dayOfWeek, response)
      },
      error: (err: HttpErrorResponse) => {
        this.router.navigate(['pagina-de-erro']);
      },
      complete: () => {
        this.requestCounter++
        this.isLoading = this.requestCounter == 7 ? false : true
      },
    });
  }

  fillDayOfWeek(dayOfWeek:string, weekValue:DietScheduleInterface){
    switch(dayOfWeek){
      case 'monday':
        this.dietsInfosToShow!.mondaySchedule = weekValue
        break
      case 'tuesday':
        this.dietsInfosToShow!.tuesdaySchedule = weekValue
        break
      case 'wednesday':
        this.dietsInfosToShow!.wednesdaySchedule = weekValue
        break
      case 'thursday':
        this.dietsInfosToShow!.thursdaySchedule = weekValue
        break
      case 'friday':
        this.dietsInfosToShow!.fridaySchedule = weekValue
        break
      case 'saturday':
        this.dietsInfosToShow!.saturdaySchedule = weekValue
        break
      case 'sunday':
        this.dietsInfosToShow!.sundaySchedule = weekValue
        break
    }
  }
}
