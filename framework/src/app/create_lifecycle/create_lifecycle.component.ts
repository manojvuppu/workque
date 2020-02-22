import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-create_lifecycle',
  templateUrl: './create_lifecycle.component.html',
  styleUrls: ['./create_lifecycle.component.css']
})
export class Create_lifecycleComponent implements OnInit {
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
  secondFormGroup: FormGroup;

  constructor(private _Mainservice: MainService, private _formBuilder: FormBuilder, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef,
    public dialogRef: MatDialogRef<Create_lifecycleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    // let temp = [];
    //     this.data.stateTransition.forEach(function (element) {
    //       if(element.stepId == "Initial"){
    //         console.log(element)
    //         temp.push(element);
    //       }   
    //        if(element.stepId == null){
    //         temp.push(element);
    //         console.log(element)
    //       }  

    //       if(element.stepId == "Final"){
    //         temp.push(element);
    //         console.log(element)
    //       }  
    //     });
    //      console.log(temp);

    // var newArray = this.data.stateTransition.filter(function (el) {
    //   console.log(el);
    //   return el.stepId = "Initial" &&
    //     el.stepId == null &&
    //     el.stepId == "Final";
    // });
    // console.log(newArray)

    // this.data.stateTransition
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  arr = [];

  add(rateplan) {
    //console.log(rateplan);

    if (!this.data.id) {
      let obj = {
        "id": "",
        "name": rateplan,
      }
      //this.arr.list['value'] = this.data.ratePlan;
      //this.temp1 = this.data.status;
      this.temp1.push(obj);
      this.data.status = this.temp1;
    }
    else {
      let obj = {
        "id": "",
        "name": rateplan,
      }
      //this.arr.list['value'] = this.data.ratePlan;
      this.temp1 = this.data.status;
      this.temp1.push(obj);
      this.data.status = this.temp1;
      // console.log(this.data.status);
    }
    this.ratePlan = "";
  }

  deletestatus(i) {
    console.log(i);
    this.data.status != this.data.status.splice(i, 1);
  }

  addtab(step, current, new1, acti, func) {
    if (!this.data.id) {
      let obj =
      {
        "functionalMapping": func,
        "transLifecycle_id": "",
        "stepId": step,
        "action": acti,
        "screen": "",
        "id": "",
        "currentState": current,
        "newState": new1
      }
      // temp.push(obj);
      // this.temp = this.data.stateTransition;
      this.temp.push(obj);
      this.data.stateTransition = this.temp;
    }
    else {
      let obj =
      {
        "functionalMapping": func,
        "transLifecycle_id": "",
        "stepId": step,
        "action": acti,
        "screen": "",
        "id": "",
        "currentState": current,
        "newState": new1
      }
      // temp.push(obj);
      this.temp = this.data.stateTransition;
      this.temp.push(obj);
      this.data.stateTransition = this.temp;

    }
    //console.log(this.temp)
    this.stepId = "";
    this.currentState = "";
    this.newState = "";
    this.action = "";
    this.functionalMapping = "";
  }

  deleteaction(i) {
    console.log(i);
    this.data.stateTransition != this.data.stateTransition.splice(i, 1);
  }

  edit(step, current, new1, acti, func) {
    console.log(step)
    this.stepId = step;
    this.currentState = current;
    this.newState = new1;
    this.action = acti;
    this.functionalMapping = func;
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