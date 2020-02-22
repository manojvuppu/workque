import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Create_queueComponent } from '../create_queue/create_queue.component';
import { ConfirmationPopupComponent } from '../confirmation-popup/confirmation-popup.component';

import { MainService } from '../services/main.service';
import { ColumnMode, SortType, SelectionType } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { HttpErrorResponse } from '@angular/common/http';

import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   errorcode: number;
//   assigned: string;
//   Due: string;
// }

// export interface DialogData {

//   animal: string;
//   name: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', errorcode: 21, assigned: 'Pratish', Due: '29/10/2019' },
// ];

@Component({
  selector: 'app-admin_queues',
  templateUrl: './admin_queues.component.html',
  styleUrls: ['./admin_queues.component.css']
})

export class Admin_queuesComponent implements OnInit {
  //datasource:  MatTableDataSource<any>;
  rows = [];
  columns = []
  selected = [];
  temp = [];
  //name = 'Ngx Datatables Filter All Columns';

  ColumnMode = ColumnMode;
  SortType = SortType;
  SelectionType = SelectionType;
  // selectedLevel = "name";

  // displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'errorcode', 'status', 'Actions'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // selection = new SelectionModel<PeriodicElement>(true, []);

  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild('buttonsTemplate', { static: true }) buttonsTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  @ViewChild('search', { static: false }) search: any;

  constructor(private toastr: ToastrService, private _Mainservice: MainService, public dialog: MatDialog, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef) { }

  ngOnInit() {
    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
    
    this._Mainservice.getallqueue().subscribe((data: any) => {
      this.temp = [...data];
      this.rows = data;
      console.log(data);
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
        prop: 'id',
        canAutoResize: false,
        resizable: false
      },
      { prop: 'queueName', name: 'Name', canAutoResize: true, resizable: false },
      { prop: 'queueDescription', name: 'Description', canAutoResize: true, resizable: false },
      { prop: 'userGroup', name: 'User Group', canAutoResize: true, resizable: false },
      { prop: 'queueSLANoOfUnits', name: 'SLA', canAutoResize: true, resizable: false },
      { prop: 'actions', name: 'Actions', canAutoResize: true, resizable: false, cellTemplate: this.buttonsTemplate }
    ];
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
    console.log(row);

    this._Mainservice.deletequeue(row).subscribe(() => {
      this.rows = this.rows.filter(book => book.id != row);
      console.log("deleted");
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


   Deletebulk() {
    let result = this.selected.map(a => a.id);
    console.log(this.rows);
    this._Mainservice.deletequeue(result).subscribe(() => {
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
        this.selected = [];
  }

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  openDialog(row): void {
    console.log("enter")
    console.log(row)
    const dialogRef = this.dialog.open(Create_queueComponent, {
      width: '600px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openDialog1(): void {
    console.log("enter")

    const dialogRef = this.dialog.open(Create_queueComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.animal = result;
      this.rows.push(result);
      this.rows = [...this.rows]
      
      // let obj = []
      // obj = this.rows;
      // obj.push(result);
      // this.rows = [];
      // this.rows = obj;
    });
  }

  // applyFilter(filterValue: string) {
  //   const tableFilters = [];
  //   tableFilters.push({
  //     id: this.selectedLevel,
  //     value: filterValue
  //   });

  //   this.dataSource.filter = JSON.stringify(tableFilters);
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // datasourcelist(data){
  //  // this.dataSource  = new MatTableDataSource(data);
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.filterPredicate = 
  //   (data: any, filtersJson: string) => {
  //     // console.log("data", data);

  //       const matchFilter = [];
  //       const filters = JSON.parse(filtersJson);

  //       filters.forEach(filter => {
  //         var val = data[filter.id] === null ? '' : data[filter.id];
  //         if(val == undefined){
  //           val = "";
  //         }
  //         matchFilter.push(val.toString().toLowerCase().includes(filter.value.toLowerCase()));

  //       });
  //       return matchFilter.every(Boolean);
  //     };
  // }

}