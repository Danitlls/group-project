import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipe.model';
import { Day } from '../day.model';
import { RecipeService } from '../recipe.service';
import { SecondRecipeService } from '../second-recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-display-meal',
  templateUrl: './display-meal.component.html',
  styleUrls: ['./display-meal.component.sass'],
  providers: [RecipeService, SecondRecipeService, UserService]
})
export class DisplayMealComponent implements OnInit {
  @Input() currentUser;
  @Input() daysArray;
  constructor(private route: ActivatedRoute, private location: Location, public recipeService: RecipeService, public userService: UserService) { }

  ngOnInit() {
    console.log(this.currentUser);
  }

}
