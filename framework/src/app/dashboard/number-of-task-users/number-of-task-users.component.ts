import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-number-of-task-users',
  templateUrl: './number-of-task-users.component.html',
  styleUrls: ['./number-of-task-users.component.css']
})
export class NumberOfTaskUsersComponent implements OnInit {

  @Input() chilMessage: any;

  

  first1:any = 0;



  multi: any[];

  // view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = 'Users';
    showYAxisLabel = true;
    yAxisLabel = 'Number Of Tasks';
  
    colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

  constructor(private _Mainservice: MainService) {
    // Object.assign(this,  this.single )
   }

  ngOnInit() {

    var str = this.chilMessage;

    this.first1 = str;

    Object.assign(this,  this.first1 )
    // console.log('Message' + this.Message);
    
  }

  ngOnChanges(){

    
    var str = this.chilMessage;

    this.first1 = str;

    Object.assign(this,  this.first1 )
    // console.log('Message' + this.Message);

  }

}
