import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { User_profileComponent } from '../../user_profile/user_profile.component';

// export interface DialogData {
//   animal: string;
//   name: string;
// }
@Component({
  selector: 'app-header-new',
  templateUrl: './header-new.component.html',
  styleUrls: ['./header-new.component.css']
})
export class HeaderNewComponent implements OnInit {
username = sessionStorage.getItem('ep-username');
// animal: string;
//   name: string;

  @Input() sidenav: MatSidenav

  constructor() { }

  ngOnInit() {
  }

//  openDialog(): void {
//     console.log("enter")
//     const dialogRef = this.dialog.open(User_profileComponent, {
     
//       data: {name: this.name, animal: this.animal}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       this.animal = result;
//     });
//   }
}
