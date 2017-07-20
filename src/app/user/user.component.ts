import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //REUSABLE FUNCTIONS:

  //generateWeeklyMenu(5 ingredients) API CALL--used when user gets created, and when user wants to update 5 available ingredients. Stores 100 recipes into database

  //generateGoals(selectedGoal) ADDS OR EDIT'S  current user's "goal" property in firebase.

  //


  //display3MealOptionsPerMeal() ACCESS 100 recipes in firebase (weeklyRecipes) and pull 9 random recipes.  3 for breakfast, 3 for lunch, 3 for dinner

  //saveMealsForDay(selectedRecipes)  STORES selected recipes into firebase as current user's selected day meals.


}
