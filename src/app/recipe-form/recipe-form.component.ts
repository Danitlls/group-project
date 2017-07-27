import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipe.service';
import { SecondRecipeService } from '../second-recipe.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.sass'],
  providers: [RecipeService, SecondRecipeService, UserService]
})
export class RecipeFormComponent implements OnInit {
  recipes: any[]=null;

  constructor(private router: Router, private recipeService: RecipeService) { }
  getRecipes(search) {
  }

  ngOnInit() {
  }
}
