import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/Alertfy.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  photoUrl: string;
  @ViewChild('editForm') editForm: NgForm;
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
     private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
       this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe( p => this.photoUrl = p );
  }
  updateUser() {
    this.userService.updateUser(this.authService.decodeToken.nameid, this.user).subscribe( next => {
      this.alertify.success('Update Successfully');
      this.editForm.reset(this.user);
    }, error => {
       this.alertify.error(error);
    } );

  }
  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }

}
