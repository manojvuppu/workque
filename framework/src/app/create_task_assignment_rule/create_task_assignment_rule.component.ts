import { Component, OnInit, ElementRef,Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create_task_assignment_rule',
  templateUrl: './create_task_assignment_rule.component.html',
  styleUrls: ['./create_task_assignment_rule.component.css']
})
export class Create_task_assignment_ruleComponent implements OnInit {
  show: boolean = true;
  queue;

  constructor(private _Mainservice: MainService, private ApiService: ApiService, private AppModel: AppModelService, private  elemRef: ElementRef,
  public dialogRef: MatDialogRef<Create_task_assignment_ruleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { 
	this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());

    this._Mainservice.getallqueue().subscribe((data: any) => {
      this.queue = data;
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

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
        "autoAssign": this.data.autoAssign,
        "leastWorkload": "",
        "alphabetical": "",
        "supervisorAssign": "",
        "selfAssign": "",
        "taskAssignRuleId": "",
        "name": this.data.name,
        "version": this.data.version,
        "status": "",
        "description": ""
      };
      this._Mainservice.createassignmentrule(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
    else{
      let obj =
      {
        "id": "",
        "autoAssign": this.data.autoAssign,
        "leastWorkload": "",
        "alphabetical": "",
        "supervisorAssign": "",
        "selfAssign": "",
        "taskAssignRuleId": "",
        "name": this.data.name,
        "version": this.data.version,
        "status": "",
        "description": ""
      };
      this._Mainservice.updateassignmentrule(this.data.id,obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
  }

}