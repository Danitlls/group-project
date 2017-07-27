import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UserComponent } from './user/user.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { LoginComponent } from './login/login.component';
import { MealFormComponent } from './meal-form/meal-form.component';
import { DisplayMealComponent } from './display-meal/display-meal.component';
import { ChartsComponent } from './charts/charts.component';
//charts
import { ChartsModule } from 'ng2-charts';
import { MealLogComponent } from './meal-log/meal-log.component';
import { WeatherComponent } from './weather/weather.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};


@NgModule({
  declarations: [
    AppComponent,
    RecipeFormComponent,
    NewUserFormComponent,
    UserComponent,
    LoginComponent,
    MealFormComponent,
    DisplayMealComponent,
    ChartsComponent,
    MealLogComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    MomentModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
