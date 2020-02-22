
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, TemplateRef, AfterViewInit, VERSION } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Create_taskComponent } from '../create_task/create_task.component';

import { MainService } from '../services/main.service';
import { ColumnMode, SortType, SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';

import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import * as _ from 'lodash';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';


import {
  startOfDay, endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { Subject } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MatStepper } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateViewComponent } from '../create-view/create-view.component';

import { ExportToCsv } from 'export-to-csv';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import { GetSupervisorListComponent } from '../get-supervisor-list/get-supervisor-list.component';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

export interface PeriodicElement1 {
  description: string;
  id: number;
  date: any;
  agent: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  { id: 1, description: 'equipment installation', date: '12/12/2019', agent: 'Pratish' },
  { id: 2, description: 'equipment installation', date: '12/12/2019', agent: 'Pratish' },
  { id: 3, description: 'equipment installation', date: '12/12/2019', agent: 'Pratish' },
  { id: 4, description: 'equipment installation', date: '12/12/2019', agent: 'Pratish' },
];

@Component({
  selector: 'app-work-queue',
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.css']
})
export class WorkQueueComponent implements OnInit {
  now = new Date();
 
  username = sessionStorage.getItem('ep-username');
  rows = [];
  columns = []
  selected = [];
  temp = [];
  name = 'Ngx Datatables Filter All Columns';
 
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  displayedColumns1: string[] = ['id', 'description', 'date', 'agent'];
  dataSource1 = ELEMENT_DATA1;

  private ngVersion: string = VERSION.full;
  // Only required when not passing the id in methods
  @ViewChild('buttonsTemplate', { static: true }) buttonsTemplate: TemplateRef<any>;
  @ViewChild('stepper', { static: true }) private myStepper: MatStepper;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  totalStepsCount: number;

  public sidenav: any;
  conditionFlag: boolean = true;
  styleOne: boolean = false;
  mode = new FormControl('over');


  open;
  done;
  Close;
  Pending;
  InProgress;
  tasktypes: [];
  viewslist;
  taskPriorityList;
  taskStatusList;
  hidecolums;

  message: string;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('search', { static: false }) search: any;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  filtertest;
  constructor(private toastr: ToastrService, private _Mainservice: MainService, public dialog: MatDialog, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef, private modal: NgbModal) { }

  public loading = false;

  ngOnInit() {

     console.log("new message", this.message);

    // sessionStorage.setItem('ep-username','pshelar@apptium.com');
    this.loading = true;
    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 30
      },
      { prop: 'id', name: 'Id', canAutoResize: true, resizable: false },
      { prop: 'name', name: 'Task Name', canAutoResize: true, resizable: false },
      { prop: 'priority', name: 'Priority', canAutoResize: true, resizable: false },
      { prop: 'queueId', name: 'Queue Id', canAutoResize: true, resizable: false },
      { prop: 'taskType', name: 'Task Type', canAutoResize: true, resizable: false },
      { prop: 'errorCode', name: 'Error Code', canAutoResize: true, resizable: false },
      { prop: 'assignedToUserId', name: 'Assigned To', canAutoResize: true, resizable: false },
      { prop: 'assignedToGroupId', name: 'Assigned Id', canAutoResize: true, resizable: false },
      { prop: 'createdDate', name: 'Created Date', canAutoResize: true, resizable: false },
      { prop: 'dueAt', name: 'Due At', canAutoResize: true, resizable: false },
      { prop: 'status', name: 'Status', canAutoResize: true, resizable: false },
      { prop: 'actions', name: 'Actions', cellTemplate: this.buttonsTemplate, draggable: false, canAutoResize: true, resizable: false }
    ];

    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());

    this._Mainservice.getTaskevents().subscribe((data: any) => {
      console.log(data);
    });

    // this._Mainservice.getalltasks(this.username).subscribe((data: any) => {
    //   console.log(data);
    //   this.temp = data[1];
    //   this.rows = data[1];
    //   this.open = data[0].Open;
    //   this.Close = data[0].Close;
    //   this.InProgress = data[0].InProgress;
    //   this.Pending = data[0].Pending;
    // });

    this._Mainservice.getviews(this.username).subscribe((data: any) => {
      this.viewslist = data;
      // let obj = JSON.parse(data[1].selectedFilterList);
      // console.log(obj);
      console.log(this.viewslist);
    });

    this._Mainservice.getfilter().subscribe((data: any) => {
      console.log(data);
      this.filtertest = data
      this.taskPriorityList = data.taskPriorityList;
      this.taskStatusList = data.taskStatusList;
      this.hidecolums = data.hiddenDetails;
    });

    if (this._Mainservice.subsVar==undefined) {    
      this._Mainservice.subsVar = this._Mainservice.    
      invokeFirstComponentFunction.subscribe((id) => {    
        this.firstFunction(id);    
      });    
    }  
     this._Mainservice.currentMessage.subscribe(message => this.message = message);
     this. onworqueueclick(this.message);

  }

  firstFunction(id) {    
    //alert( 'Hello ' + '\nWelcome to C# Corner \nFunction in First Component');  
    this.onworqueueclick(id);  
  } 

   onworqueueclick(id){

    // this._Mainservice.currentMessage.subscribe(message => this.message = message);

      this._Mainservice.getallworkqueue(id,this.username).subscribe((data: any) => {
      console.log(data);

      this.temp = [];
      this.rows = [];

      this.temp = data;
      this.rows = data;
      // this.open = data[0].Open;
      // this.Close = data[0].Close;
      // this.InProgress = data[0].InProgress;
      // this.Pending = data[0].Pending;

      // this.events = [
      //   // ...this.events,
      //   {
      //     title: this.rows[2].assignedToUserId,
      //     start: startOfDay(new Date()),
      //     end: endOfDay(new Date()),
      //     color: colors.red,

      //   }
      // ];
      // this.loading = false;

    });
  }

  onviewSelect(i) {
    console.log(i)
    this.viewslist.forEach(function (item, index) {
      if (i == index) {
        let obj = item.selectedFilterList;
        console.log(obj);
      }
    });
  }

  // cancheck(value){
  //   if(this.taskStatusList.include(value))
  //   {
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }

  removeFile(row) {
    console.log(row);

    this._Mainservice.deletetask(row).subscribe(() => {
      this.rows = this.rows.filter(book => book.id != row);
      console.log("deleted");
    });
    this.toastr.success('Success!');
  }

  assigntask(row) {
    console.log(row);
    let obj =
    {
      "assignedToUserId": "pshelar@apptium.com",
    };
    this._Mainservice.assigntask(row, obj).subscribe(() => {
      this.rows = this.rows.filter(book => book.id != row);
      console.log("Assigned");
      this.toastr.success('Success!');
    });
  }

  assigntaskfromdetailsscreen(event) {
    this.Assign = event;
    // this.Assign = event.slice(0, 5);

    let obj =
    {
      "assignedToUserId": event,
    };
    this._Mainservice.assigntask(this.id, obj).subscribe(() => {
      this.rows = this.rows.filter(book => book.id != this.id);
      console.log("Assigned");
      this.toastr.success('Success!');
    });
  }



  onSelect({ selected }) {
    console.log('Select Event', selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }



  assigntaskbulk() {
    let result = this.selected.map(a => a.id);
    console.log(result);

    let obj =
    {
      "id": "",
      "assignedToUserId": "pshelar@apptium.com"
    };

    this._Mainservice.assigntask(result, obj).subscribe(() => {
      this.rows = this.rows.filter(book => book.id != result);
      console.log("assigned");
      this.toastr.success('Success!');
    });
  }

  exporttask(type) {
    console.log(type)
    if (type == "csv") {
      //  console.log(this.rows)
      //   let zip: JSZip = new JSZip();
      //   zip.file("report.csv", "this.rows");


      //   zip.generateAsync({ type: "blob" }).then(function (content) {
      //     // see FileSaver.js

      //     FileSaver.saveAs(content, "example.zip");
      //   });
      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Report CSV',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };

      const csvExporter = new ExportToCsv(options);

      if (this.selected) {
        csvExporter.generateCsv(this.selected);
      }

    }
    else {

      let zip: JSZip = new JSZip();
      zip.file("report.pdf", this.rows);

      zip.generateAsync({ type: "blob" }).then(function (content) {
        // see FileSaver.js

        FileSaver.saveAs(content, "example.zip");
      });

    }
  }


  // let obj =
  // {
  //   "documentGUID": "",
  //   "documentName": "",
  //   "tag": "",
  //   "docType": "",
  //   "folderId": "",
  //   "departmentClient": "",
  //   "documentContent": "awdadawdawdad",
  //   "folderName": "",
  //   "path": "",
  //   "source": "",
  //   "target": "",
  //   "status": "",
  //   "recursive": "",
  //   "fileName": "",
  //   "title": "",
  //   "comment": "",
  //   "author": "",
  //   "mimeType": "",
  //   "isEmptyDocument": ""
  // };

  // this._Mainservice.Export(obj).subscribe(() => {
  //   console.log("Export");
  // });

  // this.getattachment(obj);




  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    fromEvent(this.search.nativeElement, 'keydown')
      .pipe(
        debounceTime(550),
        map(x => x['target']['value'])
      )
      .subscribe(value => {
        this.updateFilter(value);
      });
  }

  updateFilter(val: any) {
    const value = val.toString().toLowerCase().trim();
    // get the amount of columns in the table
    const count = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.temp[0]);
    // assign filtered matches to the active datatable
    this.rows = this.temp.filter(item => {
      // iterate through each row's column data
      for (let i = 0; i < count; i++) {
        // check for a match
        if (
          (item[keys[i]] &&
            item[keys[i]]
              .toString()
              .toLowerCase()
              .indexOf(value) !== -1) ||
          !value
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
  }

  // *********************************** Task Details Screen *************************************************************

  singletask; // get single task details

  // binding to single task history, comment
  id;
  Name;
  queuename;

  // binding to task summary
  tasksummary; // store task summary
  Assign;
  Status;
  Priority;
  DueDate;

  // binding to task details
  QueueId;
  errorDescription;
  channel;
  description;
  errorCode;
  taskdetailCreatedBy;
  taskdetailUpdatedBy;
  taskdetailCreatedDate;
  taskdetailUpdatedDate;
  tasktype;
  minDate;

  // binding for task history,comment
  taskNotes: any[] = [];
  history: [];
  comment;
  relatedtask: [];
  taskextension: [];
  // dropdown values 
  queue: [];
  users: [];
  priority: [];
  statuslist = [];

  taskactions = [];

  fileToUpload: any = {};
  filesArr = [];
  tempObj: any = {};
  onSuccess: any = 0;

  editrow;

  opensidenav(sidenav, row) {

    this.styleOne = true;



    this.editrow = row;

    this._Mainservice.getsingletask(row.id).subscribe((data: any) => {

      this.singletask = data[0];

      this.Name = this.singletask.title;
      console.log(this.singletask);
      this.Name = this.singletask.name;
      this.queuename = this.singletask.queueId;

      this.id = this.singletask.id;

      this.tasksummary = data;
      this.Assign = this.singletask.assignedToUserId;
      this.Status = this.singletask.status;
      this.DueDate = new Date(this.singletask.dueAt);
      console.log(new Date());
      this.minDate = new Date();
      this.Priority = this.singletask.priority;

      this.QueueId = this.singletask.queueId;
      this.errorDescription = this.singletask.errorDecription;
      this.channel = this.singletask.channel;
      this.description = this.singletask.description;
      this.errorCode = this.singletask.errorCode;
      this.taskdetailCreatedBy = this.singletask.createdBy;
      this.taskdetailUpdatedBy = this.singletask.updatedBy;
      this.taskdetailCreatedDate = this.singletask.createdDate;
      this.taskdetailUpdatedDate = this.singletask.updatedDate;

      this.taskNotes = this.singletask.taskNotes;
      this.history = this.singletask.taskAudit;

      this.taskextension = this.singletask.taskExtensionValues;
      this.tasktype = this.singletask.taskType;
      console.log(this.tasktype);
      console.log(this.Status);

      this._Mainservice.getalltaskaction(this.tasktype, this.Status).subscribe((data: any) => {
        console.log(data);
        this.taskactions = data;
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );

      this._Mainservice.getnextstatus(this.tasktype, this.Status).subscribe((data: any) => {
        this.statuslist = data;
        console.log(data);
      },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );

      this._Mainservice.getusers(this.QueueId, this.username).subscribe((data: any) => {
        this.users = data;
        console.log(data);
      });


    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );



    // this._Mainservice.getallqueue().subscribe((data: any) => {
    //   this.queue = data;
    //   console.log(data);
    // },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.message);
    // });

    this._Mainservice.getallpriority().subscribe((data: any) => {
      this.priority = data;
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });

    // this._Mainservice.getalltasktype().subscribe((data: any) => {
    //   this.tasktypes = data;
    //   console.log(this.tasktypes);
    // });

    this._Mainservice.getrelatedtask(row.id).subscribe((data: any) => {
      console.log(data);
      this.relatedtask = data;
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

    console.log(row.id);
    sidenav.toggle()
  }

  getattachment(event) {

    console.log(event);
    //console.log(event);
    this._Mainservice.getsingletdocument(3408, event).subscribe((data: any) => {
      console.log(data);

      let zip: JSZip = new JSZip();
      zip.file(data.documentType, data.documentContent, { base64: true });

      zip.generateAsync({ type: "blob" }).then(function (content) {
        // see FileSaver.js

        FileSaver.saveAs(content, "example.zip");
      });

      // var zip = new JSZip();
      // zip.file("Hello.txt", "Hello World\n");
      // var img = zip.folder("images");
      // img.file("smile.gif", imgData, { base64: true });
      // zip.generateAsync({ type: "blob" })
      //   .then(function (content) {
      //     // see FileSaver.js
      //     saveAs(content, "example.zip");
      //   });

    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  screenname;

  changestatus(value: string) {
    console.log(value);
    this.Status = value;
  }

  changepriority(value: string) {
    console.log(value);
    this.Priority = value;
  }

  changeuser(value: string) {
    console.log(value);
    this.username = value;
  }

  select(pText: string) {

    this._Mainservice.getsingletaskaction(this.tasktype, this.Status, pText).subscribe((data: any) => {
      console.log(data);
      // this.taskactions = data;
      // this.screenname = data.ScreenName;

      // this.updatestatusfunction();
      //this._Mainservice.myMethod(data);

      if (data.Endpoint) {
        this._Mainservice.dynamicactioncall(this.id,pText,data).subscribe((data: any) => {
          this.tasktypes = data;
          console.log("inside dynamic");
        });

      }
      else {
        // data.ScreenName
        this.getSupervisorList();
      }
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
    console.log(pText);
  }

  getSupervisorList(): void {
    const dialogRef = this.dialog.open(GetSupervisorListComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onFileChanged(event): void {

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {

        this.readThis(event.target.files[i]);
      }
    }
  }

  readThis(inputValue: any): void {
    const file: File = inputValue;
    const myReader1: FileReader = new FileReader();

    myReader1.onload = e => {
      this.fileToUpload.documentName = file.name;
      this.fileToUpload.documentContent = btoa(_.get(e.target, "result"));
      this.fileToUpload.title = "";
      this.fileToUpload.assignedTo = "";
      this.fileToUpload.note = "";
      this.fileToUpload.downloadType = "";
      this.fileToUpload.active = "true";
      this.fileToUpload.fileName = file.name;
      this.fileToUpload.fileSize = file.size;
      this.fileToUpload.fileType = file.type;
      this.fileToUpload.version = "1";
      this.fileToUpload.modifiedDate = new Date();
      this.fileToUpload.createdDate = new Date();

      this.tempObj = {};
      this.tempObj.documentName = this.fileToUpload.documentName;
      this.tempObj.documentContent = this.fileToUpload.documentContent;
      if (!this.filesArr.some((item) => item.documentName == this.tempObj.documentName)) {
        (document.getElementById("myTextareaa") as HTMLInputElement).value += this.fileToUpload.documentName + ", ";
        this.filesArr.push(this.tempObj);
      }
    };
    console.log(this.filesArr)
    myReader1.readAsBinaryString(file);
  }


  callSumarizeAPI() {
    this.onSuccess++;
    //this.loading = false;
    if (this.onSuccess == 1) {
      this.uploadRemaingFiles();
    }
    if (this.onSuccess == this.filesArr.length) {
      this.loading = false;
    }
    if (this.onSuccess == 10) {
      console.log("called SumarizeAPI");
      this.loading = true;
      // this.campaignService.updateBulkPoToBundleAPI().subscribe(
      //   (res: any) => {
      //     this.loading = false;
      //     if (res.body.hasOwnProperty("errorMessage") || res.status != 200) {
      //       console.error(res);
      //       //this.campaignService.toastr.error("Save Failed. Please check console", "FAILED");
      //     } else {
      //       //this.campaignService.toastr.success("Saved Successfully", "SUCCESS");
      //       this.GenerateErrorReoprt()       
      //     }
      //   },
      //   (err) => {
      //     this.loading = false;
      //     console.error(err);
      //     //this.campaignService.toastr.error("Save Failed. Please check console", "FAILED");
      //   });
    }
  }

  uploadRemaingFiles() {
    for (var i = 0; i < this.filesArr.length; i++) {
      let file = this.filesArr[i];
      var name = file.documentName.split(".")[0];
      // if(name != "Tab_Rate_Plan_Group" && name != "Rate_Plan_Grouping"){      
      //   this.campaignService.bulkFileUpload(file).subscribe((data: any) => {
      //     //console.log("DATA = "+data);
      //     this.callSumarizeAPI();
      //   }, (error) => { //Error Block
      //     console.error(error);                
      //     this.callSumarizeAPI();
      //   });
      // }
    }
  }


  // uploadFileToActivity(): void {
  //   this.campaignService.updateBulkPoToBundleAPI().subscribe(
  //     (res: any) => {

  //     },
  //     (err) => {

  //       console.error(err);
  //       //this.campaignService.toastr.error("Save Failed. Please check console", "FAILED");
  //     });
  // }


  Addcomment() {
    let obj = {
      "documentGUID": "",
      "documentName": this.filesArr[0].documentName,
      "tag": "",
      "docType": "",
      "folderId": 3408,
      "departmentClient": "",
      "documentContent": this.filesArr[0].documentContent,
      "folderName": "",
      "path": "",
      "source": "",
      "target": "",
      "status": "",
      "recursive": "",
      "fileName": "",
      "title": "",
      "comment": this.comment,
      "author": this.username,
      "mimeType": "",
      "isEmptyDocument": ""
    }
    this._Mainservice.addcomment(this.id, obj).subscribe((data: any) => {
      console.log("inside");
      console.log(data);
      this.taskNotes.push(obj);
    },
      (error: any) => console.log("error")
    );
    this.comment = "";
  }

  // ************************* hide column *************************************************************
  allColumns = [{ prop: 'id', name: 'Id' },
  { prop: 'name', name: 'Task Name' },
  { prop: 'priority', name: 'Priority' },
  { prop: 'queueId', name: 'Queue Id' },
  { prop: 'errorCode', name: 'Error Code' },
  { prop: 'assignedToUserId', name: 'Assigned To' },
  { prop: 'assignedToGroupId', name: 'Assigned Id' },
  { prop: 'createDate', name: 'Created Date' },
  { prop: 'dueAt', name: 'Due At' },
  { prop: 'status', name: 'Status' }];


  SortType = SortType;

  updatestatusfunction() {
    let obj =
    {
      "id": this.id,
      "description": "",
      "createdBy": ""
    };

    this._Mainservice.updatestatus(obj).subscribe((data: any) => {
      console.log("inside");
      console.log(data);
    },
      (error: any) => console.log("error")
    );
  }

  toggle(col) {
    const isChecked = this.isChecked(col);
    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.prop !== col.prop;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return (
      this.columns.find(c => {
        return c.prop === col.prop;
      }) !== undefined
    );
  }


  // ************************* Calendar code *************************************************************

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',

      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',

      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  screenMode() {
    this.conditionFlag = !this.conditionFlag;
  }

  screenMode1(sidenav: any) {
    this.styleOne = false;
    sidenav.toggle()
    this.conditionFlag = true;
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      // ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  // ************************* Dialogue box *************************************************************

  openDialog(): void {
    const dialogRef = this.dialog.open(Create_taskComponent, {
      width: '1000px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openDialog1(): void {
    const dialogRef = this.dialog.open(Create_taskComponent, {
      width: '1000px',
      data: this.editrow
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  viewname;

  openDialog2(): void {
    const dialogRef = this.dialog.open(CreateViewComponent, {
      width: '250px',
      data: { name: this.viewname }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let obj = {
        "id": "",
        "name": result.name,
        "selectedFilterList": "",
        "userId": "",
        "pagenumber": ""
      }
      console.log(result);
      this.viewslist.push(obj);

    });
  }

  openDialogconfirm(row): void {
    if (row == 0) {
      // let result = this.selected.map(a => a.id);
      const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.Deletebulk();
      });

    }
    else {

      const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
        data: { row }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

        this.removeFile(result.row);

      });
    }
  }

  Deletebulk() {
    let result = this.selected.map(a => a.id);
    console.log(this.rows);
    this._Mainservice.deletetask(result).subscribe(() => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        this.rows = this.rows.filter(book => book.id != result[i]);
      }
      this.toastr.success('Success!');
    });
  }


}
