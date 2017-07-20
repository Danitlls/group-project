import { Recipe } from './recipe.model';

export class Day {
  constructor(public date: Date,
              public breakfast: Recipe,
              public lunch: Recipe,
              public dinner: Recipe,
              public totalCalories: number,
              public totalCarbs: number,
              public totalFats: number,
              public totalProtein: number
  ) { }
}
