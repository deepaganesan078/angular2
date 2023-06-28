import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthserviceService {
isloggedin:any;
isadmin:any;
    constructor(private route:Router,private http:HttpClient) { }
   login()
   {
    this.isloggedin=localStorage.getItem('loggedin');
     return this.isloggedin;
   }
   logout()
   {
    if(this.isadmin==='true')
    {
      localStorage.setItem('isadmin','false');
      this.isadmin=localStorage.getItem('isadmin');
      this.route.navigate(['Home']);
      return this.isadmin;
    }
    this.route.navigate(['Home']);
    localStorage.removeItem('user');
    localStorage.setItem('loggedin','false')
    this.isloggedin=localStorage.getItem('loggedin');

    return this.isloggedin;
   }

   adminlogin()
   {

     this.isadmin=localStorage.getItem('isadmin');
     return this.isadmin;
   }

getuser(id:any)
{
   return this.http.get('https://localhost:7250/api/User/'+id);
}



  }
