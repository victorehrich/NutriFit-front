import { DietInterface } from './diet.interface';
import { DietMealInterface } from './diet.meal.interface';

export interface DietScheduleInterface extends DietInterface {
  afternoonMeal: DietMealInterface;
  morningMeal: DietMealInterface;
  nightMeal: DietMealInterface;
}
