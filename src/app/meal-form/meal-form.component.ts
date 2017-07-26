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
  daysArray: Day[] = []; //planned
  loggedDaysArray: Day[] = []; //actual
  options: number = 0;
  weekRecipes: Recipe[] = [];

  constructor(private route: ActivatedRoute, private location: Location, public recipeService: RecipeService, public userService: UserService) { }

  ngOnInit() {
  }

  getDayOptions(){
    console.log(this.currentUser);
    this.recipeOptions = this.userService.generateMealOptions(this.currentUser);
    console.log("test");
    for(var i = 0, j = 0; i < 3; i++, j+=3){
      this.tempOptions[i] = this.recipeOptions[j];
    }
    // console.log("test" + this.tempOptions);
  }

  getWeeklyMenu(ingredient1, ingredient2, ingredient3, ingredient4, ingredient5){
    this.weekRecipes = [];
    let ingredients: string[] = [ingredient1, ingredient2, ingredient3, ingredient4, ingredient5];
    this.recipeService.clearUserWeeklyRecipes(this.currentUser);
    var userIngredients = this.recipeService.createArrayWithOnlyUserIngredients(ingredients);
    // console.log(userIngredients);

    let calorieLimitPerMeal: number = Math.floor(this.currentUser.caloricIntake);
    var count = 1;
    for (let ingredient of userIngredients){
      // console.log(this.recipeService.getBasicRecipesForDay(calorieLimitPerMeal, 20, ingredient));
      this.recipeService.getBasicRecipesForDay(calorieLimitPerMeal, 20, ingredient).subscribe(response => {
      console.log("meal component: ", response.json().hits);
      let foundRecipe: Recipe;


      for(let result of response.json().hits) {
        if(result.recipe.totalNutrients.PROCNT && result.recipe.totalNutrients.FAT && result.recipe.totalNutrients.CHOCDF) {
          let caloriesPer = (result.recipe.calories / result.recipe.yield);
          foundRecipe = new Recipe(result.recipe.label, caloriesPer,result.recipe.totalNutrients.CHOCDF.quantity, result.recipe.totalNutrients.FAT.quantity, result.recipe.totalNutrients.PROCNT.quantity, result.recipe.url, result.recipe.image)
          // console.log(foundRecipe);
          this.weekRecipes.push(foundRecipe);
        }
        // console.log("week recipes ", this.weekRecipes);
        count ++;
        // console.log(count);
        if(count === (20 * userIngredients.length)){
          this.currentUser.weeklyRecipes = [];
          this.userService.saveRecipesToDatabase(this.weekRecipes, this.currentUser);
          console.log("inside if statement: " + this.currentUser.weekRecipes);
        }
      }
    //   //
    //   //
      this.getDayOptions();
    //
    // });

    });
  }
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
    // console.log(this.daysArray.length);
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

  showMore(){
    this.options += 1;
  }
}
