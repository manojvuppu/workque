import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-creat-admin-customize',
  templateUrl: './creat-admin-customize.component.html',
  styleUrls: ['./creat-admin-customize.component.css']
})
export class CreatAdminCustomizeComponent implements OnInit {
  currentState;
  newState;
  action;
  Description;
  rateplan;
  value2;
  value1;
  userlist;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  title: string;
  attrKeyValue = [];
  

  constructor(private _Mainservice: MainService, private _formBuilder: FormBuilder, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef,
    public dialogRef: MatDialogRef<CreatAdminCustomizeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if(this.data === 0){
      this.data = {};
      this.title = "Create";
    }else{
      this.title = "Edit"
    }
    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.userlist = [{"method":"Get"},{"method":"Post"},{"method":"Delete"},{"method":"Patch"}]
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  arr = [];

  add(rateplan) {
    console.log(rateplan);
    //this.arr.list['value'] = this.data.ratePlan;
    this.arr.push({ "value": rateplan });
    console.log(this.arr);
  }

  addtab() {
    let obj =
    {
      "functionalMapping": "Execute Complete",
      "transLifecycle_id": "",
      "action": "Start",
      "screen": "GetSupervisorListComponent",
      "id": "",
      "currentState": "Pending",
      "newState": "In Progress"
    }

    this.data.stateTransition.push(obj);
  }
  setValue(i , e){
    if(e.checked){
      this.data.status = 'Active'
    }else{
      this.data.status = 'Inactive'
    }
  }
  save() {
    console.log("create data"+this.data)
    this.data.endPointURL = "get";
    this.data.sourceURL = "https://bonito.apptium.com/router/mp/apiwq/action/api/viewfilter/getAllTaskWidgets"
    if (this.data.id == undefined) {
      let obj = {
        "name": this.data.name,
        "type": this.data.type,
        "status": this.data.status,
        "endPointURL": this.data.endPointURL,
        "sourceURL": this.data.sourceURL,
        "attributeDetails": this.data.attributeDetails
      }
      this._Mainservice.createwidget(obj).subscribe((data: any) => {
        this.data.id = data.id;
      },
        (error: any) => console.log("error"));
    }
    else {
      let obj =
      {
        "id": this.data.id,
        "name": this.data.name,
        "type": this.data.type,
        "status": this.data.status,
        "endPointURL": this.data.endPointURL,
        "sourceURL": this.data.sourceURL,
        "attributeDetails": this.data.attributeDetails
      };
      this._Mainservice.updatewidget(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
  }
  onCheckboxChange(list,event){
    console.log(event.target.checked);
    if(event.target.checked){
      
    }
  }
  populateAttr(){
    this._Mainservice.getAttrWidget().subscribe((data: any) => {
      this.attrKeyValue = data.taskWidgetDetails;
    },
      (error: any) => console.log("error"));
  }
}
