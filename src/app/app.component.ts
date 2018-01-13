import { Component } from '@angular/core';
import { AlertifyService } from './_services/Alertfy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private al: AlertifyService){
  //this.al.alert('Ready!');
  }
}
