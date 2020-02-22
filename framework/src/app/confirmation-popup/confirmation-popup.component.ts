import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {

  currentState;
  newState;

  constructor(private _Mainservice: MainService, private _formBuilder: FormBuilder, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef,
    public dialogRef: MatDialogRef<ConfirmationPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
  
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }

  save() {
    console.log(this.data)

  }
}
