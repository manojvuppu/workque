import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AgGridModule } from 'ag-grid-angular';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ClipboardModule } from 'ngx-clipboard';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { EventLogReportComponent } from './event-log-report/event-log-report.component';
import { EventLogTableComponent } from './event-log-table/event-log-table.component';
import { EventLogDetailsComponent } from './event-log-details/event-log-details.component';
import { EventLogActionsComponent } from './actions/event-log-actions.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { TransactionLogReportComponent } from './transaction-log-report/transaction-log-report.component';
import { TransactionLogTableComponent } from './transaction-log-table/transaction-log-table.component';
import { TransactionLogDetailsComponent } from './transaction-log-details/transaction-log-details.component';



@NgModule({
  declarations: [EventLogReportComponent, EventLogTableComponent, EventLogDetailsComponent, EventLogActionsComponent, DataGridComponent, TransactionLogReportComponent, TransactionLogTableComponent, TransactionLogDetailsComponent],
  imports: [
    FormsModule,
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    AgGridModule.withComponents([]),
    NgxJsonViewerModule,
    ClipboardModule,
    AngularDateTimePickerModule
  ],
  entryComponents: [EventLogActionsComponent, DataGridComponent]
})
export class LogsModule { }
