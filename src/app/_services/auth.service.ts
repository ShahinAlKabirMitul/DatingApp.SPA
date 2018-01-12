import { Http, Headers, RequestOptions,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthService {

baseurl = ' http://localhost:5000/api/auth/';
userToken: any;
constructor(private http: Http) { }

login(model: any) {
 return this.http.post(this.baseurl + 'login', model, this.requestOptions()).map( (response: Response) => {
    const user = response.json();
    if (user) {
        localStorage.setItem('token', user.tokenString );
        this.userToken = user.tokenString;
    }
 } );
}

register(model: any) {
 return this.http.post(this.baseurl + 'register', model, this.requestOptions());
}

private requestOptions(){
    const header = new Headers({'content-type': 'application/json'});
    return new RequestOptions({headers: header});
}
}

