import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: '',
    component: RecipeFormComponent
  },
  {
    path: 'new-user',
    component: NewUserFormComponent
  },
  {
    path: 'user/profile/:id',
    component: UserComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
