import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable()
export class AlertifyService {

constructor() { }

confirm(message: any , okCallback: () => any ) {
  alertify.confirm(message , function(e){
      if ( e ) {
          okCallback();
      }
      // tslint:disable-next-line:one-line
      else {

      }
  });
}
success(message: any) {
    alertify.success(message);
}
error(message: any) {
    alertify.error(message);
}
warning(message: any) {
    alertify.warning(message);
}
message(message: any) {
    alertify.message(message);
}
alert(message: any){
    alert(message);
}

}
