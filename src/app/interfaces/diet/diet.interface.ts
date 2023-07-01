export interface DietInterface {
  dietId: number;
  userId: number;
  dietName: string;
  dietGoal: string;
  currentActive: boolean;
  createdOn: string;
  mondayScheduleId: number;
  tuesdayScheduleId: number;
  wednesdayScheduleId: number;
  thursdayScheduleId: number;
  fridayScheduleId: number;
  saturdayScheduleId: number;
  sundayScheduleId: number;
}
