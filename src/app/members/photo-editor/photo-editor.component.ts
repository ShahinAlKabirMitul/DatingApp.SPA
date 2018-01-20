import { Photo } from './../../_models/Photo';
import { Component, OnInit, Input } from '@angular/core';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input('photos') photos: Photo[];
  uploader: FileUploader = new FileUploader({});
  hasBaseDropZoneOver = false;
  constructor() { }

  ngOnInit() {
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
