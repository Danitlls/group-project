import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { NewMenuComponent } from './new-menu/new-menu.component';
const appRoutes: Routes = [
  {
    path: '',
    component: RecipeFormComponent
  }
  // ,
  // {
  //   path: 'menu',
  //   component: NewMenuComponent
  // }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
