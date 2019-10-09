import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadService } from '../upload.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'ft-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('file', {static: false}) file;
  
  public files: Set<File> = new Set();

  constructor(public dialog: MatDialog,
    public uploadService: UploadService) { }

  ngOnInit() {
  }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      height: '50%'
    });
  }

}
