import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipe.model';
import { Day } from '../day.model';
import { RecipeService } from '../recipe.service';
import { SecondRecipeService } from '../second-recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.sass'],
  providers: [RecipeService, SecondRecipeService, UserService]
})

export class MealFormComponent implements OnInit {
  @Input() currentUser;
  recipeOptions: Recipe[];
  tempOptions: Recipe[] = [];
  daysArray: Day[] = [];
  loggedDaysArray: Day[] = [];

  constructor(private route: ActivatedRoute, private location: Location, public recipeService: RecipeService, public userService: UserService) { }

  ngOnInit() {
  }

  getDayOptions(){
    this.recipeOptions = this.userService.generateMealOptions(this.currentUser);
    console.log(this.recipeOptions);
    for(var i = 0, j = 0; i < 3; i++, j+=3){
      this.tempOptions[i] = this.recipeOptions[j];
    }
    console.log(this.tempOptions);
  }

  getWeeklyMenu(ingredient1, ingredient2, ingredient3, ingredient4, ingredient5){
    let ingredients: string[] = [ingredient1, ingredient2, ingredient3, ingredient4, ingredient5];
    console.log(ingredients);
    this.recipeService.generateWeeklyMenu(this.currentUser, ingredients);
    this.getDayOptions();
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
    console.log(this.currentUser);
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
}
