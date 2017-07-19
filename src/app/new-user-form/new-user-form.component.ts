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

}
