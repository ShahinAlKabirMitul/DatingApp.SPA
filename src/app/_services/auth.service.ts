import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

baseurl = ' http://localhost:5000/api/auth/';
userToken: any;
decodeToken: any;
jwtHelper: JwtHelper = new JwtHelper();
constructor(private http: Http) { }

 login(model: any) {
   return this.http.post(this.baseurl + 'login', model, this.requestOptions()).map( (response: Response) => {
     const user = response.json();
     if (user) {
        localStorage.setItem('token', user.tokenString );
        this.decodeToken = this.jwtHelper.decodeToken(user.tokenString);
        console.log(this.decodeToken);
        this.userToken = user.tokenString;
     }
   } ).catch(this.handleError);
 }

 loggedIn() {
    return tokenNotExpired('token');
  }

 register(model: any) {
   return this.http.post(this.baseurl + 'register', model, this.requestOptions()).catch(this.handleError);
 }

 private requestOptions(){
    const header = new Headers({'content-type': 'application/json'});
    return new RequestOptions({headers: header});
 }

 private handleError( error: any ) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
        return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateError = '';
    if (serverError) {
        for (const key in serverError) {
            if (serverError[key]) {
                modelStateError += serverError[key] + '\n';
            }
        }
    }
    return Observable.throw(
        modelStateError || 'Server Error '
    );
 }

}

