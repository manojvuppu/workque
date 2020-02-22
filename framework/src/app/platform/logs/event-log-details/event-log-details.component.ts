import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../platform/util/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-log-details',
  templateUrl: './event-log-details.component.html',
  styleUrls: ['./event-log-details.component.css']
})
export class EventLogDetailsComponent implements OnInit {
  @Input() eventReportDetailsData: any;
  @Input() defaultDateTimeFormat: string;
  @Output() viewCurrentStepDetails = new EventEmitter<any>();
  @Output() triggerBack = new EventEmitter<any>();
  private parsedApiRequestObject: any;
  private parsedApiRequestString: string;
  private parsedApiResponseObject: any;
  private parsedApiResponseString: string;
  private childGridData: any;
  private columnDefs: any;
  private context: any;
  private selectedNavMenu: string = 'api-details';

  constructor( private apiService: ApiService, private toastr: ToastrService ) { }

  initGridDetails(){
    this.context = { componentParent: this };
    this.columnDefs = [
      {headerName: 'Step Id', field: 'stepId', sortable: true },
      {headerName: 'Step Name', field: 'stepName', sortable: true },
      {headerName: 'Step Type', field: 'stepType', sortable: true },
      {headerName: 'Event Type', field: 'eventType', sortable: true },
      {headerName: 'Created Date', field: 'eventDate', sortable: true },
      {headerName: 'Message', sortable: false, width: 95 }
    ];
  }

  copied(event: Event, type: string){
    if(event["isSuccess"]) {
      if(type == 'request') this.toastr.success('Request has been copied');
      else if(type == 'response') this.toastr.success('Response has been copied');
    }else{
      this.toastr.error('Copy failed');
    }
  }


  ngOnInit() {
    this.initGridDetails();
    $('.event-report-details-body').find('[href="#rawApiRequest"]').click();
    $('.event-report-details-body').find('[href="#rawApiResponse"]').click();
    const eventReportDetailsData = this.eventReportDetailsData;
    if(eventReportDetailsData.hasOwnProperty("message")){
      const message = eventReportDetailsData.message;
      try{
        this.parsedApiRequestObject = JSON.parse(message);
        this.parsedApiRequestString = JSON.stringify(this.parsedApiRequestObject, null, "   ");
      }catch(e){
        this.parsedApiRequestObject = message;
        this.parsedApiRequestString = this.parsedApiRequestObject;
      }
      this.getChildStepsGridData(eventReportDetailsData);
    }else{
      this.parsedApiRequestString = 'NIL';
    }
    $('.event-report-details-body .event-details-tab-content #rawApiRequest').find('pre').text(this.parsedApiRequestString);
  }

  getChildStepsGridData(data: any){
    this.apiService.invokePlatformApi('/eventLog/childStep/' + data.id, 'GET').subscribe(
      (res: any) => {
        this.childGridData = res.body || [];
        this.updateParsedApiResponseObject();
      },
      (err: any) => console.error(err)
    );
  }

  updateParsedApiResponseObject(){
    let apiResponseIndex = -1;
    this.childGridData.find((eventObj: any, eventIndex: number) => {
      if(eventObj.eventType == "API Response"){
        apiResponseIndex = eventIndex;
        return true;
      } else {
        return false;
      }
    });
    if(apiResponseIndex != -1){
      const apiResponseEventObj: any = this.childGridData.splice(apiResponseIndex, 1)[0];
      this.getEventResponseMessageObject(apiResponseEventObj);
    } else {
      this.parsedApiResponseString = 'NIL';
      this.loadEventResponseMessageContainer();
    }
  }

  getEventResponseMessageObject(apiResponseEventObj: any){
    const eventId = apiResponseEventObj.id;
    if(eventId){
      this.apiService.loaderShow('loader', ' Loading response details...');
      this.apiService.invokePlatformApi('/eventLog/' + eventId, 'GET').subscribe(
        (res: any) => {
          const respData = res.body || [];
          if(respData.hasOwnProperty("message")){
            const message = respData.message;
            try{
              this.parsedApiResponseObject = JSON.parse(message);
              this.parsedApiResponseString = JSON.stringify(this.parsedApiResponseObject, null, "   ");
            }catch(e){
              this.parsedApiResponseObject = message;
              this.parsedApiResponseString = this.parsedApiResponseObject;
            }
          }else{
            this.parsedApiResponseString = 'NIL';
          }
          this.loadEventResponseMessageContainer();
        },
        (err: any) => console.error(err)
      );
    }
  }

  loadEventResponseMessageContainer(){
    $('.event-report-details-body .event-details-tab-content #rawApiResponse').find('pre').text(this.parsedApiResponseString);
    this.apiService.loaderHide('loader');
  }

  getRowData(rowData: any){
    this.viewCurrentStepDetails.emit(rowData);
  }

  triggerBackScreen(){
    this.triggerBack.emit('event-log-details');
  }

}
