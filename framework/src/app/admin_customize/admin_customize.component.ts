import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';
import { CreatAdminCustomizeComponent } from '../creat-admin-customize/creat-admin-customize.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-admin_customize',
  templateUrl: './admin_customize.component.html',
  styleUrls: ['./admin_customize.component.css']
})
export class Admin_customizeComponent implements OnInit {

  constructor(private ApiService: ApiService, private AppModel: AppModelService, private  elemRef: ElementRef, public dialog: MatDialog) { }

  ngOnInit() { 
	this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
  }
  openDialog1(): void {
    console.log("enter")

    const dialogRef = this.dialog.open(CreatAdminCustomizeComponent, {
      width: '900px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}