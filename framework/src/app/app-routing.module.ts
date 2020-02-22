import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomRouterHandlerComponent } from './platform/custom-router-handler/custom-router-handler.component';
import { EventLogReportComponent } from './platform/logs/event-log-report/event-log-report.component';
import { TransactionLogReportComponent } from './platform/logs/transaction-log-report/transaction-log-report.component';
import { PageNotFoundComponent } from './platform/page-not-found/page-not-found.component';
/* Component Import Starts */
import { MytaskComponent } from './mytask/mytask.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkQueueComponent } from './work-queue/work-queue.component';
import { Admin_queuesComponent } from './admin_queues/admin_queues.component';
import { Admin_assignment_ruleComponent } from './admin_assignment_rule/admin_assignment_rule.component';
import { Admin_task_typeComponent } from './admin_task_type/admin_task_type.component';
import { Admin_customizeComponent } from './admin_customize/admin_customize.component';
import { User_profileComponent } from './user_profile/user_profile.component';
import { Admin_notificationComponent } from './admin_notification/admin_notification.component';
import { Admin_lifecycleComponent } from './admin_lifecycle/admin_lifecycle.component';
import { AdminUserGroupComponent } from './admin-user-group/admin-user-group.component';


// import { RouterGaurdService as RouterGaurd } from './platform/auth0/router-gaurd.service';

/* Component Import Ends */

const appRoutes: Routes = [
	
	/* Component Routes Starts */
	{ path: 'mytask', component: MytaskComponent },
	
	/* Component Routes Ends */

	{
		path: "",
		component: MytaskComponent,
	},

	{ path: 'index.html', component: CustomRouterHandlerComponent },
	{ path: 'eventLogs', component: EventLogReportComponent },
	{ path: 'transactionLog', component: TransactionLogReportComponent },
	{ path: 'mytask', component: MytaskComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'work-queue', component: WorkQueueComponent },
	{ path: 'adminqueues', component: Admin_queuesComponent },
	{ path: 'adminassignmentrule', component: Admin_assignment_ruleComponent },
	{ path: 'admintasttype', component: Admin_task_typeComponent },
	{ path: 'admincustomize', component: Admin_customizeComponent },
	{ path: 'userprofile', component: User_profileComponent },
	{ path: 'adminnotification', component: Admin_notificationComponent },
	{ path: 'adminlifecycle', component: Admin_lifecycleComponent },
	{ path: 'usergroup', component: AdminUserGroupComponent },
	{ path: '**', component: PageNotFoundComponent }
	
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
