import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MainService } from '../services/main.service';

import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  // encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  statusCount: any = null;
  completedTasks: any = null;
  getMyTasksToday: any = null;
  getCreatedVsResolvedByQueue: any = null;
  getTaskCount: any = null;
  getTaskByDuedate: any = null;
  layout: any = "6";
  layout1:any;
  id;
  username;
  showOrHide:boolean = true;
  displayCompletedTasks: boolean = true;

  displayMyTasksToday: boolean = true;
  displayCreatedVsResolved: boolean = true;
  displayNumberOfTasksByUser: boolean = true;
  displayTasksByDueDate: boolean = true;
 

  // statusCount.OverAllCount.Open: any = null;
  // statusCount.OverAllCount.InProgress
  // statusCount.OverAllCount.Pending
  // statusCount.OverAllCount.Close


  showhidepregnant: boolean = true;
showhidepregnant1: boolean = true;
showhidepregnant2: boolean = true;

showhidepregnant3: boolean = true;
// showhidepregnant4: boolean = false;
  // showhidepregnant5: boolean = false;
 //showhidepregnant6: boolean = false;

 maxNo = true;
  amt = 4;

  onChange(isChecked: boolean) {
    if (isChecked)
      this.amt++
    else 
      this.amt--
    this.amt === 4 ? this.maxNo = true : this.maxNo = false;
  }


  showOrHide1(showOrHide: boolean){

    showOrHide = !showOrHide

  }


  constructor(private _Mainservice: MainService,public dialog: MatDialog) { 

    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      // width: '250px',
      data: {layout:this.layout}
    });

    dialogRef.afterClosed().subscribe(result => {

      // sessionStorage.setItem('ep-username','mvuppu@apptium.com');

      this.id = sessionStorage.getItem('ep-username');
      console.log(this.id);
      console.log('The dialog was closed');

      this._Mainservice.getAllTaskByStatus(this.id).subscribe((data: any) => {
        this.statusCount = data;
        console.log(this.statusCount);
        });
    
        this._Mainservice.getcompletedTasks(this.id).subscribe((data: any) => {
        this.completedTasks = data;
console.log( "completedTasks");     

            console.log( this.completedTasks);     
        });
    
        this._Mainservice.getMyTasksToday(this.id).subscribe((data: any) => {
        this.getMyTasksToday = data;
          //  console.log( this.getMyTasksToday);     
        });
    
        this._Mainservice.getCreatedVsResolvedByQueue().subscribe((data: any) => {
        this.getCreatedVsResolvedByQueue = data;
            // console.log( this.getCreatedVsResolvedByQueue);     
        });
    
        this._Mainservice.getTaskCount().subscribe((data: any) => {
          // console.log( data);   
          var json = data;
          json = JSON.parse(JSON.stringify(json).split('"assignedToUserId":').join('"name":'));
          // document.write(JSON.stringify(json));
          json = JSON.parse(JSON.stringify(json).split('"Tasks Count":').join('"value":'));
          // document.write(JSON.stringify(json));
          this.getTaskCount = json;
          // console.log( json);   
        });
    
    
        this._Mainservice.getTaskByDuedate().subscribe((data: any) => {
         this.getTaskByDuedate = data;
        //  console.log( this.getTaskByDuedate); 
    
        });


      this.layout = result.layout;
      // console.log(this.layout);

      
    });
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog1, {
      // width: '250px',
      data: {displayCompletedTasks: this.displayCompletedTasks, displayMyTasksToday:this.displayMyTasksToday, displayCreatedVsResolved: this.displayCreatedVsResolved,displayNumberOfTasksByUser: this.displayNumberOfTasksByUser, displayTasksByDueDate:this.displayTasksByDueDate  }
    });

    dialogRef.afterClosed().subscribe(result => {

      // console.log("sent data")
      // console.log(result);
      this.displayCompletedTasks = result.displayCompletedTasks;
      this.displayMyTasksToday = result.displayMyTasksToday
      this.displayCreatedVsResolved= result.displayCreatedVsResolved
      this.displayNumberOfTasksByUser= result.displayNumberOfTasksByUser
      this.displayTasksByDueDate= result.displayTasksByDueDate
    });
  }

  ngOnChanges(){

  }

  ngOnInit() {

    // sessionStorage.setItem('ep-username','mvuppu@apptium.com');

    this.username =  sessionStorage.getItem('ep-author');
    console.log(this.username);

    this.id = sessionStorage.getItem('ep-username');
     console.log(this.id);

   

    this._Mainservice.getAllTaskByStatus(this.id).subscribe((data: any) => {
    this.statusCount = data;
    // console.log(this.statusCount);
    });

    this._Mainservice.getcompletedTasks(this.id).subscribe((data: any) => {
    this.completedTasks = data;
      //  console.log( this.completedTasks);     
    });

    this._Mainservice.getMyTasksToday(this.id).subscribe((data: any) => {
    this.getMyTasksToday = data;
      //  console.log( this.getMyTasksToday);     
    });

    this._Mainservice.getCreatedVsResolvedByQueue().subscribe((data: any) => {
    this.getCreatedVsResolvedByQueue = data;
        // console.log( this.getCreatedVsResolvedByQueue);     
    });

    this._Mainservice.getTaskCount().subscribe((data: any) => {
      // console.log( data);   
      var json = data;
      json = JSON.parse(JSON.stringify(json).split('"assignedToUserId":').join('"name":'));
      // document.write(JSON.stringify(json));
      json = JSON.parse(JSON.stringify(json).split('"Tasks Count":').join('"value":'));
      // document.write(JSON.stringify(json));
      this.getTaskCount = json;
      // console.log( json);   
    });


    this._Mainservice.getTaskByDuedate().subscribe((data: any) => {
     this.getTaskByDuedate = data;
    //  console.log( this.getTaskByDuedate); 

    });
  }


  
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styles: [`
  ::ng-deep .mat-radio-container {
    margin-top: -12em;
}
::ng-deep .cdk-overlay-backdrop.cdk-overlay-backdrop-showing {
  backdrop-filter: blur(5px);
}
  `],
  encapsulation: ViewEncapsulation.None
 
})
export class DialogOverviewExampleDialog {

  selection: string;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog1',
  templateUrl: 'dialog-overview-example-dialog1.html',
})

export class DialogOverviewExampleDialog1 {

  displayCompletedTasks:boolean;
  displayMyTasksToday :boolean;
  displayCreatedVsResolved:boolean;
  displayNumberOfTasksByUser:boolean;
  displayTasksByDueDate:boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog1>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
