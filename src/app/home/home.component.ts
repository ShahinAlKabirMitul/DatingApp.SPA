import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  constructor(private http: Http) { }

  ngOnInit() {
    this.getValues();
  }
  registerToggle() {
    this.registerMode = ! this.registerMode;
  }
  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe( response => {
      // console.log(response);
      this.values = response.json();
    } );
  }
  cancleRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}