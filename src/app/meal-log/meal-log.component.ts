import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../recipe.model';
import { Day } from '../day.model';
import { RecipeService } from '../recipe.service';
import { SecondRecipeService } from '../second-recipe.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-meal-log',
  templateUrl: './meal-log.component.html',
  styleUrls: ['./meal-log.component.sass'],
  providers: [RecipeService, SecondRecipeService, UserService]
})
export class MealLogComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location, public recipeService: RecipeService, public userService: UserService) { }

  ngOnInit() {
  }

  getNutrition(){
    let search: string = "1 large apple";
    this.recipeService.analyzeMeal(search);
  }
}
