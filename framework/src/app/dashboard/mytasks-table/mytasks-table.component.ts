import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { ColumnMode, SortType, SelectionType } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mytasks-table',
  templateUrl: './mytasks-table.component.html',
  styleUrls: ['./mytasks-table.component.css']
})
export class MytasksTableComponent implements OnInit {

  rows = [];
  columns = []
  selected = [];
  temp = [];
  name = 'Ngx Datatables Filter All Columns';
  id;

  ColumnMode = ColumnMode;
  SortType = SortType;
  SelectionType = SelectionType;

  constructor(private _Mainservice: MainService) { }

  ngOnInit() {

    // sessionStorage.setItem('ep-username','pshelar@apptium.com'); 
    this.id = sessionStorage.getItem('ep-username'); 
    console.log(this.id);

    this._Mainservice.getMyTasksToday(this.id).subscribe((data: any) => {
      // this.temp = [...data];
      this.rows = data.MyTodayTasks;
      console.log("data table");
       console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  
    this.columns = [
      
      {
        prop: 'id',
        name: 'Id',
        canAutoResize: false,
        resizable: false,
        width: 60
      },
      { prop: 'title', name: 'Task Name', canAutoResize: true, resizable: false },
      { prop: 'priority', name: 'Priority', canAutoResize: true, resizable: false },
      { prop: 'errorCode', name: 'Error Code', canAutoResize: true, resizable: false },
      { prop: 'dueAt', name: 'Due At', canAutoResize: true, resizable: false },
      { prop: 'status', name: 'Status', canAutoResize: true, resizable: false },
     
    ];
  }

}
