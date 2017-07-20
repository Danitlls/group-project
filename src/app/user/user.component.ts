import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { SecondRecipeService } from '../second-recipe.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
  providers: [RecipeService, SecondRecipeService]
})
export class UserComponent implements OnInit {

  constructor(private router: Router, public recipeService: RecipeService) { }

  ngOnInit() {
  }

  getWeeklyMenu(){
    this.recipeService.generateWeeklyMenu();
  }

  //REUSABLE FUNCTIONS:

  //generateWeeklyMenu(5 ingredients) API CALL--used when user gets created, and when user wants to update 5 available ingredients. Stores 100 recipes into database

  //generateGoals(selectedGoal) ADDS OR EDIT'S  current user's "goal" property in firebase.

  //


  //display3MealOptionsPerMeal() ACCESS 100 recipes in firebase (weeklyRecipes) and pull 9 random recipes.  3 for breakfast, 3 for lunch, 3 for dinner

  //saveMealsForDay(selectedRecipes)  STORES selected recipes into firebase as current user's selected day meals.


}
