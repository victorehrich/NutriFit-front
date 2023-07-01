import { DietInterface } from './diet.interface';
import { DietScheduleInterface } from './diet.schedule.interface';

export interface DietScheduleDietInterface extends DietInterface {
  mondaySchedule: DietScheduleInterface;
  tuesdaySchedule: DietScheduleInterface;
  wednesdaySchedule: DietScheduleInterface;
  thursdaySchedule: DietScheduleInterface;
  fridaySchedule: DietScheduleInterface;
  saturdaySchedule: DietScheduleInterface;
  sundaySchedule: DietScheduleInterface;
}
