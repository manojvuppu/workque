// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { ApiService } from '../util/api.service';
// import { Observable } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root'
// // })
// export class RouterGaurdService implements CanActivate {
//   privilegeMap: any;
//   constructor(public jwtHelper: JwtHelperService,
//               public router: Router,
//               public apiService: ApiService) {}

//   private getCookieValue(key: string): string {
//     const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
//     return b ? b.pop() : '';
//   }

//   private isTokenExpired(): boolean {
//     const token = this.getCookieValue('XSRF-TOKEN');
//     return this.jwtHelper.isTokenExpired(token);
//   }

//   canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean | Promise<boolean> {
//     if (this.isTokenExpired()) {
//       this.router.navigate(['unauthorized']);
//       return false;
//     } else if (!this.apiService.isTaskLevel) {
//       if (!this.privilegeMap) {
//         return this.getCurrentAppPrivilegesAndCheckHasPermissionToRoute(activatedRoute);
//       } else {
//         return this.hasPermissionToRoute(activatedRoute);
//       }
//     } else {
//       return true;
//     }
//   }

//   private async getCurrentAppPrivilegesAndCheckHasPermissionToRoute(activatedRoute: ActivatedRouteSnapshot) {
//     const data = await this.apiService.invokePortalApi('/eportal/api/getPrivilegeForUserFromCache', 'POST', '{}', null).toPromise();
//     this.privilegeMap = data.body;
//     return this.hasPermissionToRoute(activatedRoute);
//   }

//   private hasPermissionToRoute(activatedRoute: ActivatedRouteSnapshot) {
// 	  if (this.privilegeMap.isAccountOwner) { return true; }
// 	  let readPermission = (this.privilegeMap.READ || {});
// 	  if (typeof readPermission === 'string') {
// 		  readPermission = JSON.parse(readPermission);
// 	  }
// 	  const pagePermission = (readPermission.PAGE || {});
// 	  let routerUrl = '';
// 	  const _fn = (activatedRoute: ActivatedRouteSnapshot) => {
// 		  routerUrl = activatedRoute.routeConfig.path + (routerUrl != "" ? "/" : "") + routerUrl;
// 		  if (activatedRoute.parent.routeConfig != null) _fn(activatedRoute.parent);
// 	  }
// 	  _fn(activatedRoute)
// 	  routerUrl = "/" + routerUrl;
// 	  const isValid = pagePermission.hasOwnProperty(routerUrl);
// 	  if (!isValid) {
// 		  this.router.navigate(['unauthorized']);
// 	  }
// 	  return isValid;
//   }

// }
