import { AfterViewInit, Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
declare var google: any;

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements AfterViewInit, OnInit{
  first1:any = 0;
  second2:any = 0;

  ngOnInit(): void {
   

  }

  @Input() childMessage: any;
  

  @ViewChild('pieChart',{static:true}) pieChart: ElementRef

  drawChart = () => {

    // console.log(this.childMessage); 
    const str = this.childMessage["completedTask "];
    console.log(str);
    const words = str.split(',');

     this.first1 = Number(words[0]);
    this.second2 = Number(words[1]);

    
    // console.log(Number(words[0]));
    // console.log(Number(words[1]));
    

  const data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Completed Tasks', this.first1],
    ['Total Tasks', this.second2]
    
  ]);

  const options = {
    height: 400,
    title: 'My Daily Activities',
    legend: {position: 'top'},
    slices: {
      0: { color: 'lightgray' },
      1: { color: 'green' }
    },
    pieHole:0.4
  };

  const chart = new google.visualization.PieChart(this.pieChart.nativeElement);

  chart.draw(data, options);
}

  ngAfterViewInit() {
    
   
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  ngOnChanges(){

    
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);


  }


}
