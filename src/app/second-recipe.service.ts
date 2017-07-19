import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class SecondRecipeService {
  recipes: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) {
    this.recipes = af.list('recipes');
  }

  addRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
  }
}
