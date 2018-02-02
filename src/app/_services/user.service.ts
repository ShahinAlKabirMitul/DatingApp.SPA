import { Message } from './../_models/message';

import { PaginatedResult } from './../_models/pagination';
import { User } from './../_models/User';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class UserService {
baseUrl = environment.apiUrl;
constructor(private httpClient: HttpClient) { }

getUsers(page?, itemsPerPage?, userParams?: any , likesParam?: any) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if ( page != null && itemsPerPage != null ) {
        params = params.append('pageNumber', page);
        params = params.append('pageSize', itemsPerPage);
    }
    if ( likesParam === 'Likers') {
        params = params.append('Likers', 'true');
    }
    if ( likesParam === 'Likees') {
        params = params.append('Likees', 'true');
    }
    if ( userParams != null) {
        params = params.append('minAge', userParams.minAge);
        params = params.append('maxAge', userParams.maxAge);
        params = params.append('gender', userParams.gender);
        params = params.append('orderBy', userParams.orderBy);
        }

    return this.httpClient.get<User[]> (this.baseUrl + 'users' , { observe: 'response', params})
           .map( (response)  => {
             paginatedResult.result = response.body;
             if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('pagination'));
             }
             return paginatedResult;
           } )
           ;
}

getUser(id): Observable<User> {
    return this.httpClient.get<User>( this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User) {
    return this.httpClient.put(this.baseUrl + 'users/' + id, user);
}
setMainPhoto(userid: number, id: number) {
    return this.httpClient.post(this.baseUrl + 'users/' + userid + '/photos/' + id + '/setMain', { });
}
deletePhoto(userid: number, id: number) {
    return this.httpClient.delete(this.baseUrl + 'users/' + userid + '/photos/' + id , { });
}

sendLike(id: number, recipientId: number) {
    return this.httpClient.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
}
getMessages(id: number, page?, itemPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);
    if (page != null && itemPerPage != null ) {
        params = params.append('pageNumber', page);
        params = params.append('pageSize', itemPerPage);
    }

    return this.httpClient.get<Message[]>(this.baseUrl + 'users/' + id + '/messages' , {observe: 'response', params})
          .map( (response) => {
              paginatedResult.result = response.body;
              if (response.headers.get('Pagination') != null ) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
              }
              return paginatedResult;
          } );
}
getMessageThread(id: number, recipientId: number) {
    return this.httpClient.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
}
 sendMessage(id: number, message: Message) {
    return this.httpClient.post<Message>(this.baseUrl + 'users/' + id + '/messages', message);
 }
 deleteMessage(id: number, userid: number)
 // tslint:disable-next-line:one-line
 {
    return this.httpClient.post(this.baseUrl + 'users/' + userid + '/messages/' + id, {});
 }
 markAsRead(userid: number, messageid: number) {
  return this.httpClient.post(this.baseUrl + 'users/' + userid + '/messages/' + messageid + '/read', {}).subscribe();
 }

}
