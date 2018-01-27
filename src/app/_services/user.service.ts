import { Message } from './../_models/message';

import { PaginatedResult } from './../_models/pagination';
import { AuthHttp } from 'angular2-jwt';
import { User } from './../_models/User';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
baseUrl = environment.apiUrl;
constructor(private authHttp: AuthHttp) { }

getUsers(page?: number, itemsPerPage?: number, userParams?: any , likesParam?: any) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let querySting = '?';
    if ( page != null && itemsPerPage != null ) {
        querySting += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }
    if ( likesParam === 'Likers') {
        querySting += 'Likers=true&';
    }
    if ( likesParam === 'Likees') {
        querySting += 'Likees=true&';
    }
    if ( userParams != null) {
        querySting +=
        'minAge=' + userParams.minAge +
        '&maxAge=' + userParams.maxAge +
        '&gender=' + userParams.gender +
        '&orderBy=' + userParams.orderBy;
        }

    return this.authHttp.get(this.baseUrl + 'users' + querySting)
           .map( (response: Response)  => {
             paginatedResult.result = response.json();
             if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
             }
             return paginatedResult;
           } )
           .catch(this.handleError);
}

getUser(id): Observable<User> {
    return this.authHttp.get( this.baseUrl + 'users/' + id)
    .map( response => <User> response.json())
    .catch(this.handleError);
}

updateUser(id: number, user: User) {
    return this.authHttp.put(this.baseUrl + 'users/' + id, user).catch(this.handleError);
}
setMainPhoto(userid: number, id: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userid + '/photos/' + id + '/setMain', { }).catch(this.handleError);
}
deletePhoto(userid: number, id: number) {
    return this.authHttp.delete(this.baseUrl + 'users/' + userid + '/photos/' + id , { }).catch(this.handleError);
}

sendLike(id: number, recipientId: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {}).catch(this.handleError);
}
getMessages(id: number, page?: number, itemPerPage?: number, messageContainer?: string) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    let querySting = '?MessageContainer=' + messageContainer ;
    if (page != null && itemPerPage != null ) {
        querySting += '&pageNumber=' + page + '&pageSize=' + itemPerPage ;
    }

    return this.authHttp.get(this.baseUrl + 'users/' + id + '/messages' + querySting)
          .map( (response: Response) => {
              paginatedResult.result = response.json();
              if (response.headers.get('Pagination') != null ) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
              }
              return paginatedResult;
          } ).catch(this.handleError);
}
getMessageThread(id: number, recipientId: number) {
    return this.authHttp.get(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId).map( (response: Response) => {
        return response.json();
    }).catch(this.handleError);
}

private handleError( error: any ) {
    if ( error.status === 400) {
        return Observable.throw(error._body)
    }
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
