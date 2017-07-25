import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipe.model';
import { Day } from '../day.model';
import { RecipeService } from '../recipe.service';
import { SecondRecipeService } from '../second-recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-meal-log',
  templateUrl: './meal-log.component.html',
  styleUrls: ['./meal-log.component.sass'],
  providers: [RecipeService, SecondRecipeService, UserService]
})
export class MealLogComponent implements OnInit {
  mealLog: Recipe[];
  firstRecipe;
  constructor(private route: ActivatedRoute, private location: Location, public recipeService: RecipeService, public userService: UserService) { }

  ngOnInit() {
  }

  getNutrition(search: string){
    let inputString = search.replace(/,/g, '%20and')
    this.firstRecipe = this.recipeService.logMeal(inputString);
    this.mealLog = this.recipeService.loggedRecipes;
    console.log(this.mealLog[0]);
    console.log(this.mealLog[1]);
    console.log(this.mealLog[2]);
    console.log(this.mealLog);
    // console.log(this.recipeService.createDayMeals());
  }

  logDay(){
    this.recipeService.createDayMeals();
  }
}
