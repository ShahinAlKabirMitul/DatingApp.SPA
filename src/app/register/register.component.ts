
import { AuthService } from './../_services/auth.service';

import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AlertifyService } from '../_services/Alertfy.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output()cancelRegister = new EventEmitter();
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe( () => {
      this.alertify.success('Registration Sucessfully');
    // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.message('cancelled');
  }

}
