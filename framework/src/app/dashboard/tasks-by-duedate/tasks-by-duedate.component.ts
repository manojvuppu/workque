import { Component, OnInit, Input } from '@angular/core';

import { NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NgxChartsModule} from '@swimlane/ngx-charts';



@Component({
  selector: 'app-tasks-by-duedate',
  templateUrl: './tasks-by-duedate.component.html',
  styleUrls: ['./tasks-by-duedate.component.css']
})
export class TasksByDuedateComponent implements OnInit {

  @Input() chilMessage: any;

  single: any[];
  multi: any[];

  first1:any = 0;
  // view: any[] = [700, 150];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
   
   }

   onSelect(event) {
    console.log(event);
  }

  ngOnInit() {

    var str = this.chilMessage;

    this.multi = str;

    Object.assign(this, this.multi)  
  }

  ngOnChanges(){

    
    var str = this.chilMessage;

    this.multi = str;

    Object.assign(this, this.multi)  

  }

}
