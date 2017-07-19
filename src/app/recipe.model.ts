import { Ingredient } from './ingredient.model';

export class Recipe {
  ingredients: Ingredient[] = [];
  healthLabels: string[] = [];
  constructor(public name: string,
              public calories: number,
              public carbs: number,
              public fat: number,
              public protein: number,
              public link: string,
              public image: string
              ){}
}
//
