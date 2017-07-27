import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from './user.service';


@Injectable()
export class SecondRecipeService {
  users: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase, private userService: UserService) {
    this.users = af.list('users');
  }
  saveRecipesToDatabase(recipeArray: Recipe[]){
    console.log("save function" + recipeArray)
    this.users[0].weeklyRecipes.push(recipeArray);
    //gather array from api call and push to "weeklyRecipes" array in firebase
  }
}
