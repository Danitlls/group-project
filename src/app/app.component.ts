import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
//import user????

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AuthenticationService]
})
export class AppComponent {
  user;
  private isLoggedIn: Boolean;
  private userName: String;

  constructor(public authService: AuthenticationService, private router: Router) {
    this.authService.user.subscribe(user => {
      if (user == null) {
        this.isLoggedIn = false;
        this.router.navigate([]);
      } else {
        this.isLoggedIn = true;
        console.log("logged in");
        // this.userName = user.name;
        // this.router.navigate(['user/profile/'+ this.userId]);
      }
    });
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  // ngDoCheck() {
  //   this.user = firebase.auth().currentUser;
  //   console.log(this.user);
  // }
}
