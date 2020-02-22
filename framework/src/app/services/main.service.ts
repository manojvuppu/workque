import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { UtilService } from '../widgets/platform/util.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})

export class MainService {

   myMethod$: Observable<any>;
    private myMethodSubject = new Subject<any>();

  constructor(public toastr: ToastrService, private utilService: UtilService, private httpClient: HttpClient) { 
     this.myMethod$ = this.myMethodSubject.asObservable();
  }
  message;
    myMethod(data) {
        console.log(data); // I have data! Let's return it so subscribers can use it!
        // we can do stuff with data if we want
        //this.myMethodSubject.next(data);
       
       // this.dynamicactioncall(data);
    }

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.message = message;
    this.messageSource.next(message)
  }

  invokeFirstComponentFunction = new EventEmitter();
  subsVar: Subscription;

  onFirstComponentButtonClick(id) {
    this.invokeFirstComponentFunction.emit(id);
  }


  dynamicactioncall(taskid,action,data): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${taskid}/${action}/${data.Endpoint}`);
  }

  // ****************************** My Task API *********************************************/

  getalltasks(assignedToUserId): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${assignedToUserId}/getAll`);
  }


  //delete method for Task
  deletetask(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.delete<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${id}/deletetask`);
  }

  //post method for Task
  createtask(obj: any): Observable<any> {
    return this.httpClient.post<any>("https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/create", obj);
  }


  //put method for create Task
  updatetask(obj: any): Observable<any> {
    return this.httpClient.patch<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${obj.id}/updatetaskaudit`), obj);
  }

  //Put method for assign task
  assigntask(ids: any, obj: any): Observable<any> {
    return this.httpClient.put<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${ids}/bulkAssign`), obj);
  }

  //Get method for users in create
  getusers(Queuempid, assignedToUserId): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/queuemp/${Queuempid}/${assignedToUserId}/getassigneelist`);
  }

  //Get method for users in create
  gettaskextension(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasktype/${id}/getvalue`);
  }

  //Get method for users in create
  gettaskdetailsattribute(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/getAllAttributes`);
  }


  //Get method for task status dropdown values in create task
  getstatus(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/getAllNextState");
  }



  //Get method for views
  getviews(userid): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/viewfilter/${userid}/get`);
  }

  //Get method for filter
  getfilter(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/viewfilter/getAllFilter");
  }

  //post method for Task
  createview(obj: any): Observable<any> {
    return this.httpClient.post<any>("https://bonito.apptium.com/router/mp/apiwq/action/api/viewfilter/create", obj);
  }

  //post method for Task
  Export(obj: any): Observable<any> {
    return this.httpClient.post<any>("https://bonito.apptium.com/router/mp/apiwq/action/api/document/convert", obj);
  }


  // ****************************** Task Details API *********************************************/

  //Get method for get single task
  getsingletask(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${id}/get`);
  }


  getsingletdocument(docid, fileid): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/document/${docid}/${fileid}/get`);
  }



  //Get method for all comments
  getrelatedtask(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${id}/relatedTaskGetAll`);
  }

  //put method for create Task
  addcomment(id, obj: any): Observable<any> {
    return this.httpClient.post<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/document/${id}/create`), obj);
  }


  //put method for create Task
  updatestatus(obj: any): Observable<any> {
    return this.httpClient.patch<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/updateStatus/${obj.id}/complete`), obj);
  }

  //Get method for all comments
  getallpriority(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/taskpriority/getAll`);
  }

  //Get method for next status
  getnextstatus(tasktype, status): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${tasktype}/${status}/nextState`);
  }

  //Get method for all comments
  getalltaskaction(tasktype, status): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${tasktype}/${status}/actionsDisplay`);
  }

  //Get method for all comments
  getsingletaskaction(tasktype, status, action): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${tasktype}/${status}/${action}/ExecuteAPI`);
  }

  // ****************************** work Queue API *********************************************/

  //Get all method for admin queue
  getqueuelist(assignedToUserId): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${assignedToUserId}/getListofWorkQUeues`);
  }

  //Get all method for admin queue
  getallworkqueue(queueId,assignedToUserId): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/getall/${queueId}/${assignedToUserId}/Tasks`);
  }

  // ****************************** admin Queue API *********************************************/

  //Get all method for admin queue
  getallqueue(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/queuemp/getall");
  }

  //delete method for admin queue
  deletequeue(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.delete<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/queuemp/${id}/delete`);
  }

  //post method for create life cycle 
  createqueueeurl = "https://bonito.apptium.com/router/mp/apiwq/action/api/queuemp/create ";
  createqueue(obj: any): Observable<any> {
    return this.httpClient.post<any>(`${this.createqueueeurl}`, obj);
  }

  //put method for create life cycle 
  updatequeue(obj: any): Observable<any> {
    return this.httpClient.patch<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/queuemp/${obj.id}/update`), obj);
  }

  //admin assignmentrule API ///////////////////////////////////////////////////////////////////////////////////
  //Get all method for admin queue
  getallassignmentrule(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/taskassignmentrulesmp/getall");
  }

  //delete method for admin queue
  deleteassignmentrule(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.delete<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/taskassignmentrulesmp/${id}/delete`);
  }

  //post method for create life cycle 
  createassignmentrule(obj: any): Observable<any> {
    return this.httpClient.post<any>("https://bonito.apptium.com/router/mp/apiwq/action/api/taskassignmentrulesmp/create", obj);
  }

  //put method for create life cycle 
  updateassignmentrule(id,obj: any): Observable<any> {
    return this.httpClient.put<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/taskassignmentrulesmp/${id}/update`), obj);
  }


  //admin Task Type API ///////////////////////////////////////////////////////////////////////////////////
  getalltasktype(queueid): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasktype/${queueid}/getall `);
  }

    //admin Task Type API ///////////////////////////////////////////////////////////////////////////////////
  getalltasktypeadmin(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/taskType/getAll `);
  }

  getsingletasktype(Queuempid): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasktype/${Queuempid}/getall`);
  }


  deletetasktype(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.delete<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/taskType/${id}/delete`);
  }


  //post method for create task type
  createtasktypeurl = "https://bonito.apptium.com/router/mp/apiwq/action/api/taskType/create ";
  createtasktype(tasktypecreate: any): Observable<any> {
    return this.httpClient.post<any>(`${this.createtasktypeurl}`, tasktypecreate);
  }

  //put method for create life cycle 
  updatetasktype(obj: any): Observable<any> {
    return this.httpClient.patch<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/taskType/${obj.id}/update`), obj);
  }





  //admin life cycle API ///////////////////////////////////////////////////////////////////////////////////
  getalllifecycle(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/translifecycle/getAll");
  }

  //delete method for create life cycle 
  deletelifecycle(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.delete<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/translifecycle/${id}/delete`);
  }

  //post method for create life cycle 
  createlifecycleurl = "https://bonito.apptium.com/router/mp/apiwq/action/api/translifecycle/createState";
  createlifecycle(lifecyclecreate: any): Observable<any> {
    return this.httpClient.post<any>(`${this.createlifecycleurl}`, lifecyclecreate);
  }

  //put method for create life cycle 
  
  updatelifecycle(id, lifecycleupdate: any): Observable<any> {
      return this.httpClient.put<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/translifecycle/${id}/update`), lifecycleupdate);
  }



  //admin life cycle API ///////////////////////////////////////////////////////////////////////////////////
//get all user group
getalluser(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/user/getAll");
  }

 //delete method for create life cycle 
  // deleteuser(id): Observable<any> {
  //   // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
  //   return this.httpClient.delete<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/user/Delete`);
  // }

 //create method for create life cycle 
  createuserurl = "https://bonito.apptium.com/router/mp/apiwq/action/api/user/post";
  createuser(lifecyclecreate: any): Observable<any> {
    return this.httpClient.post<any>(`${this.createuserurl}`, lifecyclecreate);
  }
  //update user

  updateUser(id, lifecycleupdate: any): Observable<any> {  
    return this.httpClient.put<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/user/${id}/update`), lifecycleupdate);
  }

  //delete user



  deleteuser(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.delete<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/user/${id}/Delete`);
  }

  
  

 getallusergroup(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/usergroups/getAllUserGroup");
  }

  //create method for create life cycle 
  createusergroupurl = "https://bonito.apptium.com/router/mp/apiwq/action/api/usergroups/create";
  createusergroup(usergroup: any): Observable<any> {
    return this.httpClient.post<any>(`${this.createusergroupurl}`, usergroup);
  }

  getalluserrole(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/role/getroles");
  }

  getallaccessset(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/accessset/get");
  }
  getallprofile(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/profile/getprofile");
  }



  // Dashboard API
  // Get Tasks by Status

  getAllTaskByStatus(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${id}/getAllStatusCount`);
  }

  getcompletedTasks(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/${id}/completedTasksByMonth`);
  }

  getMyTasksToday(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/getall/${id}/tasksToday`);
  }

  getCreatedVsResolvedByQueue(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/get/CreatedvsresolvedByQueue");
  }

  getTaskCount(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/getcount");
  }



  getTaskByDuedate(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/tasks/duedate/get");
  }

  getTaskevents(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/events");
  }

  /* customized Widget */
  //Get all widgets details
  getallwidgets(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/taskwidgets/getAll`);
  }
  // delete widget
  //delete method for Task
  deletewidget(id): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.delete<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/taskwidgets/${id}/deleteTaskWidgets`);
  }
   //post method for create widget 
   createwidget(widgetcreate: any): Observable<any> {
     return this.httpClient.post<any>(`https://bonito.apptium.com/router/mp/apiwq/action/api/taskwidgets/create`, widgetcreate);
   }
   
  //put method for update life cycle 
  
  updatewidget(widgetupdate: any): Observable<any> {
    return this.httpClient.post<any>((`https://bonito.apptium.com/router/mp/apiwq/action/api/translifecycle//taskwidgets/update`), widgetupdate);
  }

  getAttrWidget() : Observable<any> {
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/viewfilter/getAllTaskWidgets`);
  }


  // ****************************** admin Notification API *********************************************/

  //Get all method for admin queue
  getallnotification(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/notificationHistory");
  }


 getalltemplate(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/templates");
  }


 getalltasktypesdropdown(): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>("https://bonito.apptium.com/router/mp/apiwq/action/api/taskType/getAll");
  }

  getassigneuserdropdown(TaskTypeId,assignedToUserId): Observable<any> {
    // return this.utilService.invokeAPI("/getHomePageDetails", "GET", null, null, this.appname);
    return this.httpClient.get<any[]>(`https://bonito.apptium.com/router/mp/apiwq/action/api/TaskType/${TaskTypeId}/${assignedToUserId}/NotificationAssigneeUserList`);
  }




  //post method for create life cycle 
  createtemplateurl = "https://bonito.apptium.com/router/template";
  createtemplate(obj: any): Observable<any> {
    return this.httpClient.post<any>(`${this.createtemplateurl}`, obj);
  }

  //put method for create life cycle 
  updatetemplate(obj: any): Observable<any> {
    return this.httpClient.post<any>((`https://bonito.apptium.com/router/template`), obj);
  }

}