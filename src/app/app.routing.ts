import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { ListRestaurantComponent } from './list-restaurant/list-restaurant.component';
const appRoutes: Routes = [
  {
    path: '',
    component: RecipeFormComponent
  },
  {
    path: 'user',
    component: NewUserFormComponent
  },
  {
    path: 'user/profile/:id',
    component: UserComponent
  },
  {
    path: 'restaurants',
    component: ListRestaurantComponent
  }]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
