import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/Alertfy.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe( () => {
      this.alertify.success('Login succeessfully');
    }, error => {
      this.alertify.error('Fail to login');
    }, () => {
        this.router.navigate(['/members']);
    } );
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('logout');
    this.router.navigate(['/home']);
  }
  loggedIn() {
   return this.authService.loggedIn();
  }
}
