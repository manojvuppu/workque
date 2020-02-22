import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-create-user-groups',
  templateUrl: './create-user-groups.component.html',
  styleUrls: ['./create-user-groups.component.css']
})
export class CreateUserGroupsComponent implements OnInit {

  queueName: any;
  queueDescription: any;
  queueSLANoOfUnits: any;
  queueSLAUnit: any;
  userGroup: any;


  dropdownList;
  rolelist = [];
  dropdownSettings = {};

  dropdownSettings1 = {};
  dropdownList1;
  Groupslist = [];



  constructor(private _Mainservice: MainService, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef,
    public dialogRef: MatDialogRef<CreateUserGroupsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this._Mainservice.getalluser().subscribe((data: any) => {
      this.dropdownList = data;
      this.dropdownList1 = data;
      console.log(this.dropdownList);
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    };


    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'userId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }


  onItemSelect(item: any) {
    console.log(item);
    console.log(this.data.roles);
  }

  onItemSelect1(item: any) {
    console.log(item);
    console.log(this.data.userGroups);
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
        "description": this.data.description,
        "userList": this.data.userList,
        "lead": this.data.lead
      };
      this._Mainservice.createusergroup(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
    else {
      let obj =
      {
        "id": this.data.id,
        "name": this.data.name,
        "description": this.data.description,
        "userList": this.data.userList,
        "lead": this.data.lead
      };
      this._Mainservice.updatequeue(obj).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
  }


}
