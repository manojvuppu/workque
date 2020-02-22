import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';
import { ApiService } from './../platform/util/api.service';
import { AppModelService } from './../platform/util/app-model.service';

import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { HttpErrorResponse } from '@angular/common/http';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view_lifecycle',
  templateUrl: './view_lifecycle.component.html',
  styleUrls: ['./view_lifecycle.component.css']
})
export class View_lifecycleComponent implements OnInit {
  hierarchialGraph = { nodes: [], links: [] }
  curve = shape.curveBundle.beta(1);
  graphdata = [];
  graphnode = [];
  graphlink: any = [];

  zoomToFit$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();

  constructor(private _Mainservice: MainService, private ApiService: ApiService, private AppModel: AppModelService, private elemRef: ElementRef,
    public dialogRef: MatDialogRef<View_lifecycleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.ApiService.init(this.elemRef.nativeElement.tagName.toLowerCase());
    console.log(this.data);
    this.graphdata = this.data.stateTransition;
    let array = []
    this.graphdata.forEach(function (entry, index) {
      console.log(entry);
      let obj = {
        id: "id" + index,
        source: entry.currentState,
        target: entry.newState,
        label: entry.action
      }
      console.log(obj);

      array.push(obj);
      console.log(array);
    });
    this.graphlink = array;
    console.log(this.graphlink);

    this.showGraph();
    this.fitGraph();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  fitGraph() {
    this.zoomToFit$.next(true)
  }

  centerGraph() {
    this.center$.next(true)
  }
  showGraph() {

    this.hierarchialGraph.nodes = [
      {
        id: 'Pending',
        label: 'Pending'
      }, {
        id: 'In Progress',
        label: 'In Progress'
      }, {
        id: 'Open',
        label: 'Open'
      }, {
        id: 'Suspended',
        label: 'Suspended'
      }, {
        id: 'Deleted',
        label: 'Deleted'
      }, {
        id: 'Closed',
        label: 'Closed'
      }
    ];

    this.hierarchialGraph.links = this.graphlink;

  }

}