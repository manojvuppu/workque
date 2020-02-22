import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-createadmin-user-group',
  templateUrl: './createadmin-user-group.component.html',
  styleUrls: ['./createadmin-user-group.component.css']
})
export class CreateadminUserGroupComponent implements OnInit {
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
    public dialogRef: MatDialogRef<CreateadminUserGroupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this._Mainservice.getalluserrole().subscribe((data: any) => {

      console.log("roles")

      this.dropdownList = data;
      console.log(this.dropdownList);
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'roleId',
      textField: 'roleName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false
    };
    
    this._Mainservice.getallusergroup().subscribe((data: any) => {

      console.log("usergroup below")

      this.dropdownList1 = data;
      console.log(this.dropdownList1);
    });

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
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
    if (this.data.userId == undefined) {
      this._Mainservice.createuser(this.data).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
    }
    else {
      this._Mainservice.updateUser(this.data.userId,this.data).subscribe((data: any) => {
        console.log("inside");
        console.log(data);
      },
        (error: any) => console.log("error"));
        
    }
  }
}
