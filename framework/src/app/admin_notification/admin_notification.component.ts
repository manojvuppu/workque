import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Create_lifecycleComponent } from '../create_lifecycle/create_lifecycle.component';
import { MainService } from '../services/main.service';

import { ColumnMode, SortType, SelectionType } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Create_notificationComponent } from '../create_notification/create_notification.component';
import { Create_notification_templateComponent } from '../create_notification_template/create_notification_template.component';

@Component({
  selector: 'app-admin_notification',
  templateUrl: './admin_notification.component.html',
  styleUrls: ['./admin_notification.component.css']
})
export class Admin_notificationComponent implements OnInit {


events = [];


  rows = [];
  columns = []
  selected = [];
  temp = [];

  rows1 = [];
  columns1 = []
  selected1 = [];
  temp1 = [];
  // name = 'Ngx Datatables Filter All Columns';

  ColumnMode = ColumnMode;
  SortType = SortType;
  SelectionType = SelectionType;

  @ViewChild('buttonsTemplate', { static: true }) buttonsTemplate: TemplateRef<any>;
  @ViewChild('buttonsTemplate1', { static: true }) buttonsTemplate1: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('search', { static: false }) search: any;

  constructor(private toastr: ToastrService, private _Mainservice: MainService, public dialog: MatDialog) { }

  ngOnInit() {


    this._Mainservice.getallnotification().subscribe((data: any) => {
      // this.temp1 = [...data];
      // this.rows1 = data;
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );


    this._Mainservice.getalltemplate().subscribe((data: any) => {
      // this.temp2 = [...data];
      this.rows1 = data._embedded.messageTemplates;
      console.log(data);
      this. events = data._embedded.messageTemplates;
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );

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
      {
        prop: 'userId',
        name: 'Id',
        canAutoResize: false,
        resizable: false
      },
      { prop: 'name', name: 'Notification', canAutoResize: true, resizable: false },
      { prop: 'actions', name: 'Actions', canAutoResize: true, resizable: false, cellTemplate: this.buttonsTemplate }
    ];


    this.columns1 = [
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
      {
        prop: 'id',
        name: 'Id',
        canAutoResize: false,
        resizable: false
      },
      { prop: 'bodyFile', name: 'Template', canAutoResize: true, resizable: false },
      { prop: 'enabled', name: 'Status', canAutoResize: true, resizable: false },
      { prop: 'actions', name: 'Actions', canAutoResize: true, resizable: false, cellTemplate: this.buttonsTemplate1 }
    ];

  }


  removeFile(row) {
    console.log(row);

    this._Mainservice.deletequeue(row).subscribe(() => {
      this.rows1 = this.rows1.filter(book => book.id != row);
      console.log("deleted");
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        this.toastr.error('Error!');
      });
  }


  onSelect({ selected }) {
    console.log('Select Event', selected);

    this.selected1.splice(0, this.selected1.length);
    this.selected1.push(...selected);
  }


  Deletebulk() {
    let result = this.selected1.map(a => a.id);
    console.log(this.rows1);
    this._Mainservice.deletequeue(result).subscribe(() => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        this.rows1 = this.rows1.filter(book => book.id != result[i]);
      }
      this.toastr.success('Success!');
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        this.toastr.error('Error!');
      });
  }

  openDialog1(): void {
    console.log("enter")
    const dialogRef = this.dialog.open(Create_notificationComponent, {
    width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  openDialog2(row): void {
    console.log("enter")

    const dialogRef = this.dialog.open(Create_notification_templateComponent, {
      width: '900px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}