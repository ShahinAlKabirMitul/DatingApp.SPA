
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
  model: any = {};
  constructor(private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    }
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

  passwordMatchValidor(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value 
    ? null 
    : {'mismatch' : true };
  }

  register() {
    console.log('regi value', this.registerForm.value);
    // this.authService.register(this.model).subscribe( () => {
    //   this.alertify.success('Registration Sucessfully');
    // // tslint:disable-next-line:no-shadowed-variable
    // }, error => {
    //   this.alertify.error(error);
    // });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.message('cancelled');
  }

}
