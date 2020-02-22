import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { HttpErrorResponse } from '@angular/common/http';

import * as _ from 'lodash';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

//let fileUpload = require('fuctbase64');

@Component({
  selector: 'app-create_task',
  templateUrl: './create_task.component.html',
  styleUrls: ['./create_task.component.css']
})
export class Create_taskComponent implements OnInit {
  panelOpenState = false;
  users: [];
  tasktypes: [];
  userlist: [];
  queue: [];
  priority: [];
  extensionlist: [];
  detaillist;

  documentlist: [];
  Tags;

  fileToUpload: any = {};
  filesArr = [];
  tempObj: any = {};
  onSuccess: any = 0;
  loading = false;
  qid;
  now = new Date();

  title = 'app works!';
  fileResult: any;

  username = sessionStorage.getItem('ep-username');

  constructor(private datePipe: DatePipe, private toastr: ToastrService, private _Mainservice: MainService, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef,
    public dialogRef: MatDialogRef<Create_taskComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // this.data.dueAt = new Date(this.data.dueAt);
    this.data.dueAt = this.datePipe.transform(this.data.dueAt, 'yyyy-MM-dd');


    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];

    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    this._Mainservice.getqueuelist(this.username).subscribe((data: any) => {
      this.queue = data;
      console.log(data);

      if (this.data.id) {
        this.getuserlist(this.data.queueId);
        //this.getextension(this.data.taskType)
      }

    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

    this._Mainservice.getallpriority().subscribe((data: any) => {
      this.priority = data;
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });


    this._Mainservice.gettaskdetailsattribute().subscribe((data: any) => {

      for (let i: number = 0; i < data.length; i++) {
        data[i].value = '';
      }
      this.detaillist = data;

      // this.detaillist = data;
      console.log(data);
    });


    if (this.data.id) {

      for (let i = 0; i < this.detaillist.length; i++) {
       
          if(this.data.hasOwnProperty(this.detaillist[i].tags)){
          
        let extn = {
          "id": "",
          "tags": this.data.this.detaillist[i].tags,
          "value": this.data.this.detaillist[i].value,
          "Tasks_id": ""
        }
          
        this.detaillist.push(extn);
        console.log("extension obj", this.detaillist);
      }
      }

    }


  }

  getuserlist(event) {
    console.log(event);
    this.qid = event;
    this._Mainservice.getusers(event, this.username).subscribe((data: any) => {
      this.users = data;
      console.log(data);
    });

    this._Mainservice.getalltasktype(event).subscribe((data: any) => {
      this.tasktypes = data;
      console.log(this.tasktypes);
    });
  }

  getextension(event) {

    this._Mainservice.gettaskextension(event).subscribe((data: any) => {
      console.log(data);

      //this.data.taskExtensionValues = [];
      this.data.taskExtensionValues = data;

    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  //   onFileChange(event){
  //     let result = fileUpload(event);
  //     this.fileResult = result;
  //     console.log(this.fileResult)
  // }
  extension = [];

  save(object, extesnion) {
    console.log(this.data.id);
    console.log(object);
    console.log(extesnion);

    for (let i = 0; i < extesnion.length; i++) {
      let extn = {
        "id": "",
        "attributeName": extesnion[i].attributeName,
        "attributeValue": extesnion[i].attributeValues,
        "Tasks_id": ""
      }
      this.extension.push(extn);
      console.log("extension obj", this.extension);
    }

    if (this.data.id == undefined) {
      let obj =
      {
        "id": "",
        "description": this.data.description,
        "dueAt": this.data.dueAt,
        "queueId": this.data.queueId,
        "assignedToUserId": this.data.assignedToUserId,
        "assignedToGroupId": "",
        "status": "",
        
        "taskType": this.data.taskType,
        
        "relatedTaskId": "",
        "createdBy": "",
        "updatedBy": "",
        "createdDate": "",
        "updatedDate": "",
        "priority": this.data.priority,
        "name": this.data.name,
        "taskExtensionValues": this.extension,
        "taskNotes": [
          {
            "id": "",
            "description": "",
            "Tasks_id": "",
            "attachment1FolderId": "",
            "attachment2FolderId": "",
            "attachment3FolderId": "",
            "attachment4FolderId": "",
            "attachment5FolderId": "",
            "attachment6FolderId": "",
            "documentLink": "",
            "submitterName": "",
            "worklogView": "",
            "attachment1DisplayName": "",
            "attachment2DisplayName": "",
            "attachment3DisplayName": "",
            "WorkLogDate": "",
            "comments": this.data.title,
            "workActivityType": "",
            "attachment1GUID": "",
            "attachment1Name": "",
            "attachment2GUID": "",
            "attachment2Name": "",
            "attachment3GUID": "",
            "attachment3Name": "",
            "attachment4GUID": "",
            "attachment4Name": "",
            "attachment5GUID": "",
            "attachment5Name": "",
            "attachment6GUID": "",
            "attachment6Name": "",
            "attachment4DisplayName": "",
            "attachment5DisplayName": "",
            "attachment6DisplayName": "",
            "documentContents": this.filesArr,
            "createdBy": "",
            "updatedBy": "",
            "createdDate": "",
            "updatedDate": ""
          }
        ],
        "externalCommunication": [
          {
            "id": "",
            "communicationType": "",
            "startTime": "",
            "endTime": "",
            "chatSnapshot": "",
            "communicationId": "",
            "createdBy": "",
            "createdDate": "",
            "Tasks_id": ""
          }
        ],
        "relatedEntityRef": {
          "id": "",
          "relatedEntityType": "",
          "relatedEntityRole": "",
          "Tasks_id": ""
        },
        "relatedPartyRef": [
          {
            "id": "",
            "relatedPartyRating": "",
            "relatedPartyRole": "",
            "Tasks_id": ""
          }
        ],
        "timeSlot": [
          {
            "id": "",
            "endDateTime": "",
            "startDateTime": "",
            "Tasks_id": ""
          }
        ],
        "taskAudit": [
          {
            "id": "",
            "attributeName": "",
            "beforeValue": "",
            "afterValue": "",
            "eventType": "",
            "createdBy": "",
            "updatedBy": "",
            "createdDate": "",
            "updatedDate": "",
            "Action": "",
            "Tasks_id": ""
          }
        ]
      }
      for (let i: number = 0; i < object.length; i++) {
        obj[object[i].tags] = object[i].value + "";
      }

      console.log(obj);

      this._Mainservice.createtask(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(obj);
        console.log(data);
        this.toastr.success('Success!');
      },
        (error: any) => {
          console.log(error.error.errorMessage);
          var msg = error.error.errorMessage;
          this.toastr.error(msg);
        });

    }
    else {
      let obj = {
        "id": this.data.id,
        "description": this.data.description,
        "dueAt": this.data.dueAt,
        "queueId": this.data.queueId,
        "assignedToUserId": this.data.assignedToUserId,
        "assignedToGroupId": "",
        "status": "",
        "tags": "",
        "taskType": this.data.taskType,
        "channel": "",
        "errorDecription": "",
        "errorCode": "",
        "title": "",
        "relatedTaskId": "",
        "createdBy": "",
        "updatedBy": "",
        "createdDate": "",
        "updatedDate": "",
        "priority": this.data.priority,
        "name": this.data.name,
        "taskExtensionValues": [],
        "taskNotes": [
          {
            "id": "",
            "description": "",
            "Tasks_id": "",
            "attachment1FolderId": "",
            "attachment2FolderId": "",
            "attachment3FolderId": "",
            "attachment4FolderId": "",
            "attachment5FolderId": "",
            "attachment6FolderId": "",
            "documentLink": "",
            "submitterName": "",
            "worklogView": "",
            "attachment1DisplayName": "",
            "attachment2DisplayName": "",
            "attachment3DisplayName": "",
            "WorkLogDate": "",
            "comments": this.data.title,
            "workActivityType": "",
            "attachment1GUID": "",
            "attachment1Name": "",
            "attachment2GUID": "",
            "attachment2Name": "",
            "attachment3GUID": "",
            "attachment3Name": "",
            "attachment4GUID": "",
            "attachment4Name": "",
            "attachment5GUID": "",
            "attachment5Name": "",
            "attachment6GUID": "",
            "attachment6Name": "",
            "attachment4DisplayName": "",
            "attachment5DisplayName": "",
            "attachment6DisplayName": "",
            "documentContents": this.filesArr,
            "createdBy": "",
            "updatedBy": "",
            "createdDate": "",
            "updatedDate": ""
          }
        ],
        "externalCommunication": [
          {
            "id": "",
            "communicationType": "",
            "startTime": "",
            "endTime": "",
            "chatSnapshot": "",
            "communicationId": "",
            "createdBy": "",
            "createdDate": "",
            "Tasks_id": ""
          }
        ],
        "relatedEntityRef": {
          "id": "",
          "relatedEntityType": "",
          "relatedEntityRole": "",
          "Tasks_id": ""
        },
        "relatedPartyRef": [
          {
            "id": "",
            "relatedPartyRating": "",
            "relatedPartyRole": "",
            "Tasks_id": ""
          }
        ],
        "timeSlot": [
          {
            "id": "",
            "endDateTime": "",
            "startDateTime": "",
            "Tasks_id": ""
          }
        ],
        "taskAudit": [
          {
            "id": "",
            "attributeName": "",
            "beforeValue": "",
            "afterValue": "",
            "eventType": "",
            "createdBy": "",
            "updatedBy": "",
            "createdDate": "",
            "updatedDate": "",
            "Action": "",
            "Tasks_id": ""
          }
        ]
      }
      this._Mainservice.updatetask(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => {
          console.log("error");
          var msg = error.error.errorMessage;
          this.toastr.error(msg);

        });
    }
  }

  onFileChanged(event): void {
    this.filesArr = [];

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {

        this.readThis(event.target.files[i]);
      }
    }
  }

  readThis(inputValue: any): void {
    const file: File = inputValue;
    const myReader: FileReader = new FileReader();

    myReader.onload = e => {
      this.fileToUpload.documentName = file.name;
      this.fileToUpload.documentContent = btoa(_.get(e.target, "result"));
      this.fileToUpload.title = "";
      this.fileToUpload.assignedTo = "";
      this.fileToUpload.note = "";
      this.fileToUpload.downloadType = "";
      this.fileToUpload.active = "true";
      this.fileToUpload.fileName = file.name;
      this.fileToUpload.fileSize = file.size;
      this.fileToUpload.fileType = file.type;
      this.fileToUpload.version = "1";
      this.fileToUpload.modifiedDate = new Date();
      this.fileToUpload.createdDate = new Date();

      this.tempObj = {};
      this.tempObj.documentName = this.fileToUpload.documentName;
      this.tempObj.documentContent = this.fileToUpload.documentContent;
      if (!this.filesArr.some((item) => item.documentName == this.tempObj.documentName)) {
        // (document.getElementById("myTextarea") as HTMLInputElement).value += this.tempObj.documentName + "\n";
        this.filesArr.push(this.tempObj);
        for (var i = 0; i < this.filesArr.length; i++) {
          this.filesArr[i].folderId = 3408; // Add "total": 2 to all objects in array
        }

      }
    };

    myReader.readAsBinaryString(file);

    // this.filesArr.forEach(function (element) {
    //   this.filesArr['folderId'] = 3408;
    // });

    //  for (let i: number = 0; i < this.filesArr.length; i++) {
    //     this.filesArr['folderId'] = "3408";
    //   }

    //     for (var i = 0; i < this.filesArr.length; i++) {
    //     this.filesArr[i].folderId = 3408; // Add "total": 2 to all objects in array
    // }

    // this.filesArr.map((obj) => {
    //     obj.folderId = 3408;

    // })

    console.log(this.filesArr);

    let obj = [{
      "documentName": "dec1awwdadaawdwawd30.txt",
      "folderId": "3408",
      "documentContent": "dGVzdCBkZWM2"
    },
    {

      "documentName": "dec1awdawawdawd51.txt",
      "folderId": "3408",
      "documentContent": "dGVzdCBkZWM3"
    },
    {

      "documentName": "decaawdawdawdwd159.txt",
      "folderId": "3408",
      "documentContent": "dGVzdCBkZWM4"
    }]
  }

}