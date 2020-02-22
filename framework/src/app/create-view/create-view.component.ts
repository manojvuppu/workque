import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../mytask/mytask.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-create-view',
  templateUrl: './create-view.component.html',
  styleUrls: ['./create-view.component.css']
})
export class CreateViewComponent implements OnInit {
  username = sessionStorage.getItem('ep-username');
  allColumns=[];
  taskStatusList=[];
  taskPriorityList=[];

  constructor(private _Mainservice: MainService,
    public dialogRef: MatDialogRef<CreateViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.allColumns = data.allColumns;
    this.taskStatusList = data.taskStatusList;
    this.taskPriorityList = data.taskPriorityList
    }

  onNoClick(data): void {
    this.dialogRef.close(data);
  }

  ngOnInit() {
    console.log(this.data);
    
  }

  createview() {
    let obj = {
      "id": "",
      "name": this.data.name,
      "selectedFilterList": { 
        "Hiddencolumn": this.allColumns, 
        "statuscolums": this.taskStatusList, 
        "prioritycolums": this.taskPriorityList
        },
      "userId": this.username,
      "pagenumber": ""
    }

    this._Mainservice.createview(obj).subscribe((data: any) => {
      console.log("inside");
      console.log(data);
       this.onNoClick(data)
    },
      (error: any) => console.log("error"));
  }

}
