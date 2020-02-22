import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

@Component({
  selector: 'app-sidemenubar',
  templateUrl: './sidemenubar.component.html',
  styleUrls: ['./sidemenubar.component.css']
})
export class SidemenubarComponent implements OnInit {

  constructor(private ApiService: ApiService, private AppModel: AppModelService, private  elemRef: ElementRef) { }

  ngOnInit() { 
	this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
  }

}