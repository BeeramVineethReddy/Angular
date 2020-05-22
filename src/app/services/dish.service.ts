import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})//decorator used to allow  DishService as injextible
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHES;
  }

}
