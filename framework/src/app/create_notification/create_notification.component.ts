import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../services/main.service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create_notification',
  templateUrl: './create_notification.component.html',
  styleUrls: ['./create_notification.component.css']
})
export class Create_notificationComponent implements OnInit {

  events = [];
  tasktypes=[];
   username = sessionStorage.getItem('ep-username');
   userslist=[];

  ratePlan;
  stepId;
  currentState;
  newState;
  action;
  functionalMapping;

  //temp: any = [];
  temp: any[] = [];
  temp1: any[] = []

  firstFormGroup: FormGroup;
  //secondFormGroup: FormGroup;

  constructor(private _Mainservice: MainService,private _formBuilder: FormBuilder,private ApiService: ApiService, private AppModel: AppModelService, private  elemRef: ElementRef,
   public dialogRef: MatDialogRef<Create_notificationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { 
	this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());

  this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });

     this._Mainservice.getalltemplate().subscribe((data: any) => {
      // this.temp2 = [...data];
      //this.rows2 = data;
      console.log(data);
      this.events = data._embedded.messageTemplates
      console.log(this.events)
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

     this._Mainservice.getalltasktypesdropdown().subscribe((data: any) => {
      console.log(data);
      this.tasktypes = data;
      console.log(this.events)
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

  }

  gettaskid(tasktype){
  console.log(tasktype);
  this._Mainservice.getassigneuserdropdown(tasktype,this.username).subscribe((data: any) => {
      console.log(data);
      this.userslist = data;
      console.log(this.events)
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

  
  save() {
    console.log(this.data.id)
    if (this.data.id == undefined) {
      let obj =
      {
        "id": "",
        "name": this.data.name,
        "active": "",
        "description": this.data.description,
        "status": this.data.status,
        "stateTransition": this.data.stateTransition
      }
      this._Mainservice.createlifecycle(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
    else {
      let obj =
      {
        "id": "",
        "name": this.data.name,
        "active": "",
        "description": this.data.description,
        "status": this.data.status,
        "stateTransition": this.data.stateTransition
      };
      this._Mainservice.updatelifecycle(this.data.id, obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
  }


}