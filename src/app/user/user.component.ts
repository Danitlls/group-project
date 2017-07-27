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

  constructor(private route: ActivatedRoute, private location: Location, public recipeService: RecipeService, public userService: UserService) { }

  ngOnInit() {
    this.route.params.forEach((urlParametersArray) => {
      this.userId = urlParametersArray['id'];
    });
    this.userService.getUserById(this.userId).subscribe(response => {
      this.currentUser = response;
    })
  }
}
