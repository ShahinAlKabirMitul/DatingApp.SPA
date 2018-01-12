import { Http, Headers, RequestOptions,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

baseurl = ' http://localhost:5000/api/auth/';
userToken: any;
constructor(private http: Http) { }

login(model: any) {
const header = new Headers({'content-type': 'application/json'});
const options = new RequestOptions({headers: header});
 return this.http.post(this.baseurl + 'login', model, options).map( (response: Response) => {
    const user = response.json();
    if (user) {
        localStorage.setItem('token', user.tokenString );
        this.userToken = user.tokenString;
    }
 } );
}
}

