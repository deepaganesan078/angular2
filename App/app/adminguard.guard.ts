import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(private service:AuthserviceService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean
     {

        if(!(this.service.adminlogin()==='true'))
        {
          alert("You are not  Admin access  the page");
          this.router.navigate(["Login"],{queryParams:{retUrl:route.url}}); //localhost:4200/login?retUrl=product
          return false;
          }
            return true;
        }
     }
