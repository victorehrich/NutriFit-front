import { DietDishInterface } from './diet.dish.interface';

export interface DietMealInterface {
  endTime: string;
  mealId: number;
  startTime: string;
  dish: DietDishInterface[];
}
