import * as $ from 'jquery';
import { Component } from '@angular/core';
import { DndService } from './platform/designer/dnd.service';
import {PropertyService} from "./platform/designer/property.service";
import { onMainContentChange } from './app-main/animations/animations';
import { SidenavService } from './services/sidenav.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ onMainContentChange ]
})
export class AppComponent {
  public onSideNavChange: boolean;
  title = 'Widget';
  isHeaderLoaded = false;

  constructor(private dndService: DndService, private propertyService: PropertyService, private _sidenavService: SidenavService) { 

  this._sidenavService.sideNavState$.subscribe( res => {
    console.log(res)
    this.onSideNavChange = res;
  })
  }

  updateHeaderFlag(value) {
  this.isHeaderLoaded = value;
  
  }  
}