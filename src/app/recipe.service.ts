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
  final = [];
  constructor(private http: Http, private userService: UserService, private database: AngularFireDatabase) { }

  getRecipeFromApiByIngredient(search: string, count: number){
    let random = Math.floor((Math.random() * 50) + 1);
    // let secondRandom = random;

    return this.http.get("https://api.edamam.com/search?q=" + search + "&app_id=" + this.RecipeId +   "&app_key=" + this.RecipeKey + "&from=0&to=20&calories=gte%20" + this.caloriesLow + ",%20lte%20" + this.caloriesHigh).subscribe(response => {
      let foundRecipe: Recipe;

      for(let result of response.json().hits) {
        let caloriesPer = (result.recipe.calories / result.recipe.yield);
        foundRecipe = new Recipe(result.recipe.label, caloriesPer, result.recipe.totalNutrients.CHOCDF.quantity, result.recipe.totalNutrients.FAT.quantity, result.recipe.totalNutrients.PROCNT.quantity, result.recipe.url, result.recipe.image)
        console.log(foundRecipe);
      }
    });
  }
//1 cup of apples, 1 whole chicken, 1 cup of rice
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

  generateWeeklyMenu(selectedUser, ingredients){
    console.log("here");
    let calorieLimitPerMeal: number = Math.floor(selectedUser.dailyNutrition[0].calories);
    this.userService.getUserById(selectedUser.$key).update({
      weeklyRecipes: []
    });
    var fiveOptions: string[];
    for(var i = 0; i < 5; i++){
      console.log(ingredients[i]);
        if(!(ingredients[i])){
          ingredients.splice(i);
          fiveOptions = ingredients;
          console.log("fiveOptions: " + fiveOptions);
          i = 5;
        }
        else if(ingredients[4]){
          fiveOptions = ingredients;
          console.log("fiveOptions: " + fiveOptions);

        }
    }
    var count = 0;
    var testCounter = 1;
    console.log(calorieLimitPerMeal);
    for (let ingredient of fiveOptions){
      this.getBasicRecipesForDay(calorieLimitPerMeal, 20, ingredient).subscribe(response => {
        // console.log(response.json().hits);
        let foundRecipe: Recipe;

        for(let result of response.json().hits) {
          if(result.recipe.totalNutrients.PROCNT && result.recipe.totalNutrients.FAT && result.recipe.totalNutrients.CHOCDF) {
            let caloriesPer = (result.recipe.calories / result.recipe.yield);
            foundRecipe = new Recipe(result.recipe.label, caloriesPer,result.recipe.totalNutrients.CHOCDF.quantity, result.recipe.totalNutrients.FAT.quantity, result.recipe.totalNutrients.PROCNT.quantity, result.recipe.url, result.recipe.image)
            // console.log(foundRecipe);
            this.weekRecipes.push(foundRecipe);
          }
          count ++;
          console.log(count);
          if(count === (19 * fiveOptions.length)){
            selectedUser.weeklyRecipes = [];
            this.userService.saveRecipesToDatabase(this.weekRecipes, selectedUser);
          }
          testCounter += 1;
          if (testCounter === (20 * fiveOptions.length)){
            console.log("subscribe loop");
          }
        }
      });
    }
  }

  updateGraph(fact){
    console.log(fact);
    this.final.push(this.daysArray[0].totalCalories);
    this.final.push(fact[1].calories);
    console.log(this.final);
    return this.final;
  }

}

//   saveRecipes(search: string){
//
//     return this.http.get("https://api.edamam.com/search?q=" + search + "&app_id=" + this.RecipeId +   "&app_key=" + this.RecipeKey + "&from=" + random + "&to=" + secondRandom + "&calories=gte%20591,%20lte%20722")
//
//         for(let item of result.recipe.ingredients){
//           foundRecipe.ingredients.push(item.text);
//         }
//         console.log(foundRecipe);
//     }
//
// }
