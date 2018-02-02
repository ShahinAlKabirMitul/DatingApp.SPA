import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../_models/authUser';
import { debug } from 'util';

@Injectable()
export class AuthService {

baseurl = environment.apiUrl;
userToken: any;
decodeToken: any;
currentUser: User;
private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();
constructor(private http: HttpClient, public jwtHelperService: JwtHelperService) { }

 changeMemberPhoto(photo: string) {
     this.photoUrl.next(photo);

 }
 login(model: any) {
   return this.http.post<AuthUser> (this.baseurl + 'auth/login', model, { headers: new HttpHeaders()
    .set('Content-Type', 'application/json') })
    .map( user => {
     if (user) {
        console.log('login', user);
        localStorage.setItem('token', user.tokenString );
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodeToken = this.jwtHelperService.decodeToken(user.tokenString);
        console.log('decodeToken', this.decodeToken);
        this.userToken = user.tokenString;
        this.currentUser = user.user;
        if (this.currentUser.photoUrl !== null) {
            this.changeMemberPhoto(this.currentUser.photoUrl);
        }
        // tslint:disable-next-line:one-line
        else {
            this.changeMemberPhoto('../../assets/user.png');
        }
     }
   } );
 }

 loggedIn() {
    const token = this.jwtHelperService.tokenGetter();
    // tslint:disable-next-line:curly
    if (!token)
      return false;
    return !this.jwtHelperService.isTokenExpired(token);
  }

 register(user: User) {
   return this.http.post(this.baseurl + 'auth/register', user, { headers: new HttpHeaders().
    set('Content-Type', 'application/json') });
 }


}

