import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { AppModelService } from './app-model.service';

import { ToastrService } from 'ngx-toastr';

import dataMapping from './data-mapping.json';
import mockData from './mock-data.json';
import mapReference from './map-reference.json';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  accountName: string;
  appName: string;
  taskName: string;
  userTaskId: string;
  portalURL: string;
  serviceURL: string;
  apiPrefixURL: string;
  isInsideUIStudio: boolean;
  isTaskLevel: boolean = false;

  constructor(private http: HttpClient, private AppModel: AppModelService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    const pathSplittedArray = location.pathname.split( '/' );
    this.accountName = pathSplittedArray[1];
    let userTaskId = pathSplittedArray[2];
    try {
      let decodeAppTask = atob(userTaskId).split("#");
      if (decodeAppTask.length == 3) {
        this.isTaskLevel = true;
        this.appName = decodeAppTask[1];
        this.taskName = decodeAppTask[2];
        this.userTaskId = userTaskId;
      } else {
        this.appName = userTaskId;
      }
    } catch (error) {
      this.appName = userTaskId
    }
    this.portalURL = `${environment.portalURL}`;
    this.serviceURL = `${environment.serviceURL}`;
    this.apiPrefixURL = this.serviceURL + '/' + this.accountName + '/' + (this.isTaskLevel ? this.userTaskId : this.appName) + '/action/api';
    this.isInsideUIStudio = self != top;
    if (this.isInsideUIStudio) {
    	Object.keys(mockData).forEach((key) => {
    		this.AppModel[key] = mockData[key];
    	});
    } else {
      
    }
  }

  public init(componentName: string){
    this.execute({mapId: 'page-ready', type: componentName}, null);
  }

  public invokePlatformApi(path: string, method: string, request?: any, requestHeader?: any): Observable<HttpResponse<Object>> {
    const url = this.serviceURL + path;
    return this.getHttpService(url, method, requestHeader, request);
  }

  public invokePortalApi(path: string, method: string, request?: any, requestHeader?: any): Observable<HttpResponse<Object>> {
    const url = this.portalURL + path;
    return this.getHttpService(url, method, requestHeader, request);
  }
  
  private execute(event: any, data: any){
    if (this.isInsideUIStudio) return;
    try{
      let mapId = null;
      const eventType = event.type;
      if(event instanceof MouseEvent || event instanceof KeyboardEvent){
        const element = event.target as HTMLElement;
        mapId = element.getAttribute('ep-map-id');
      }else{
        mapId = event.mapId;
      }
      let mapDetails = dataMapping[mapId] || {};
      let mapEventDetails = mapDetails[eventType];
      if(mapEventDetails != null){
        let stepList = JSON.parse(JSON.stringify(mapEventDetails.stepList || []));
        stepList.forEach((step: any, index: number) => {
          step.stepId = 'Step-' + (index + 1);
        });
        stepList.reverse();
        let queryParamMap: any;
        this.route.queryParamMap.subscribe(params => {
          queryParamMap = {...params['params']};
        });
        Object.keys(queryParamMap).forEach((key) => {
          queryParamMap[key] = decodeURIComponent(queryParamMap[key]);
        });
        let additionalDetails = {asyncIdList: [], queryParamMap, currentScope: data};
        this.executeStep(stepList, additionalDetails, function(error){
          //Execution Completed
        });
      }else if(mapId != 'page-ready'){
        throw {message: 'Invalid MapId/EventType'};
      }
    }catch(e){
      console.error(e);
    }
  };

  private executeStep(stepList: any, additionalDetails: any, callback: Function){
    var updateAsyncIdList = function(executionType: string, currentStep: any){
      if(executionType == 'ASYNC'){
        additionalDetails.asyncIdList.push(currentStep.stepId);
      }
    };
    if(stepList.length > 0){
      let currentStep = stepList.pop();
      let executionType = currentStep.executionType || 'SYNC';
      if(executionType == 'SYNC' && additionalDetails.asyncIdList.length > 0){
        stepList.push(currentStep);
      }else{
        let _this = this;
        switch(currentStep.type){
          case 'LOADING_WIDGET': 
            this.executeLoadingwidget(currentStep.loadingWidget);
            break;
          case 'BUSINESS_LOGIC': 
            let isTerminateExecution = this.executeBusinessLogc(currentStep.businessLogic, additionalDetails);
            if(isTerminateExecution){
              return;
            }
            break;
          case 'API': 
            updateAsyncIdList(executionType, currentStep);
            this.executeAPI(currentStep.api, additionalDetails, function(){
              if(executionType != 'FAF'){
                _this.executeStep(stepList, additionalDetails, callback);
              }
            });
            if(executionType == 'SYNC') return;
          case 'WORKFLOW': //TODO:
            updateAsyncIdList(executionType, currentStep);
            this.executeWorkflow(currentStep.workflow, additionalDetails,function(){
              if(executionType != 'FAF'){
                _this.executeStep(stepList, additionalDetails, callback);
              }
            });
            if(executionType == 'SYNC') return;
          case 'POPUPS':
            this.executePopups(currentStep.popups);
            break;
          case 'NAVIGATE':
            return this.executeNavigate(currentStep.navigation, additionalDetails);
          case 'NOTIFICATION':
            this.executeNotification(currentStep.notification, additionalDetails);
            break;
          default: 
            console.error('Invalid Step Type');
            return;
        }
        this.executeStep(stepList, additionalDetails, callback);
      }    
    }else{
      callback();
    }
  }

  private executeLoadingwidget(details: any){
    let targetElement = details.target;
    let loaderType = details.type;
    if (targetElement === "CUSTOM") {
      targetElement = details.targetPath;
    }
    if (details.icon !== "DEFAULT" && details.isLoaderIconUploaded) {
      let loaderImg = details.icon_base64Content;
      $(targetElement).LoadingOverlay(loaderType, {
        image: loaderImg
      });
    }else{
      $(targetElement).LoadingOverlay(loaderType);
    }
  }
  
  private executeBusinessLogc(details: any, additionalDetails: any){
	  try{
      var _this = this;
      let script = '(' + details.script + ')';
      this.setScopeToAppModule(eval(script)(this.getScopeFromAppModule(), {
        queryParam: additionalDetails.queryParamMap,
        currentScope: additionalDetails.currentScope,
        toastr: {
          success: function(message: string, title: string, toastConfig: any){
            _this.toastr.success(message, title, toastConfig);
          },
          error: function(message: string, title: string, toastConfig: any){
            _this.toastr.error(message, title, toastConfig);
          },
          info: function(message: string, title: string, toastConfig: any){
            _this.toastr.info(message, title, toastConfig);
          },
          warning: function(message: string, title: string, toastConfig: any){
            _this.toastr.warning(message, title, toastConfig);
          }
        },
        navigate: function(navUrlString: string){
          if(navUrlString.startsWith('https') || navUrlString.startsWith('http')){
            _this.pageNavigate(navUrlString);
          }else{
            _this.routerNavigateByUrl(navUrlString);
          }
        },
        loader: {
          show: function(selector: string){
            selector = selector || 'body';
            $(selector).LoadingOverlay('show');
          },
          hide: function(selector: string){
            selector = selector || 'body';
            $(selector).LoadingOverlay('hide');
          }
        },
        popup:{
          show: function(popupName: string, isCloseExisting: boolean){
            if(popupName != ''){
              if(isCloseExisting) $('.modal').modal('hide');
              $('[name="' + popupName + '"][role="dialog"]').modal('show');
            }
          },
          hide: function(popupName: string){
            $('[name="' + popupName + '"][role="dialog"]').modal('hide');
          }
        },
        appStorage: {
          set: function(key: string, value: any){
            sessionStorage.setItem('EP_APP_STORE_' + key, JSON.stringify({data: value}));
          },
          get: function(key: string){
            var resp = null;
            let value = sessionStorage.getItem('EP_APP_STORE_' + key) as any;
            if(value){
              try{
                resp = JSON.parse(value).data;
              }catch(e){
                console.error(e);
              }
            }
            return resp;
          },
          remove: function(keys: any){
            if(!(keys instanceof Array)){
              keys = [keys];
            }
            keys.forEach(key => {
              sessionStorage.removeItem('EP_APP_STORE_' + key);
            });
          },
          removeAll: function(){
            Object.keys(sessionStorage).forEach(key => {
              if(key.startsWith('EP_APP_STORE_')){
                sessionStorage.removeItem(key);
              }
            });
          }
        }
      }));
    }catch(e){
      if(e.code == 500){
        console.log('Execution Terminated');
      }else{
        console.error(e);
      }
      return true;
    }
    return false;
  }
  
  private executeAPI(details: any, additionalDetails: any, callback: Function){
    const url = details.workflowURL ? details.workflowURL : (this.apiPrefixURL + details.path);
    const scopeKey = details.request.scopeKey;
    const scopeName = details.request.scopeName;
    const headerScopeName = details.request.headerScopeName || '';
    let requestData: any;
    if(scopeKey === 'CUSTOM'){
      requestData = this.AppModel[scopeName];
    }else if(scopeKey === 'QUERYPARAM'){
      requestData = additionalDetails.queryParamMap;
    }else if(scopeKey === 'CURRENTSCOPE'){
      requestData = additionalDetails.currentScope;
    }else{
      requestData = this.AppModel[scopeKey];
    }
    const requestHeader = headerScopeName !== '' ? this.AppModel[headerScopeName] : {};

    let processResposne = (error, responseData, responseHeader) => {
      const responseObj = details.response;
      const scopeKey = responseObj.scopeKey;
      const scopeName = responseObj.scopeName;
      const headerScopeName = responseObj.headerScopeName || '';
      if(headerScopeName !== ''){
        this.AppModel[headerScopeName] = responseHeader;
      }
      if(error === null){
        this.AppModel[scopeKey === 'CUSTOM' ? scopeName : scopeKey] = [].concat(responseData != null ? responseData : []);
      }else{
        const errorScopeKey = responseObj.errorKey || '';
        if(errorScopeKey != ''){
          this.AppModel[errorScopeKey] = {error: error.error.errorMessage, status: error.status};
        }
      }
      callback();
    }

    this.getHttpService(url, details.method, requestHeader, requestData).subscribe((resp) => { //Success Block
      const keys = resp.headers.keys();
      let responseHeaders = {};
      keys.forEach(key => responseHeaders[key] = resp.headers.get(key));
      processResposne(null, resp.body, responseHeaders);
    }, (error) => { //Error Block
      processResposne(error, null, null);
    });

  }

  private getHttpService(url: string, method: string, requestHeader: any, requestData: any){
    const httpOptions = new HttpHeaders(Object.assign(requestHeader || {}, this.getDefaultHeaders()));
    switch (method) {
        case 'GET': return this.http.get(url, {observe: 'response', params: requestData, headers: httpOptions});
        case 'POST': return this.http.post(url, requestData, {observe: 'response', headers: httpOptions});
        case 'PUT': return this.http.put(url, requestData, {observe: 'response', headers: httpOptions});
        case 'DELETE': return this.http.delete(url, {observe: 'response', params: requestData, headers: httpOptions});
        default: throw {message: 'Invalid Method'}
    }
  }

  private executeWorkflow(details: any, additionalDetails: any, callback: Function){
    let url = this.serviceURL;
    const executionType = details.executionType;
    const workflowName = details.name;
    const version = details.version || '';
    if(executionType == 'START_INSTANCE'){
      url += '/startflow/' + workflowName + '/startinstance/' + version;
    }else if(executionType == 'START_INSTANCE_ASYNC'){
      url += '/startflow/' + workflowName + '/startinstanceAsync/' + version;
    }else if(executionType == 'EXECUTE_NEXT_STEP'){
      const currentScope = additionalDetails.currentScope;
      let workflowStepName = this.getScopeOrCurrentScopeValueIfNeeded(details.request.workflowStepName || '', currentScope);
      let processInstanceId = this.getScopeOrCurrentScopeValueIfNeeded(details.request.processInstanceId || '', currentScope);
      if(!workflowStepName){
        throw {message: 'Workflow StepName Missing'};
      }else if(!processInstanceId){
        throw {message: 'Process Instance Id Missing'};
      }else{
        url += '/next/' + workflowStepName + '/' + processInstanceId;
      }
    }else{
      throw {message: 'Invalid Workflow executionType'};
    }
    details.workflowURL = url;
    details.method = 'POST';
    this.executeAPI(details, additionalDetails,callback);
  }

  private executePopups(popupObj: any){
    let popupType = popupObj.type || "";
    let popupId = popupObj.popupId || "";
    if(popupType == "SHOW" && popupId != "") {
      if(popupObj.closeExisting == 'YES') $('.modal').modal('hide');
      $('#'+popupId).modal('show');
    }else if(popupType == "HIDE" && popupId != ""){
      $('#'+popupId).modal('hide');
    }
  }

  private executeNavigate(details: any, additionalDetails: any){
    const navigateType = details.type;
    const navQueryList = details.query;
    const queryParams = this.getPageNavQueryParamObject(navQueryList, additionalDetails.currentScope);
    if(navigateType == 'PAGE'){
      this.routerNavigate(details.page, queryParams);
    }else if(navigateType == 'CUSTOM'){
      let navPageURL = details.customLink;
      if(Object.keys(queryParams).length > 0){
        navPageURL += '?';
        Object.keys(queryParams).forEach((querykey: string, keyIndex: number) => {
          if(keyIndex == 0){
            navPageURL += querykey + '=' + queryParams[querykey];
          }else{
            navPageURL += '&' + querykey + '=' + queryParams[querykey];
          }
        });
      }
      this.pageNavigate(navPageURL);
    }
  }

  private getPageNavQueryParamObject(queryList: any, currentScope: any){
    let queryParamObj: any = {};
    queryList.forEach((queryObj: any) => {
      if(queryObj.key != '' && queryObj.value != '')
        queryParamObj[encodeURIComponent(queryObj.key)] = encodeURIComponent(this.getScopeOrCurrentScopeValueIfNeeded(queryObj.value, currentScope));
      
    });
    return queryParamObj;
  }

  private routerNavigate(pageName: string, queryParams: any){
    this.router.navigate([pageName], { queryParams }).then( (navigateSuccess: boolean) => { 
      if (!navigateSuccess) {
        this.toastr.error('Navigation has failed');
      }
    });
  }

  private routerNavigateByUrl(navUrlString: string){
    if(!navUrlString.startsWith('/'))  navUrlString = '/' + navUrlString;
    const appBaseURL = this.appName + '/' + 'pages';
    navUrlString = appBaseURL + navUrlString;
    this.router.navigateByUrl(navUrlString).then( (navigateSuccess: boolean) => {
      if (!navigateSuccess) {
        this.toastr.error('Navigation has failed');
      }
    });
  }

  private pageNavigate(navUrlString: string){
    window.location.href = navUrlString;
  }


  private executeNotification(details: any, additionalDetails: any){
    let notificationRule = details.rule || [];
    let scope = this.getScopeFromAppModule();
    let currentScope = additionalDetails.currentScope;
    let validNotificationRuleObj = notificationRule.find((ruleObj: any) => {
      let conditionObj = ruleObj.condition;
      let conditionKey = conditionObj.key || "";
      conditionKey = this.getScopeOrCurrentScopeValueIfNeeded(conditionKey, additionalDetails.currentScope);
      let conditionVal = conditionObj.value;
      let conditionOperation = conditionObj.cond;
      try { 
        if(conditionKey === '') return true;
        if(conditionOperation == '== null' || conditionOperation == '!= null'){
          return eval('(function execute(scope, currentScope, key){ return key ' + conditionOperation + '; })')(scope, currentScope, conditionKey);
        }else{
          return eval('(function execute(scope, currentScope, key, value){ return key ' + conditionOperation + ' value; })')(scope, currentScope, conditionKey, conditionVal);
        }
      } catch (error) {
        return conditionOperation == '== null' ? true : false;
      }
    });
    if(validNotificationRuleObj) this.showEventFlowNotification(validNotificationRuleObj);
  }

  private showEventFlowNotification(ruleObj: any){
    let ruleType = ruleObj.type || '';
    let ruleTitle = ruleObj.title || '';
    let ruleMessage = ruleObj.message || '';
    switch (ruleType) {
      case 'SUCCESS':
        this.toastr.success(ruleMessage, ruleTitle);
        break;
      case 'ERROR':
        this.toastr.error(ruleMessage, ruleTitle);
        break;
      case 'INFO':
        this.toastr.info(ruleMessage, ruleTitle);
        break;
      case 'WARNING':
        this.toastr.warning(ruleMessage, ruleTitle);
        break;
      default:
        break;
    }
  }

  public getDefaultHeaders(){
    let defaultHeader = {
      //'is-external-call': 'true',
      'XSRF-TOKEN' : this.getCookieValue("XSRF-TOKEN"),
      'X-XSRF-TOKEN' : this.getCookieValue("X-XSRF-TOKEN"),
      'ep-auth0-id' : this.getCookieValue("ep-auth0-Token"),
      'ep-sessionid' : this.getCookieValue("X-XSRF-TOKEN"),
      'Content-Type': 'application/json',
      'Accept': 'application/json;charset=UTF-8',
      'ep-client' : 'eportal-web-ui-service',
      'accessedTimezone' : new Date() + '',
      'ep-accountname': this.accountName, 
      'ep-appname': this.appName,
      'ep-author': this.getCookieValue("ep-author")  + ''
    };
    if(this.userTaskId){
      defaultHeader['ep-user-task-id'] = this.userTaskId;
    }
    return defaultHeader;
  }

  private getScopeFromAppModule(){
	  let scope = {};
    let appModuleClone = JSON.parse(JSON.stringify(this.AppModel));
    Object.keys(appModuleClone).forEach(key => {
      if(!mapReference.hasOwnProperty(key)) scope[key] = appModuleClone[key];
    });
		Object.keys(mapReference).forEach((key) => scope[key] = appModuleClone[mapReference[key]]);
		return scope;
  }

  private getScopeValue(key: string){
	  try{
      return eval('(function execute(scope){return ' + key + ';})')(this.getScopeFromAppModule());
    }catch(e){
      return null;
    }
  }
  
  private getCurrentScopeValue(key: string, currentScope: any){
    try{
      return eval('(function execute(currentScope){return ' + key + ';})')(currentScope);
    }catch(e){
      return null;
    }
  }
  
  private getScopeOrCurrentScopeValueIfNeeded(key: string, currentScope: any){
    let returnVal = key;
    try{
      if(this.isNullOrEmpty(key)){
        return returnVal;
      }
      if(key.startsWith("scope.")){
        returnVal = this.getScopeValue(key);
      } else if(key.startsWith("currentScope.")){
        returnVal = this.getCurrentScopeValue(key, currentScope);
      }  
      return returnVal;
    }catch(e){
      return returnVal;
    }
  }
  
  private setScopeToAppModule(scope: any){
	  Object.keys(scope).forEach((key) => {
			if(mapReference[key]){
				this.AppModel[mapReference[key]] = scope[key];
			}else{
				this.AppModel[key] = scope[key];
			}
		});
  }

  private isNullOrEmpty(data: any) {
    return typeof(data) == "number" ? false : (data || "") === "";
  }

  private getCookieValue(key: string): string {
    let b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

  public loaderShow(id: string, laoderText: string){
    $('#' + id).show();
    $('#' + id).find('span').text(laoderText);
  }

  public loaderHide(id: string){
      $('#' + id).fadeOut();
  }

  public logout(){
    this.loaderShow('loader', ' Signing Off...');
    this.invokePortalApi('/eportal/api/invalidateSession', 'POST').subscribe(
        (res: any) => {
            if (res.body && res.body['status'] == 'done') {
                sessionStorage.clear();
                const allcookies = document.cookie.split(";");
                let cookieFound = "";
                for (let i = 0; i < allcookies.length; i++) {
                    cookieFound = allcookies[i].split("=")[0].trim();
                    const domainSlices = document.domain.split('.');
                    const cookieDomain = domainSlices[domainSlices.length - 2] + '.' + domainSlices[domainSlices.length - 1];
                    document.cookie = cookieFound + "=; path=/; domain=" + cookieDomain + ";expires=Thu, 01 Jan 1970 00:00:00 GMT;";
                }
                this.loaderHide('loader');
                window.location.href = window.location.origin + "/login";
                return true;
            } else {
                const html: any = res.body;
                if (res != undefined && html != undefined) {
                    document.write(html);
                } else {
                    let accountName = this.getCookieValue('ep-accountname');
                    if (accountName == undefined || accountName == null || accountName == "") {
                        accountName = this.getCookieValue('ep-accountContext');
                    }
                    this.loaderHide('loader');
                    if (accountName == undefined || accountName == null || accountName == "") {
                        window.location.href = window.location.origin + "/login";
                    } else {
                        window.location.href = window.location.origin + "/" + accountName;
                    }
                }
            }
        },
        (err: any) => {
            console.error( err );
        }
    );
  }

}