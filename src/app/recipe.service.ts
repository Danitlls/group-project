import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { recipeId, recipeKey, nutritionId, nutritionKey } from './api-keys';
import { UserService } from './user.service';
import { Recipe } from './recipe.model';
import { Day } from './day.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class RecipeService {
  RecipeId = recipeId;
  RecipeKey = recipeKey;
  NutritionId = nutritionId;
  NutritionKey = nutritionKey;
  caloriesLow = 100;
  caloriesHigh = 1000;
  weekRecipes: Recipe[] = [];
  firstRecipe = new Recipe("fake", 0,0,0,0,"fake", "fake");
  loggedRecipes: Recipe[] = [this.firstRecipe];
  daysArray: Day[] = [];
  plannedDays: Day[] = [];
  final: any[] = [];
  constructor(private http: Http, private userService: UserService, private database: AngularFireDatabase) { }

  analyzeMeal(search: string){
    return this.http.get("https://api.edamam.com/api/nutrition-data?app_id=" + this.NutritionId + "&app_key=" + this.NutritionKey + "&ingr=" + search);
  }

  getBasicRecipesForDay(caloriesHigh, count, search){
    return this.http.get("https://api.edamam.com/search?q=" + search + "&app_id=" + this.RecipeId + "&app_key=" + this.RecipeKey + "&from=0&to="+ count +"&calories=gte%200,%20lte%20" + caloriesHigh + "&health=tree-nut-free");
  }

  logMeal(search){
    this.analyzeMeal(search).subscribe(response => {
      let result = response.json();
      let carbs: number;
      let fats: number;
      let protein: number;
      if(!(result.totalNutrients.CHOCDF)){
        carbs = 0;
      }
      else{
        carbs = result.totalNutrients.CHOCDF.quantity;
      }
      if(!(result.totalNutrients.FAT)){
        fats = 0;
      }
      else{
        fats = result.totalNutrients.FAT.quantity;
      }
      if(!(result.totalNutrients.PROCNT)){
        protein = 0;
      }
      else{
        protein = result.totalNutrients.PROCNT.quantity;
      }
      let loggedRecipe: Recipe;
      console.log(result);
      loggedRecipe = new Recipe("Meal Log", result.calories, carbs, fats, protein, "none", "none");
      this.loggedRecipes.push(loggedRecipe);
    });
  }

  createDayMeals(){
    let totalCalories = this.loggedRecipes[1].calories + this.loggedRecipes[2].calories + this.loggedRecipes[3].calories;
    let totalCarbs = this.loggedRecipes[1].carbs + this.loggedRecipes[2].carbs + this.loggedRecipes[3].carbs;
    let totalFats = this.loggedRecipes[1].fat + this.loggedRecipes[2].fat + this.loggedRecipes[3].fat;
    let totalProtein = this.loggedRecipes[1].protein + this.loggedRecipes[2].protein + this.loggedRecipes[3].protein;

    let loggedDay = new Day(new Date ("07-21-2017"), this.loggedRecipes[1], this.loggedRecipes[2], this.loggedRecipes[3], totalCalories, totalCarbs, totalFats, totalProtein);
    console.log(loggedDay);
    this.daysArray.push(loggedDay);
    console.log(this.daysArray);
    this.loggedRecipes= [this.firstRecipe];
    return loggedDay;
  }

  //This function clears userRecipes in User object
  clearUserWeeklyRecipes(selectedUser){
    this.userService.getUserById(selectedUser.$key).update({
      weeklyRecipes: []
    });
  }
  //Inputs ingredients array with 5 elements and outputs array with length equal to number of ingredients user inputted
  createArrayWithOnlyUserIngredients(ingredients){
    var userIngredients: string[];
    for(var i = 0; i < 5; i++){
      console.log(ingredients[i]);
      if(!(ingredients[i])){
        ingredients.splice(i);
        userIngredients = ingredients;
        console.log("userIngredients: " + userIngredients);
        i = 5;
      }
      else if(ingredients[4]){
        userIngredients = ingredients;
        console.log("userIngredients: " + userIngredients);
      }
    }
    return userIngredients;
  }

  updateGraph(planned){
    console.log(this.weekRecipes);
    console.log(planned);
    this.final.push(planned);
    this.final.push(this.daysArray);
    console.log(this.final);
    return this.final;
  }
}
