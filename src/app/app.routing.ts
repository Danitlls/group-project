import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeFormComponent } from './recipe-form/recipe-form.component';
const appRoutes: Routes = [
  {
    path: '',
    component: RecipeFormComponent
  }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
