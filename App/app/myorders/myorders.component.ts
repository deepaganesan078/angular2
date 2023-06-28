import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';
import { iif } from 'rxjs';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {


  constructor(private productservice:ProductserviceService) { }
   myusers:any=localStorage.getItem('user');
   loggedinuser=JSON.parse(this.myusers);
   myorders:any;
   orderexit:any;

   date:any;
   nextdate:any;
   day:any;

   value:string='';
  ngOnInit() {
   this.productservice.getmyorders(this.loggedinuser.id).subscribe(
    res=>{
       this.myorders=res;
    }
   )
  }
Returnproduct(data:any)
{
  this.productservice.ProductTimer(data);
}

}
