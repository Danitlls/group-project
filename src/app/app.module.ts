import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { masterFirebaseConfig,
// masterFirebaseConfig2
} from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UserComponent } from './user/user.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { ListRestaurantComponent } from './list-restaurant/list-restaurant.component';
import { MealFormComponent } from './meal-form/meal-form.component';
import { DisplayMealComponent } from './display-meal/display-meal.component';


export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

//
// export const firebaseConfig2 = {
//   apiKey: masterFirebaseConfig2.apiKey,
//   authDomain: masterFirebaseConfig2.authDomain,
//   databaseURL: masterFirebaseConfig2.databaseURL,
//   storageBucket: masterFirebaseConfig2.storageBucket
// };

@NgModule({
  declarations: [
    AppComponent,
    RecipeFormComponent,
    NewUserFormComponent,
    UserComponent,
    ListRestaurantComponent,
    MealFormComponent,
    DisplayMealComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireModule.initializeApp(firebaseConfig2),
    AngularFireDatabaseModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
