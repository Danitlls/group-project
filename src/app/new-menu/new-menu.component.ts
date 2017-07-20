import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { SecondRecipeService } from '../second-recipe.service';

@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.sass'],
  providers: [RecipeService, SecondRecipeService]
})
export class NewMenuComponent implements OnInit {

  constructor(private router: Router, public recipeService: RecipeService) { }

  ngOnInit() {
  }

  getWeeklyMenu(){
    this.recipeService.generateWeeklyMenu();
  }

}
