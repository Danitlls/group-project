import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { recipeId, recipeKey } from './api-keys';
import { SecondRecipeService } from './second-recipe.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  RecipeId = recipeId;
  RecipeKey = recipeKey;
  caloriesLow = 100;
  caloriesHigh = 2000;
  tempRecipes: Recipe[] = [];
  constructor(private http: Http, private secondRecipeService: SecondRecipeService) { }

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

  getBasicRecipesForDay(caloriesLow, caloriesHigh, count, search){
    let random = Math.floor((Math.random() * 10) + 1);
    // let secondRandom = random + 3;
    let searchParam = " ";

    console.log(random);
    return this.http.get("https://api.edamam.com/search?q=" + search + "&app_id=" + this.RecipeId + "&app_key=" + this.RecipeKey + "&from=0&to=20&calories=gte%20" + caloriesLow + ",%20lte%20" + caloriesHigh + "&health=tree-nut-free").subscribe(response => {
      console.log(response.json().hits);
      let foundRecipe: Recipe;

      for(let result of response.json().hits) {
        if(result.recipe.totalNutrients.PROCNT && result.recipe.totalNutrients.FAT && result.recipe.totalNutrients.CHOCDF) {
          let caloriesPer = (result.recipe.calories / result.recipe.yield);
          foundRecipe = new Recipe(result.recipe.label, caloriesPer,result.recipe.totalNutrients.CHOCDF.quantity,10,10, result.recipe.url, result.recipe.image)
          console.log(foundRecipe);
          this.tempRecipes.push(foundRecipe);
        }
      }

    });
  }

  generateWeeklyMenu(){
    this.tempRecipes = [];
    var ingredients: string [] = ["beef", "chicken", "salmon", "broccoli","pork"];

    for (let ingredient of ingredients){
      console.log(ingredient);
      this.getBasicRecipesForDay(this.caloriesLow, this.caloriesHigh, 10, ingredient);
    }
    console.log(this.tempRecipes);
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
