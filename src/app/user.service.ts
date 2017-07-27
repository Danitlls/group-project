import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Recipe } from './recipe.model';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  allUsers= [];

  constructor(private database: AngularFireDatabase, private route: ActivatedRoute) {
    this.users = database.list('users');
    this.users.subscribe(response => {
      this.allUsers = response;
      console.log(this.allUsers[0].$key);
      });
    }

  findUser(username){
    console.log("test");
    for(var i = 0; i < this.allUsers.length; i++){
      if(this.allUsers[i].login === username){
        console.log(this.allUsers[i]);
        return this.allUsers[i].$key;
      }
    }
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
    selectedUser.weeklyRecipes = recipeArray;
    this.getUserById(selectedUser.$key).update({
      weeklyRecipes: selectedUser.weeklyRecipes
    });
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
