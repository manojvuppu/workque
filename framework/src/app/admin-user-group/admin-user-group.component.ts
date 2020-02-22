import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Create_lifecycleComponent } from '../create_lifecycle/create_lifecycle.component';
import { MainService } from '../services/main.service';

import { ColumnMode, SortType, SelectionType } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { CreateadminUserGroupComponent } from '../createadmin-user-group/createadmin-user-group.component';
import { CreateUserGroupsComponent } from '../create-user-groups/create-user-groups.component';
import { CreateUserRolesComponent } from '../create-user-roles/create-user-roles.component';
import { CreateUserProfilesComponent } from '../create-user-profiles/create-user-profiles.component';
import { CreateUserAccessComponent } from '../create-user-access/create-user-access.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-user-group',
  templateUrl: './admin-user-group.component.html',
  styleUrls: ['./admin-user-group.component.css']
})
export class AdminUserGroupComponent implements OnInit {
  rows = [];
  columns = []
  selected = [];
  temp = [];

  rows1 = [];
  columns1 = []
  selected1 = [];
  temp1 = [];

  rows2 = [];
  columns2 = []
  selected2 = [];
  temp2 = [];

  rows3 = [];
  columns3 = []
  selected3 = [];
  temp3 = [];

  rows4 = [];
  columns4 = []
  selected4 = [];
  temp4 = [];

  name = 'Ngx Datatables Filter All Columns';

  ColumnMode = ColumnMode;
  SortType = SortType;
  SelectionType = SelectionType;

  @ViewChild('buttonsTemplate', { static: true }) buttonsTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('search', { static: false }) search: any;

  constructor(private toastr: ToastrService, private _Mainservice: MainService, public dialog: MatDialog) { }

  ngOnInit() {
    this._Mainservice.getalluser().subscribe((data: any) => {
      this.temp = [...data];
      this.rows = data;
      // console.log(data);
    });

    this._Mainservice.getallusergroup().subscribe((data: any) => {
      this.temp1 = [...data];
      this.rows1 = data;
      // console.log(data);
    });

    this._Mainservice.getalluserrole().subscribe((data: any) => {
      this.temp2 = [...data];
      this.rows2 = data;
      // console.log(data);
    });

     this._Mainservice.getallaccessset().subscribe((data: any) => {
      this.temp3 = [...data];
      this.rows3 = data;
      // console.log(data);
    });

    this._Mainservice.getallprofile().subscribe((data: any) => {
      this.temp4 = [...data];
      this.rows4 = data;
      console.log(data);
    });


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
      { prop: 'name', name: 'Name', canAutoResize: true, resizable: false },
      { prop: 'description', name: 'Description', canAutoResize: true, resizable: false },
      { prop: 'email', name: 'Email', canAutoResize: true, resizable: false },
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
      { prop: 'name', name: 'Name', canAutoResize: true, resizable: false },
      { prop: 'userList', name: 'Users', canAutoResize: true, resizable: false },
      { prop: 'description', name: 'Description', canAutoResize: true, resizable: false },
      { prop: 'actions', name: 'Actions', canAutoResize: true, resizable: false, cellTemplate: this.buttonsTemplate }
    ];



    this.columns2 = [
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
        prop: 'roleId',
        canAutoResize: false,
        resizable: false
      },
      { prop: 'roleName', name: 'Name', canAutoResize: true, resizable: false },
      { prop: 'description', name: 'Description', canAutoResize: true, resizable: false },
      { prop: 'createdBy', name: 'Created by', canAutoResize: true, resizable: false },
      { prop: 'actions', name: 'Actions', canAutoResize: true, resizable: false, cellTemplate: this.buttonsTemplate }
    ];


    this.columns3 = [
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
        prop: 'accessSetId',
        canAutoResize: false,
        resizable: false
      },
      { prop: 'name', name: 'Name', canAutoResize: true, resizable: false },
      { prop: 'description', name: 'Description', canAutoResize: true, resizable: false },
      { prop: 'createdBy', name: 'Created by', canAutoResize: true, resizable: false },
      { prop: 'actions', name: 'Actions', canAutoResize: true, resizable: false, cellTemplate: this.buttonsTemplate }
    ];

    this.columns4 = [
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
      
      { prop: 'profileId', name: 'ID', canAutoResize: true, resizable: false },
      { prop: 'profileName', name: 'Profile Name', canAutoResize: true, resizable: false },
      { prop: 'description', name: 'Description', canAutoResize: true, resizable: false },
      { prop: 'actions', name: 'Actions', canAutoResize: true, resizable: false, cellTemplate: this.buttonsTemplate }
    ];


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

    // Whenever the filter changes, always go back to the first page
    // this.table.offset = 0;
  }

  removeFile(row) {

    console.log("user id is below");

    console.log(row);

    this._Mainservice.deleteuser(row).subscribe(() => {
      this.rows = this.rows.filter(book => book.id != row);
      console.log("deleted");
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        this.toastr.error('Error!');
      });
  }

  Deletebulk() {
    let result = this.selected.map(a => a.id);
    console.log(this.rows);
    this._Mainservice.deleteuser(result).subscribe(() => {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        this.rows = this.rows.filter(book => book.id != result[i]);
      }
      this.toastr.success('Success!');
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
        this.toastr.error('Error!');
      });
  }


  updateFilter1(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.queueName.toLowerCase().indexOf(val) !== -1 || !val;

    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


  onSelect({ selected }) {
    console.log('Select Event', selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }


  openDialog(row): void {
    console.log("enter")
    console.log(row)
    const dialogRef = this.dialog.open(CreateadminUserGroupComponent, {
      width: '900px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog1(): void {
    console.log("enter")

    const dialogRef = this.dialog.open(CreateadminUserGroupComponent, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  openDialog2(row): void {
    console.log("enter")
    console.log(row)
    const dialogRef = this.dialog.open(CreateUserGroupsComponent, {
      width: '900px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog3(): void {
    console.log("enter")

    const dialogRef = this.dialog.open(CreateUserGroupsComponent, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }



  openDialog4(row): void {
    console.log("enter")
    console.log(row)
    const dialogRef = this.dialog.open(CreateUserRolesComponent, {
      width: '900px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog5(): void {
    console.log("enter")

    const dialogRef = this.dialog.open(CreateUserRolesComponent, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  openDialog6(row): void {
    console.log("enter")
    console.log(row)
    const dialogRef = this.dialog.open(CreateUserProfilesComponent, {
      width: '900px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog7(): void {
    console.log("enter")

    const dialogRef = this.dialog.open(CreateUserProfilesComponent, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog8(row): void {
    console.log("enter")
    console.log(row)
    const dialogRef = this.dialog.open(CreateUserAccessComponent, {
      width: '900px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog9(): void {
    console.log("enter")

    const dialogRef = this.dialog.open(CreateUserAccessComponent, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


}
