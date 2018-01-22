import { AlertifyService } from './../../_services/Alertfy.service';
import { UserService } from './../../_services/user.service';
import { environment } from './../../../environments/environment';
import { Photo } from './../../_models/Photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { AuthService } from '../../_services/auth.service';
// tslint:disable-next-line:import-spacing
import  * as _ from 'underscore';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input('photos') photos: Photo[];
  @Output('getMemberPhotoChange') getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  constructor(private authService: AuthService, 
    private userUservice: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploder();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    console.log('user Id ', this.authService.decodeToken.nameid);
    this.userUservice.setMainPhoto(this.authService.decodeToken.nameid, photo.id).subscribe( () => {
      this.currentMain = _.findWhere(this.photos, {isMain: true});
      this.currentMain.isMain = false;
      photo.isMain = true;
     // this.getMemberPhotoChange.emit(photo.url);
     this.authService.changeMemberPhoto(photo.url);
     this.authService.currentUser.photoUrl = photo.url;
     localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    } );
  }

  deletePhoto(id: number){
    this.alertify.confirm('Are you sure you want to delete this photo', () => {
      this.userUservice.deletePhoto(this.authService.decodeToken.nameid, id).subscribe( () => {
          this.photos.splice(_.findIndex(this.photos, {id: id}), 1);
          this.alertify.success('Delete successfully');
       // tslint:disable-next-line:no-shadowed-variable
       } , error => {
        this.alertify.error('Failed to delete this photo');
       });
    } );
  }

  initializeUploder() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodeToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
  this.uploader.onSuccessItem = (item, response, status , headers) => {
    if (response) {
      const res: Photo = JSON.parse(response);
      const photo = {
        id: res.id,
        url: res.url,
        dateAdded: res.dateAdded,
        description: res.description,
        isMain: res.isMain
      };
      this.photos.push(photo);
      if (photo.isMain) {
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      }
    }
  };
 }
}
