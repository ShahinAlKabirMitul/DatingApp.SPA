import { Message } from './../../_models/message';
import { AlertifyService } from './../../_services/Alertfy.service';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private userService: UserService,
     private authService: AuthService,
     private alerttify: AlertifyService ) { }

  ngOnInit() {
    this.loadMessages();
  }
  loadMessages() {
    this.userService.getMessageThread(this.authService.decodeToken.nameid, this.userId).subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alerttify.error(this.alerttify.error(error));
    });
  }
sendMessage() {
  this.newMessage.recipientId = this.userId;
  this.userService.sendMessage(this.authService.decodeToken.nameid, this.newMessage).subscribe(message => {
    this.messages.unshift(message);
    debugger;
    this.newMessage.content = '';
  }, error => {
    this.alerttify.error(error);
  });
}
}
