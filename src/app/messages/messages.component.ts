import { PaginatedResult } from './../_models/pagination';
import { Message } from './../_models/message';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../_services/Alertfy.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';
  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private authService: AuthService , private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }
  loadMessages() {
    // tslint:disable-next-line:max-line-length
    this.userService.getMessages(this.authService.decodeToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
        .subscribe( (res: PaginatedResult<Message[]> ) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        } );
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }
  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure want to delete the message?', () => {
      this.userService.deleteMessage(id, this.authService.decodeToken.nameid).subscribe( () => {
          this.messages.splice(_.findIndex(this.messages, {id: id}), 1);
          this.alertify.success('Message has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the message');
      });
    } );
  }

}
