import { Recipe } from './recipe.model';

export class User {
  allergies: string[] = [];
  // plannedProgram: Day[] = [];
  // actualProgram: Day[] = [];
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
              public email: string,
              public login: string,
              public password: string,
              public gender: string,
              public age: number,
              public dietChoice: string,
              public activityLevel: string,
              public goal: string,
              public height: number,
              public currentWeight: number,
              public goalWeight: number,
              public goalDate: string,
              public weeklyWeightGoal: number,
              public weeklyWeightChange: number,
              public timestamp: Date
  ){}
}
