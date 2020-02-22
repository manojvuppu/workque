import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MainService } from '../services/main.service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create_notification_template',
  templateUrl: './create_notification_template.component.html',
  styleUrls: ['./create_notification_template.component.css']
})
export class Create_notification_templateComponent implements OnInit {
  events = [];

  hiddenDetails = [
     {
      "name": "Queue Id",
      "value": "queueId",
      "checked": "false"
    },
    {
      "name": "Assigned Id",
      "value": "assignedToUserId",
      "checked": "false"
    },
    {
      "name": "Assigned Group",
      "value": "assignedToGroupId",
      "checked": "false"
    },
     {
      "name": "Related Task Id",
      "value": "relatedTaskId",
      "checked": "false"
    },
    {
      "name": "Updated By",
      "value": "updatedBy",
      "checked": "false"
    },
    {
      "name": "Error Description",
      "value": "errorDescription",
      "checked": "false"
    },
    {
      "name": "Channel",
      "value": "channel",
      "checked": "false"
    },
    {
      "name": "Description",
      "value": "description",
      "checked": "false"
    },
    {
      "name": "Error Code",
      "value": "errorCode",
      "checked": "false"
    },
    {
      "name": "Updated Date",
      "value": "updatedDate",
      "checked": "false"
    },
    {
      "name": "Priority",
      "value": "priority",
      "checked": "false"
    },
    {
      "name": "Title",
      "value": "title",
      "checked": "false"
    },
    {
      "name": "Tags",
      "value": "tags",
      "checked": "false"
    },
    {
      "name": "Due Date",
      "value": "dueat",
      "checked": "false"
    },
    {
      "name": "TaskType",
      "value": "taskType",
      "checked": "false"
    },
    {
      "name": "Created Date",
      "value": "createdDate",
      "checked": "false"
    },
    {
      "name": "Created By",
      "value": "createdBy",
      "checked": "false"
    },
    {
      "name": "Id",
      "value": "id",
      "checked": "false"
    },
    {
      "name": "Status",
      "value": "status",
      "checked": "false"
    }
  ]


  constructor(private _Mainservice: MainService, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef,
    public dialogRef: MatDialogRef<Create_notification_templateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());

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
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  save() {
    console.log(this.data.id)
    if (this.data.id == undefined) {
      let obj =
      {
        "eventId": this.data.eventId,
        "lang": this.data.lang,
        "subjectFile": this.data.subjectFile,
        "bodyTemplate": "{{#productSpecificationRelationship}}↵Add Content Here ...↵{{/productSpecificationRelationship}}",
        "subjectTemplate": "{{#productSpecificationRelationship}}↵Add Content Here ...↵{{/productSpecificationRelationship}}",
        "bodyFile": this.data.bodyFile,
        "enabled": this.data.enabled
      };
      this._Mainservice.createtemplate(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);

      },
        (error: any) => console.log("error"));
    }
    else {
      let obj =
      {
        "eventId": "ec2e013d-cd4e-4fd2-9290-9b6a39592c72",
        "lang": "en",
        "subjectFile": "new",
        "bodyTemplate": "{{#productSpecificationRelationship}}↵Add Content Here ...↵{{/productSpecificationRelationship}}",
        "subjectTemplate": "{{#productSpecificationRelationship}}↵Add Content Here ...↵{{/productSpecificationRelationship}}",
        "bodyFile": "new",
        "enabled": true
      };
      this._Mainservice.updatetemplate(obj).subscribe((data: any) => {
        console.log("update");
        console.log(data);
        this.data = data;
      },
        (error: any) => console.log("error"));
    }
  }

}