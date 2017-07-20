import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class SecondRecipeService {
  users: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) {
    this.users = af.list('users');
  }

  // addRecipe(newRecipe: Recipe) {
  //   this.recipes.push(newRecipe);
  // }
  saveRecipesToDatabase(recipeArray: Recipe[]){
    console.log(this.users);
    this.users[0].weeklyRecipes.push(recipeArray);
    //gather array from api call and push to "weeklyRecipes" array in firebase
  }
}
