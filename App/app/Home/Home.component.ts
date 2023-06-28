import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ProductserviceService } from '../productservice.service';
import { HttpClient } from '@angular/common/http';
import { interval, map } from 'rxjs';
import { OfferserviceService } from '../offerservice.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(public http:HttpClient,public service:AuthserviceService,public offer:OfferserviceService) { }
userdata:undefined|any;
data:any;
time:any;

day:any;
hours:any;
minutes:any;
seconds:any;
  ngOnInit() {
    this.getquotes();
    this.getuserdata();
    this.offer.countertime();
    this.offer.startCountdown();

  }

getuserdata():void
{
   this.http.get('http://localhost:3000/User').subscribe(res=>{
    this.userdata=res;
   })
}

iscontentdisplay:any=false;

getquotes()
{
  this.offer.getquotes().subscribe(
    res=>{
      this.data=res;
      localStorage.setItem('quoteexit','true')
      this.offer.displayContentWithTimer(this.data.timelimit);
    });
}

}
