import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Recipe } from './recipe.model';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase, private route: ActivatedRoute) {
    this.users = database.list('users');
    // this.weeklyRecipes = database.list('users/0/weeklyRecipes');
  }

  getUserId() {
    var userId;
    this.route.params.forEach((urlParametersArray) => {
      userId = urlParametersArray['id'];
    });
    return userId;
  }

  getUserById(userId: string){
    return this.database.object('users/' + userId);
  }

  getDayByDate(dayId: number, userId: number){
    return this.database.object('users/' + userId + '/planned program/' + dayId);
  }

  saveRecipesToDatabase(recipeArray: Recipe[], selectedUser){
    for(var i = 0; i < recipeArray.length; i++){
      selectedUser.weeklyRecipes.push(recipeArray[i]);
    }
    this.getUserById(selectedUser.$key).update({
      weeklyRecipes: selectedUser.weeklyRecipes
    });

// console.log(recipeArray);
// selectedUser.weeklyRecipes.push(recipeArray[10]);
//
// this.getUserById(selectedUser.$key).update({
//   weeklyRecipes[i]: recipeArray[i]
// });


    //
    // console.log(selectedUser.$key);
    // console.log(selectedUser.weeklyRecipes);
    // console.log("save function" + this.weeklyRecipes);
    //gather array from api call and push to "weeklyRecipes" array in firebase
  }

  addUserToDB(newUser: User){
    this.users.push(newUser);
    return this.users;
  }


  generateMealOptions(selectedUser){
    console.log("length: ", selectedUser.weeklyRecipes.length );
    let mealOptions: Recipe[] = [];
    for(var i = 0; i < 9; i++){
      let random = Math.floor(Math.random() * selectedUser.weeklyRecipes.length);
      mealOptions.push(selectedUser.weeklyRecipes[random]);
    }
    return mealOptions;
  }

}
