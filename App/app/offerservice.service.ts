import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { OfferComponent } from './offer/offer.component';

@Injectable({
  providedIn: 'root'
})
export class OfferserviceService {

  constructor(private http:HttpClient) { }
iscontentdisplay = false;
isofferexit:any=false;

offervalue:any;
offerstatus:any;
value:number=0;
rate:number=0;
distance:any;
date:any;
offername:any;

day:any;
hours:any;
minutes:any;
seconds:any;

//Quotes

updatequotes(quotes:any)
  {
    return this.http.post('http://localhost:3000/quotes',quotes);
  }

getstatus()
{
  if(localStorage.getItem('quoteexit')==='true')
  {
    return true;
  }
  return false;
}

 getquotes()
 {
   return this.http.get<any>('http://localhost:3000/quotes/1');
 }

 displayContentWithTimer(time:any) {
  this.iscontentdisplay = false; // Show the content
  this.value=parseInt(time)*60000;
  setTimeout(() => {
    this.iscontentdisplay = true;
    this.quotedelete();
    localStorage.removeItem('quoteexit');
  },this.value);
}

quotedelete()
{
  this.http.delete('http://localhost:3000/quotes/1').subscribe(res=>{
    Swal.fire({
      imageHeight: 300,
      imageAlt: 'A tall image',
      html:'<h4>Todays Quotes time out</h4>'
    })
  })
}

//Offer

updateoffer(offer:any)
{
  return this.http.post('http://localhost:3000/offers',offer);
}
getoffer()
{
  return this.http.get<any>('http://localhost:3000/offers/1');

}
countertime():any
{
  this.getoffer().subscribe(res=>
    { this.offervalue=res
      this.rate=this.offervalue.rate;
      this.offername=this.offervalue.offername;
       this.date=new Date(this.offervalue.time).getTime();
        var futuredate=this.date;
        var todaydate=new Date().getTime();
        this.distance=futuredate - todaydate;
        // console.log(this.distance);

      this.isofferexit=true;
      localStorage.setItem('offer','true');
      setTimeout(()=>{
        this.isofferexit=false;
        this.deleteoffer();
        localStorage.removeItem('offer');
        Swal.fire({
          icon: 'error',
          title: 'Offer Ended...'+this.offervalue.time,
          text: 'Opps  Offer Time out!',
        })
      },this.distance)
      if(this.distance<=0)
      {
        this.isofferexit=false;
        localStorage.removeItem('offer');
        return this.isofferexit;
      }

      return this.isofferexit;
    });
}


deleteoffer()
{
  return this.http.delete('http://localhost:3000/offers/1').subscribe(res=>{
  })
}

getOfferstatus()
{
  if(localStorage.getItem('offer')==='true')
  {
    return true;
  }
  return false ;
}
startCountdown() {
  const interval = setInterval(() => {
    // Calculate the remaining time
    const totalSeconds = Math.floor(this.distance / 1000);
    this.day=Math.floor((this.distance) / (1000 * 60 * 60 *24));
     this.hours=Math.floor((this.distance) % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
     this.minutes=Math.floor((this.distance) % (1000 * 60 * 60 ) / (1000 * 60));
    this.seconds=Math.floor((this.distance)%(1000 * 60 )/(1000));

    // Update the time every second
    this.distance -= 1000;

    // Stop the countdown when the time reaches 0
    if (this.distance <= 0) {
      clearInterval(interval);
    }
  }, 1000);
}
}
