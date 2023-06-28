import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductserviceService } from '../productservice.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styles: ['input.ng-valid{border-left:5px solid green;}']
})
export class PaymentComponent implements OnInit {

  constructor(private formbuilder:FormBuilder,public usercart:ProductserviceService,private route:ActivatedRoute,private router:Router) { }
paymentid:any;

myusers:any=localStorage.getItem('user');
loggedinuser=JSON.parse(this.myusers);
userid=this.loggedinuser.id;
paymentdata:any;
cart:any;
amount:any;

date:any=new Date();
  ngOnInit() {
    this.cart=this.usercart.Mycartdata(this.userid);

  }
payment=this.formbuilder.group
({
   paymentid:[Math.floor(Math.random()*1000000)+1,[Validators.required]],
   userid:[this.userid,[Validators.required]],
   cardnumber:['',[Validators.required,Validators.maxLength(19),Validators.minLength(8),Validators.pattern('^[0-9]+$')]],
   Expdate:['',[Validators.required]],
   cvvnumber:['',[Validators.required,Validators.maxLength(4),Validators.pattern('^[0-9]+$')]],
   TotalAmount:[ this.route.snapshot.params['amount'],[Validators.required]],
   paiddate:this.date,
   deliverydate:new Date(new Date(this.date).getTime() +(24*60*60*1000))
});

PayNow(payment:any,userid:any)
{
  this.usercart.Payproduct(payment,userid);
}

}
