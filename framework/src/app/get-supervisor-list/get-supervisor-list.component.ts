import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../mytask/mytask.component';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-get-supervisor-list',
  templateUrl: './get-supervisor-list.component.html',
  styleUrls: ['./get-supervisor-list.component.css']
})
export class GetSupervisorListComponent implements OnInit {
  constructor(private _Mainservice: MainService,
    public dialogRef: MatDialogRef<GetSupervisorListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {

  }

}
