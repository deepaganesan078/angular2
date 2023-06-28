import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Grocery';
  constructor(public service:AuthserviceService,private http:HttpClient)
  {
  }

  ngOnInit() {

    this.getcartdata();
  }
  loggedinuser:any;
  myusers:any
  user:any
  cartcount:any;

getcartdata()
{
  this.myusers=localStorage.getItem('user');
  this.loggedinuser=JSON.parse(this.myusers);
  this.service.getuser(this.loggedinuser.id).subscribe(res=>{
   this.user=res;
   this.cartcount=this.user.cart.length;
  })
}
}
