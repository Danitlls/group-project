import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.sass'],
  providers: [ UserService ]
})
export class NewUserFormComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  submitForm(name: string, email: string, login: string, password: string, gender: string, age: number, dietChoice: string, allergies: string[], activityLevel: string, height: number, currentWeight: number, goal: string, goalWeight: number, goalStartDate: Date, goalDate: Date)
  {
    var userBmi = (currentWeight * 0.45)/((height * 0.025)*(height * 0.025));
    var userWeeklyGoal;
    console.log(userBmi);
    if(goal === "gain"){
      userWeeklyGoal = (goalWeight - currentWeight)/(goalDate - goalStartDate);
    }
    else if(goal === "lose"){
      userWeeklyGoal = (currentWeight - goalWeight)/(goalDate - goalStartDate);
    }
    else if(goal === "maintain"){
      userWeeklyGoal = 0;
    }
    var newUser = new User(name, email, login, password, gender, age, dietChoice, allergies, activityLevel, height, currentWeight, goal, goalWeight, goalStartDate, goalDate, userWeeklyGoal, userWeeklyChange)
  }
}
