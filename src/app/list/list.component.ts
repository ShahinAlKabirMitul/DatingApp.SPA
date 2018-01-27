import { PaginatedResult } from './../_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../_services/Alertfy.service';
import { UserService } from './../_services/user.service';
import { User } from './../_models/User';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParem: string;
  constructor(private userService: UserService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParem = 'Likers';
  }
  loadUser() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParem)
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
