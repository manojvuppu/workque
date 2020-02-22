import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../animations/animations'
import { SidenavService } from '../../services/sidenav.service'
import $ from 'jquery';
import { MainService } from 'src/app/services/main.service';
import { ApiService } from 'src/app/platform/util/api.service';


interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})

export class LeftMenuComponent implements OnInit {
  pageList:any =[];
  isAccountOwner:boolean = false;
  queuelist;
  message:string;
  username = sessionStorage.getItem('ep-username'); 

  public sideNavState: boolean = false;
  public linkText: boolean = false;

  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  public pages: Page[] = [
    {name: 'mytask', link:'some-link', icon: 'inbox'},
    {name: 'My Tasks', link:'some-link', icon: 'star'},
    {name: 'Work Queues', link:'some-link', icon: 'send'},
  ]

  constructor( private _Mainservice: MainService, private _sidenavService: SidenavService,private ApiService: ApiService) { }

  ngOnInit() {

        
this.ApiService.invokePortalApi("/eportal/api/getPrivilegeForUserFromCache", "POST",{}).subscribe(
	res => {

    let localVarioable:any = res.body

    if(localVarioable.isAccountOwner){

      // this.isAccountOwner = true;

    }
		let readPermissionDetails = JSON.parse(localVarioable.READ);
		this.pageList = Object.keys(readPermissionDetails.PAGE);
		console.log(this.pageList);
	},
	err => {
		console.error( err );
	}
);

    //this._Mainservice.currentMessage.subscribe(message => this.message = message);

    this._Mainservice.getqueuelist(this.username).subscribe((data: any) => {
      console.log(data);
      this.queuelist = data;
    });
  }

   firstComponentFunction(id){    
    this._Mainservice.onFirstComponentButtonClick(id);    
  } 

    
  newMessage(id) {
    console.log(id)
    this._Mainservice.changeMessage(id);
  }

  
  onSinenavToggle() {
    this.sideNavState = !this.sideNavState
    
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

}