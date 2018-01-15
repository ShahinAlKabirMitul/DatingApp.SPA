import { User } from './../_models/User';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class UserService {
baseUrl = environment.apiUrl;
constructor(private http: Http) { }

getUsers(): Observable<User[]> {
    return this.http.get(this.baseUrl + 'users', this.jwt())
           .map(response => <User[]> response.json() )
           .catch(this.handleError);
}

private jwt() {
    const token = localStorage.getItem('token');
    if (token) {
        const headers = new Headers({'Authorization': 'Bearer ' + token });
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({headers: headers});
    }
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