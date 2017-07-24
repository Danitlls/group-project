import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipe.model';
import { Day } from '../day.model';
import { RecipeService } from '../recipe.service';
import { SecondRecipeService } from '../second-recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
  providers: [RecipeService, SecondRecipeService, UserService]
})
export class UserComponent implements OnInit {
  userId;
  currentUser;
  recipeOptions: Recipe[];
  tempOptions: Recipe[] = [];
  daysArray: Day[] = [];
  loggedDaysArray: Day[] = [];

  constructor(private route: ActivatedRoute, private location: Location, public recipeService: RecipeService, public userService: UserService) { }

  ngOnInit() {
    this.route.params.forEach((urlParametersArray) => {
      this.userId = urlParametersArray['id'];
    });
    this.userService.getUserById(this.userId).subscribe(dataLastEmittedFromObserver => {
      this.currentUser = dataLastEmittedFromObserver;
      console.log(this.currentUser);
    })
  }

  getWeeklyMenu(){
    this.recipeService.generateWeeklyMenu(this.currentUser);
  }

  getDayOptions(){
    this.recipeOptions = this.userService.generateMealOptions(this.currentUser);
    console.log(this.recipeOptions);
    for(var i = 0, j = 0; i < 3; i++, j+=3){
      this.tempOptions[i] = this.recipeOptions[j];
    }
    console.log(this.tempOptions);
  }

  onChange(recipeIndex){
    if(recipeIndex >= 0 && recipeIndex <= 2){
      this.tempOptions[0] = this.recipeOptions[recipeIndex];
    }
    else if(recipeIndex >= 3 && recipeIndex <= 5){
      this.tempOptions[1] = this.recipeOptions[recipeIndex];
    }
    else{
      this.tempOptions[2] = this.recipeOptions[recipeIndex];
    }
  }

  newDay(currentDay: Date){
    let totalCalories: number = 0;
    let totalCarbs: number = 0;
    let totalFat: number = 0;
    let totalProtein: number = 0;
    for(var i = 0; i < this.tempOptions.length; i++){
      totalCalories += this.tempOptions[i].calories;
      totalCarbs += this.tempOptions[i].carbs;
      totalFat += this.tempOptions[i].fat;
      totalProtein += this.tempOptions[i].protein;
    }
    let newDay = new Day(currentDay, this.tempOptions[0], this.tempOptions[1], this.tempOptions[2], totalCalories, totalCarbs, totalFat, totalProtein);
    this.daysArray.push(newDay);
    console.log(this.daysArray);

  }

  updateDay(selectedDay: Date){
    console.log(selectedDay);
    console.log(this.daysArray.length);
    let totalCalories: number = 0;
    let totalCarbs: number = 0;
    let totalFat: number = 0;
    let totalProtein: number = 0;
    for(var i = 0; i < this.tempOptions.length; i++){
      totalCalories += this.tempOptions[i].calories;
      totalCarbs += this.tempOptions[i].carbs;
      totalFat += this.tempOptions[i].fat;
      totalProtein += this.tempOptions[i].protein;
    }
    let updatedDay = new Day(selectedDay, this.tempOptions[0], this.tempOptions[1], this.tempOptions[2], totalCalories, totalCarbs, totalFat, totalProtein);
    if(this.daysArray.length !== 0){
      for(var i = 0; i < this.daysArray.length; i++){
        if(this.daysArray[i].date === selectedDay){
          console.log(this.daysArray[i]);
          this.daysArray[i] = updatedDay;
          console.log(this.daysArray[i]);
        }
        else{
          confirm("No Day Plan to Update, Please choose Add New to Create a new plan");
        }
      }
    }
    else{
      alert("Please select Add New Day to start your planning");
    }
    console.log(this.daysArray);
  }


  //REUSABLE FUNCTIONS:

  //generateWeeklyMenu(5 ingredients) API CALL--used when user gets created, and when user wants to update 5 available ingredients. Stores 100 recipes into database

  //generateGoals(selectedGoal) ADDS OR EDIT'S  current user's "goal" property in firebase.

  //


  //display3MealOptionsPerMeal() ACCESS 100 recipes in firebase (weeklyRecipes) and pull 9 random recipes.  3 for breakfast, 3 for lunch, 3 for dinner

  //saveMealsForDay(selectedRecipes)  STORES selected recipes into firebase as current user's selected day meals.


}
