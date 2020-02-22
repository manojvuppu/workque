import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MainService } from '../services/main.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create_task_type',
  templateUrl: './create_task_type.component.html',
  styleUrls: ['./create_task_type.component.css']
})
export class Create_task_typeComponent implements OnInit {
  taskType;
  description;
  queueMPId;
  queueAssignRuleId;
  transLifecycleId;
  fixWorkflowId;

  Attribute;
  Type;
  Value;
  Description;
  Required;
  Index;

  taskTypeSLANoOfUnits;
  taskTypeSLAUnit;
  tasktypes: [];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  queue;
  assignmentrulelist;
  lifecyclelist;

  username = sessionStorage.getItem('ep-username');


  constructor(private _Mainservice: MainService, private _formBuilder: FormBuilder, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef,
    public dialogRef: MatDialogRef<Create_task_typeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this._Mainservice.getallqueue().subscribe((data: any) => {
      this.queue = data;
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

    this._Mainservice.getallassignmentrule().subscribe((data: any) => {
      this.assignmentrulelist = data;
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

        this._Mainservice.getalllifecycle().subscribe((data: any) => {
      this.lifecyclelist = data;
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  //this.data.taskExtensions = [];

  add() {
    let obj =
    {
      "id": "",
      "taskType": this.Type,
      "attributeName": this.Attribute,
      "attributeType": this.Type,
      "attributeRequired": this.Required,
      "attributeValues": this.Index,
      "TaskType_id": "1"
    };

    this.data.taskExtensions.push(obj);
  }

  delete(index) {
    console.log(index);
    for (var i = 0; i < this.data.taskExtensions.length; i++) {
      if (this.data.taskExtensions[i] === index) {
        this.data.taskExtensions.splice(i, 1);
      }
    }
    console.log(this.data.taskExtensions);
  }

  save() {
    console.log(this.data.id)
    if (this.data.id == undefined) {
      let obj =
      {
        "id": "",
        "taskType": this.data.taskType,
        "fixWorkflowId": this.data.fixWorkflowId,
        "description": this.data.description,
        "taskWorkflowId": "asd",
        "taskTypeSLANoOfUnits": this.data.taskTypeSLANoOfUnits,
        "queueAssignRuleId": this.data.queueAssignRuleId,
        "taskAssignRuleId": "asd",
        "taskTypeSLAUnit": this.data.taskTypeSLAUnit,
        "transLifecycleId": this.data.transLifecycleId,
        "queueMPId": this.data.queueMPId,
        "taskExtensions": this.data.taskExtensions,
        "taskAction": [
          {
            "id": "",
            "taskActionName": "",
            "taskActionDescription": "",
            "TaskType_id": ""
          }
        ]
      };
      this._Mainservice.createtasktype(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
    else {
      let obj =
      {
        "id": this.data.id,
        "taskType": this.data.taskType,
        "fixWorkflowId": this.data.fixWorkflowId,
        "description": this.data.description,
        "taskWorkflowId": "asd",
        "taskTypeSLANoOfUnits": this.data.taskTypeSLANoOfUnits,
        "queueAssignRuleId": this.data.queueAssignRuleId,
        "taskAssignRuleId": "asd",
        "taskTypeSLAUnit": this.data.taskTypeSLAUnit,
        "transLifecycleId": this.data.transLifecycleId,
        "queueMPId": this.data.queueMPId,
        "taskExtensions": this.data.taskExtensions,
        "taskAction": [
          {
            "id": "",
            "taskActionName": "",
            "taskActionDescription": "",
            "TaskType_id": ""
          }
        ]
      };
      this._Mainservice.updatetasktype(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
  }
}