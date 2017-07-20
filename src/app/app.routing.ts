import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
const appRoutes: Routes = [
  {
    path: 'user-profile/:id',
    component: UserComponent
  }
  // ,
  // {
  //   path: 'menu',
  //   component: NewMenuComponent
  // }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
