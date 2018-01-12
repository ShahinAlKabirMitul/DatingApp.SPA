import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe( data => {
      console.log('login succeessfully');
    }, error => {
      console.log('login Fail');
    } );
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    console.log('logout');
  }
  loggedIn(){
    const token = localStorage.getItem('token');
    return !! token;
  }
}
