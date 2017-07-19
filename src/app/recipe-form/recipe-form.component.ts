import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RecipeService } from '../recipe.service';
import { SecondRecipeService } from '../second-recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
  providers: [RecipeService, SecondRecipeService]
})
export class RecipeFormComponent implements OnInit {
  recipes: any[]=null;

  constructor(private router: Router, private recipeService: RecipeService) { }
  getRecipes(search: string) {
    this.recipeService.getRecipe(search).subscribe(response => {
      this.recipes = response.json();
      console.log(response.json());
    });
  }

  ngOnInit() {
  }

  triggerSaveRecipes(search) {
    this.recipeService.saveRecipes(search);
  }

}
