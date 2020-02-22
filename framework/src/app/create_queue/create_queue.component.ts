import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create_queue',
  templateUrl: './create_queue.component.html',
  styleUrls: ['./create_queue.component.css']
})
export class Create_queueComponent implements OnInit {
  queueName: any;
  queueDescription: any;
  queueSLANoOfUnits: any;
  queueSLAUnit: any;
  userGroup: any;

  userlist;

  constructor(private _Mainservice: MainService, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef,
    public dialogRef: MatDialogRef<Create_queueComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());

    this._Mainservice.getallusergroup().subscribe((data: any) => {
      this.userlist = data;
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }
  
  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  save() {
    console.log(this.data.id)
    if (this.data.id == undefined) {
      let obj =
      {
        "id": "",
        "queueName": this.data.queueName,
        "queueDescription": this.data.queueDescription,
        "queueAssignRuleId": "2",
        "queueSLA": "2",
        "userGroup": this.data.userGroup,
        "status": "open",
        "version": "3",
        "queueSLANoOfUnits": this.data.queueSLANoOfUnits,
        "queueSLAUnit": this.data.queueSLAUnit,
        "dummy": "no"
      };
      this._Mainservice.createqueue(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
        this.onNoClick(data)
        //this.data = data;
        
      },
        (error: any) => console.log("error"));
    }
    else {
      let obj =
      {
        "id": this.data.id,
        "queueName": this.data.queueName,
        "queueDescription": this.data.queueDescription,
        "queueAssignRuleId": "2",
        "queueSLA": "2",
        "userGroup": this.data.userGroup,
        "status": "open",
        "version": "3",
        "queueSLANoOfUnits": this.data.queueSLANoOfUnits,
        "queueSLAUnit": this.data.queueSLAUnit,
        "dummy": "no"
      };
      this._Mainservice.updatequeue(obj).subscribe((data: any) => {
        console.log("update");
        console.log(data);
        this.data = data;
      },
        (error: any) => console.log("error"));
    }
  }

}