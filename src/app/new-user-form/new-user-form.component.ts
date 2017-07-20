import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as moment from 'moment';


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

  //Calculate BMI
  BMICalc(currentWeight: number, height: number){
    return (currentWeight * 0.45)/((height * 0.025)*(height * 0.025));
  }

  //Calculate BMR
  BMRCalc(currentWeight: number, height: number, gender: string, age: number){
    if(gender === "male"){
      return 65 + (6.2 * currentWeight) + (12.7 * height) - (6.8 * age);
    } else if (gender === "female"){
      return 655 + (4.3 * currentWeight) + (4.3 * height) - (4.7 * age);
    }
  }

  //Calculate difference between goalStartDate and goalDate using moments
  dateDifferenceCalc(goalDate: Date, goalStartDate: Date){
    var goalDateMoment = moment(goalDate);
    var goalStartDateMoment = moment(goalStartDate);
    return goalDateMoment.diff(goalStartDateMoment, 'days', true);
  }

  //Calculate caloric Intake based on activity level
  caloricIntakeCalc(userBMR: number, activityLevel: number){
    return userBMR * activityLevel;
  }


  submitForm(name: string, email: string, login: string, password: string, gender: string, age: number, dietChoice: string, allergies: string, activityLevel: number, height: number, currentWeight: number, goal: string, goalWeight: number, goalStartDate: Date, goalDate: Date, weeklyWeightGoal: number, weeklyWeightChange: number)
  {

    var userBMI = this.BMICalc(currentWeight, height);
    var userBMR = this.BMRCalc(currentWeight, height, gender, age);
    var dateDifference = this.dateDifferenceCalc(goalDate, goalStartDate);
    var caloricIntake = this.caloricIntakeCalc(userBMR, activityLevel);
    console.log("asdfdsf" + caloricIntake);

    //Calculate caloric Intake based on weight gain or weight lose goal
    if(goal === "gain"){
      caloricIntake += (caloricIntake * .2);
      var weeklyGoal = (goalWeight - currentWeight)/dateDifference;
    }
    else if(goal === "lose"){
      caloricIntake -= (caloricIntake * .2);
      var weeklyGoal = (currentWeight - goalWeight)/dateDifference;
    }

    // console.log(userBMI + " and " + userBMR);

    var newUser = new User(name, email, login, password, gender, age, dietChoice, activityLevel, height, currentWeight, goal, goalWeight, goalStartDate, goalDate, userBMI, userBMR, dateDifference, caloricIntake, weeklyGoal);

    //change it so you can push more than one...
    newUser.allergies.push(allergies);
    console.log(newUser);
  }
}
