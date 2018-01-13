import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/Alertfy.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe( () => {
      this.alertify.success('Login succeessfully');
    }, error => {
      this.alertify.error(error);
    } );
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('logout');
  }
  loggedIn() {
   return this.authService.loggedIn();
  }
}
