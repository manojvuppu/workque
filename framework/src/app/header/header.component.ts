import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../platform/util/api.service';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
} )
export class HeaderComponent implements OnInit {
    isInsideUIStudio: boolean;
    APP_UI_URL: string;
    APP_SOFTWARE_CONFIGURATION: string;
    APP_USER_MANAGEMENT: string;
    APP_MARKETPLACE: string;
    appLogo: string;
    @Output() updateHeaderFlag = new EventEmitter<boolean>(); // to check whether menu api call finished
    menuArr: any[] = [];
    constructor( private apiService: ApiService ) {
        this.isInsideUIStudio = ( self !== top );
        this.APP_UI_URL = apiService.portalURL;
        this.APP_SOFTWARE_CONFIGURATION = this.APP_UI_URL +
            '/landing?menu=software-configuration&initialflag=true&accountName=' + this.apiService.accountName;
        this.APP_USER_MANAGEMENT = this.APP_UI_URL + '/landing?menu=usermanagement&submenu=users&accountName=' + this.apiService.accountName;
        this.APP_MARKETPLACE = this.APP_UI_URL + '/landing?menu=market&accountName=' + this.apiService.accountName;
    }

    init() {
        this.getMenu();
        this.getLogo();
    }

    getMenu() {
        this.apiService.invokePlatformApi('/eportal/api/menuByPrivilege/v2', 'GET').subscribe(
            res => {
            	let respBody = (res.body || {}) as any;
                this.menuArr = respBody.menuArr || [];
                this.updateHeaderFlag.emit( true );
            },
            err => {
                console.error( err );
                this.updateHeaderFlag.emit( true );
            }
        );
    }
    getLogo() {
        this.apiService.invokePortalApi('/eportal/api/theme/getLogo', 'GET').subscribe(
            res => {
            	let respBody = (res.body || {}) as any;
                this.appLogo = (( respBody.base64String || '' ).length > 0 ? ('data:image/png;base64,' + respBody.base64String) : null);
            },
            err => {
                console.error( err );
            }
        );
    }
    logout(){
        this.apiService.logout();
    }
    ngOnInit() {
        if ( !this.isInsideUIStudio ) {
            this.init();
        } else {
            this.updateHeaderFlag.emit( true );
        }
    }

}
