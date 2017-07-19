import { Recipe } from './recipe.model';

export class User {
  allergies: string[] = [];
  meals: Recipe[] = [];
  dailyNutrition: [
    {"calories", 0},
    {"carbs", 0},
    {"fat", 0},
    {"protein", 0}
  ];
  bmi: number;
  // enrollDate: new Date();
  // goalDate: new Date();
  constructor(public name: string,
              public gender: string,
              public age: number,
              public dietChoice: string,
              public activityLevel: string,
              public height: number,
              public weight: number,
  ){}
}
