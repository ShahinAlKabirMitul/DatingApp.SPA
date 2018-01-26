import { PaginatedResult } from './../../_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../_services/Alertfy.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { Pagination } from '../../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  constructor(private userServicr: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }
  
  ngOnInit() {
   this.route.data.subscribe( data => {
     this.users = data['users'].result;
     this.pagination = data['users'].pagination;
   } );
   this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
   this.userParams.minAge = 19;
   this.userParams.maxAge = 99;
   this.userParams.orderBy = 'lastAcive';
  }
  loadUser() {
    console.log(this.userParams);
    this.userServicr.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
        .subscribe( (res: PaginatedResult<User[]> ) => {
          this.users = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        } );
  }
  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 19;
    this.userParams.maxAge = 99;
    this.loadUser();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }

}
