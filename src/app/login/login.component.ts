import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(username){
    let test = this.userService.findUser(username);
    this.router.navigate(['user/profile/'+ test]);
  }

  sendToSignUp(){
    this.router.navigate(['new-user']);
  }

}
