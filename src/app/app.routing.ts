import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
const appRoutes: Routes = [
  {
    path: '',
    component: RecipeFormComponent
  },
  {
    path: 'new-user',
    component: NewUserFormComponent
  }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
