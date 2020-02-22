import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
declare let google: any;

@Component({
  selector: 'app-created-vs-resolved-queue',
  templateUrl: './created-vs-resolved-queue.component.html',
  styleUrls: ['./created-vs-resolved-queue.component.css']
})
export class CreatedVsResolvedQueueComponent implements OnInit {

  @Input() chMessage: any;
  

  constructor(private http: HttpClient) { }

  ngOnInit() {
  
  // this.http.get('https://jsonplaceholder.typicode.com/comments').subscribe(data => {
  //   console.log(data); 
   
  // });

  this.drawChart();
}

drawChart() {


  var str = this.chMessage.groupsCount_Response;

  // str.substr(1,str.length-1);

  var test = JSON.stringify(str).replace(/"/g,'')


  test = test.replace(/'/g,'"')

 var data1 = JSON.parse(test)




  // console.log(str);
  google.charts.load('current', {'packages': ['bar']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    var data = google.visualization.arrayToDataTable(JSON.parse(JSON.stringify(data1)),false);

    const options = {
      height: 400,
      isStacked: true,
      vAxis: {format: 'decimal'},
      hAxis: {format: ''},
      series: {
        0: {color: '#fdd835'},
        1: {color: '#0091ff'},
        2: {color: '#e53935'},
        3: {color: '#43a047'},
      }
    };

    const chart = new google.charts.Bar(document.querySelector('#initial_chart_div'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
}

ngOnChanges(){

  this.drawChart();


}


}
