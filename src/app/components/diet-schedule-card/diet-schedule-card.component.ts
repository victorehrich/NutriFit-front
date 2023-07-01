import { Component, Input } from '@angular/core';
import { DietInterface } from 'src/app/interfaces/diet/diet.interface';
import { DietMealInterface } from 'src/app/interfaces/diet/diet.meal.interface';
import { DietScheduleInterface } from 'src/app/interfaces/diet/diet.schedule.interface';
import { DietScheduleDietInterface } from 'src/app/interfaces/diet/diet.scheduleDiet.interface';

type varColor =  "--default-orange" | "--default-green" | "--default-white" | "--default-gray" | "--default-red" | "--default-light-gray"

@Component({
  selector: 'app-diet-schedule-card',
  templateUrl: './diet-schedule-card.component.html',
  styleUrls: ['./diet-schedule-card.component.scss']
})
export class DietScheduleCardComponent {
  @Input() weekDay:string = ''
  @Input() diet?:DietInterface
  @Input() scheduleInfos?:DietScheduleInterface
  @Input() cardColor:varColor = '--default-green'
  @Input() textColor:varColor = '--default-white'

  returnVarColor(color:varColor):string{
    return `var(${color})`
  }
  datedisplay():string{
    return new Date(this.diet!.createdOn).toDateString()
  }
}
