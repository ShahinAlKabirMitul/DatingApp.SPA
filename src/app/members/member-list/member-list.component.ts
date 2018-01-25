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
  constructor(private userServicr: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
   this.route.data.subscribe( data => {
     //console.log(data);
     this.users = data['users'].result;
     this.pagination = data['users'].pagination;
    // this.pagination.itemPerPage
   } );
  }
  loadUser() {
    this.userServicr.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe( (res: PaginatedResult<User[]> ) => {
          this.users = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        } );
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUser();
  }

}
