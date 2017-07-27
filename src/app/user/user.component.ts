import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipe.model';
import { Day } from '../day.model';
import { User } from '../user.model';
import { RecipeService } from '../recipe.service';
import { SecondRecipeService } from '../second-recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
  providers: [RecipeService, SecondRecipeService, UserService]
})
export class UserComponent implements OnInit {
  userId;
  currentUser;
  goal;
  goalDate;
  totalCalories;
  // currentUserDate: string = this.currentUser.goalDate.toDateString();
  // newDate = new Date(this.currentUser.goal);
  // currentDate = this.newDate.toDateString();

  constructor(private route: ActivatedRoute, private location: Location, public recipeService: RecipeService, public userService: UserService) { }

  ngOnInit() {
    this.route.params.forEach((urlParametersArray) => {
      this.userId = urlParametersArray['id'];
    });
    this.userService.getUserById(this.userId).subscribe(response => {
      this.currentUser = response;
      let date = new Date(this.currentUser.goalDate);
      this.goalDate = date.toDateString();
      this.totalCalories = Math.floor(this.currentUser.caloricIntake);
      if(this.currentUser.goal === "gain"){
        this.goal = "Gain Weight";
      }
      else if(this.currentUser.goal === "lose"){
        this.goal = "Lose Weight";
      }
      else {
        this.goal = "Maintain Weight"
      }
    })
  }
}
