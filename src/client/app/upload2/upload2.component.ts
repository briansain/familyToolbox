import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ft-upload2',
  templateUrl: './upload2.component.html',
  styleUrls: ['./upload2.component.css']
})
export class Upload2Component implements OnInit {

  file: File;
  constructor() { }

  ngOnInit() {
    
  }

  fileChange(object: any) {
    this.file = object.target.files[0];
  }

  readFile() {
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.file);
  }
}
