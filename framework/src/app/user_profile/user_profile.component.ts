import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-user_profile',
  templateUrl: './user_profile.component.html',
  styleUrls: ['./user_profile.component.css']
})
export class User_profileComponent implements OnInit {

  constructor(private ApiService: ApiService, private AppModel: AppModelService, private  elemRef: ElementRef) { }

  ngOnInit() { 
	this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
  }

}