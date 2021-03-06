import { Router } from '@angular/router';

import { AuthService } from './../_services/auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AlertifyService } from '../_services/Alertfy.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output()cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  user: any = {};
  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
      gender: ['male'],
      userName: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required] ,
     },
     { validator: this.passwordMatchValidor}
    );
  }

  passwordMatchValidor(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
    ? null
    : {'mismatch' : true };
  }

  register() {
    if (this.registerForm.value ) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe( () => {
        this.alertify.success('Registration successfull');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe( () => {
          this.router.navigate(['/members']);
        } );
      } );
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.message('cancelled');
  }

}
