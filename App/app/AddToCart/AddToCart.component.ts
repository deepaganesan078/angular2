import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductserviceService } from '../productservice.service';
import { OfferserviceService } from '../offerservice.service';
export interface Product{
  id:any,
  pname:any,
  quantity:any,
  price:any,
  url:any
}
@Component({
  selector: 'app-AddToCart',
  templateUrl: './AddToCart.component.html',
  styleUrls: ['./AddToCart.component.css']
})
export class AddToCartComponent implements OnInit {
mail=localStorage.getItem('loggedInMailid');

producttopay:any;

httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json'
  })
}

  constructor(private http:HttpClient,private service:AuthserviceService,private productservice:ProductserviceService,private myoffer:OfferserviceService) { }
feedback:any;
  myusers:any=localStorage.getItem('user');
  loggedinuser=JSON.parse(this.myusers);
  emailid=this.loggedinuser.emailid;

  ngOnInit()
  {
    this.getcart();
  }
  usercart:any;
 usercartcount:any;

 data:any;
 productdata:any;

 count:any;
 amount:number=0;
SelectedProduct:any;

 getcart()
 {
  alert(this.loggedinuser.mycart)
   this.http.get<any>('https://localhost:7250/api/User/'+this.loggedinuser.id,this.httpOptions).subscribe(res=>{
      this.data=res;
      this.usercart=this.data.mycart;
    for(let i=0;i<this.usercartcount;i++)
    {
      this.amount+=parseInt(this.data.mycart[i].price);
    } })
 }

 updatecart(value:any,myproduct:any)
 {
  if(this.myoffer.isofferexit===true)
  {
      var offerprice=this.myoffer.rate;
      const offervalue=parseInt(this.productdata.price)*(offerprice/100);
      const discountvalue=this.productdata.price-offervalue;
      this.SelectedProduct=
      {
        pid:myproduct.id,
        pname:myproduct.pname,
        quantity:myproduct.quantity,
        url:myproduct.url,
        price:discountvalue,
        productcount:1,
      }
    }
    else
    {
    this.SelectedProduct=
    {
      pid:myproduct.id,
      pname:myproduct.pname,
      quantity:myproduct.quantity,
      url:myproduct.url,
      price:myproduct.price,
      productcount:1,
    }

    this.productservice.updatetocart(value,this.loggedinuser.id,myproduct);
 }
 }

 deleteproduct(id:any)
 {
  alert(id);
    this.productservice.deletecartproduct(id,this.loggedinuser.id);
 }


postfeedback()
{
  this.feedback={
    feedbackid:"61",
    userid:"4",
    productid:"100",
    productname:"wheat",
    feedback:"good"
  }
  this.http.post<any>('https://localhost:7250/api/feedback',JSON.stringify(this.feedback),this.httpOptions).subscribe(res=>{
    alert('done');
  });
}

}


