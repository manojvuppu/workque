import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

/* Widget External plug-in Import Starts */
/* Widget External plug-in Import Ends */

import { AppRoutingModule } from './app-routing.module';
import { LogsModule } from './platform/logs/logs.module';
import { AppComponent } from './app.component';
import { CustomRouterHandlerComponent } from './platform/custom-router-handler/custom-router-handler.component';
import { PageNotFoundComponent } from './platform/page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from "./shared/shared.module";
import { LeftMenuComponent } from './app-main/left-menu/left-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavService } from './services/sidenav.service';
import { HeaderNewComponent } from './app-main/header-new/header-new.component';

/* Component Import Starts */

import { MytaskComponent } from './mytask/mytask.component';
import { DashboardComponent, DialogOverviewExampleDialog, DialogOverviewExampleDialog1 } from './dashboard/dashboard.component';
import { WorkQueueComponent } from './work-queue/work-queue.component';
import { Admin_queuesComponent } from './admin_queues/admin_queues.component';
import { Admin_assignment_ruleComponent } from './admin_assignment_rule/admin_assignment_rule.component';
import { Admin_task_typeComponent } from './admin_task_type/admin_task_type.component';
import { Create_taskComponent } from './create_task/create_task.component';
import { Create_queueComponent } from './create_queue/create_queue.component';
import { Create_task_assignment_ruleComponent } from './create_task_assignment_rule/create_task_assignment_rule.component';
import { Create_task_typeComponent } from './create_task_type/create_task_type.component';
import { Admin_customizeComponent } from './admin_customize/admin_customize.component';
import { User_profileComponent } from './user_profile/user_profile.component';
import { Admin_notificationComponent } from './admin_notification/admin_notification.component';
import { Admin_lifecycleComponent } from './admin_lifecycle/admin_lifecycle.component';

import { Create_lifecycleComponent } from './create_lifecycle/create_lifecycle.component';
import { Create_notificationComponent } from './create_notification/create_notification.component';
import { Create_notification_templateComponent } from './create_notification_template/create_notification_template.component';
/* Component Import Ends */

/* Widget Import Starts */
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ColorPickerModule } from 'ngx-color-picker';

import { PieChartComponent } from './pie-chart/pie-chart.component';

import { Interceptor } from "./Interceptor/interceptor";

import {MainService} from './services/main.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MytasksTableComponent } from './dashboard/mytasks-table/mytasks-table.component';
import { CreatedVsResolvedQueueComponent } from './dashboard/created-vs-resolved-queue/created-vs-resolved-queue.component';
import { NumberOfTaskUsersComponent } from './dashboard/number-of-task-users/number-of-task-users.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CreateViewComponent } from './create-view/create-view.component';
import { TasksByDuedateComponent } from './dashboard/tasks-by-duedate/tasks-by-duedate.component';
import { AdminUserGroupComponent } from './admin-user-group/admin-user-group.component';
import { CreateadminUserGroupComponent } from './createadmin-user-group/createadmin-user-group.component';
import { CreateUserGroupsComponent } from './create-user-groups/create-user-groups.component';
import { CreateUserRolesComponent } from './create-user-roles/create-user-roles.component';
import { CreateUserProfilesComponent } from './create-user-profiles/create-user-profiles.component';
import { CreateUserAccessComponent } from './create-user-access/create-user-access.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { NgxLoadingModule } from 'ngx-loading';
import { GetSupervisorListComponent } from './get-supervisor-list/get-supervisor-list.component';
import { CreatAdminCustomizeComponent } from './creat-admin-customize/creat-admin-customize.component';
import { DatePipe } from '@angular/common';
import { View_lifecycleComponent } from './view_lifecycle/view_lifecycle.component';

import { NgxGraphModule } from '@swimlane/ngx-graph';
/* Widget Import Ends */

@NgModule({
  declarations: [
  	AppComponent,
    HeaderComponent,
  
	/* Component NgModule Declarations Starts */
	/* Component NgModule Declarations Ends */
	
	/* Widget NgModule Declarations Starts */
	/* Widget NgModule Declarations Ends */
	
	CustomRouterHandlerComponent,
    PageNotFoundComponent,

    MytaskComponent,

    LeftMenuComponent,
    HeaderComponent,
    HeaderNewComponent,
    DashboardComponent,
    WorkQueueComponent,
    Admin_queuesComponent,
    Admin_assignment_ruleComponent,
    Admin_task_typeComponent,
    Create_taskComponent,
    Create_queueComponent,
    Create_task_assignment_ruleComponent,
    Create_task_typeComponent,

    Admin_customizeComponent,
    User_profileComponent,
    PieChartComponent,
    Admin_notificationComponent,
    Admin_lifecycleComponent,
    Create_lifecycleComponent,
    Create_notificationComponent,
    Create_notification_templateComponent,
    MytasksTableComponent,
    CreatedVsResolvedQueueComponent,
    NumberOfTaskUsersComponent,
    CreateViewComponent,
    TasksByDuedateComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog1,
    AdminUserGroupComponent,
    CreateadminUserGroupComponent,
    CreateUserGroupsComponent,
    CreateUserRolesComponent,
    CreateUserProfilesComponent,
    CreateUserAccessComponent,
    ConfirmationPopupComponent,
    GetSupervisorListComponent,
    CreatAdminCustomizeComponent,
    View_lifecycleComponent

  ],
  entryComponents: [
		Create_taskComponent,
    Create_queueComponent,
    Create_task_assignment_ruleComponent,
    Create_task_typeComponent,
    User_profileComponent,
    Create_lifecycleComponent,
    Create_notificationComponent,
    Create_notification_templateComponent,
    CreateViewComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialog1,
    CreateadminUserGroupComponent,
    CreateUserGroupsComponent,
    CreateUserRolesComponent,
    CreateUserProfilesComponent,
    CreateUserAccessComponent,
    ConfirmationPopupComponent,
    GetSupervisorListComponent,
    CreatAdminCustomizeComponent,
    View_lifecycleComponent
	],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    LogsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgxGraphModule,
  
    
	/* Widget NgModule Imports Starts */
	/* Widget NgModule Imports Ends */
	
    HttpClientModule,
    ToastrModule.forRoot({closeButton: true}),
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule,
    NgbModalModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    FlatpickrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ColorPickerModule,
    NgxDatatableModule,
    NgxChartsModule
  ],
  providers: [
    DatePipe,
    SidenavService,
    MainService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  	/* Widget NgModule Providers Starts */
  	/* Widget NgModule Providers Ends */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
