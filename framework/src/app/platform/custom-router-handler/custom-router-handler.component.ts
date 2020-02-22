import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-custom-router-handler',
  templateUrl: './custom-router-handler.component.html',
  styleUrls: ['./custom-router-handler.component.css']
})
export class CustomRouterHandlerComponent {

	constructor(private router: Router, private route: ActivatedRoute) { 
	let queryParamMap: any;
	this.route.queryParams.subscribe(params => {
	   queryParamMap = params;
	});
	this.router.navigateByUrl(queryParamMap.route || '').then( (navigateSuccess: boolean) => {
      if (!navigateSuccess) {
        console.error('Navigation has failed');
      }
    });
  }

}