import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { OfferserviceService } from '../offerservice.service';
import { ViewChild, ElementRef} from '@angular/core';
import { OfferpipePipe } from '../offerpipe.pipe';
import { Router } from '@angular/router';
export interface Product{
  id:any,
  pname:any,
  quantity:any,
  price:any,
  url:any
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {



  constructor(private service:ProductserviceService,private http:HttpClient,public myoffer:OfferserviceService,private route:Router) {
  }


  ngOnInit() {
    this.getMyProduct();
    this.myoffer.countertime();
    this.myoffer.startCountdown();
    this.getofferdata();
  }
user:any=localStorage.getItem('user');
currentuser=JSON.parse(this.user);

Product:any;
userdata:any;
filteredProduct:any;
filter:any=false;

ProductToPay:any;

offerexit:any=this.myoffer.getOfferstatus();
selectedProduct:any;

offerdata:any;

getMyProduct()
{
  this.service.getproduct().subscribe(res=>{
    this.Product=res
  });
}
getid(id:any)
{
  this.service.getProductById(id).subscribe(res=>{
    this.selectedProduct=res;
    Swal.fire({
      imageUrl: this.selectedProduct.url,
      imageHeight: 300,
      imageAlt: 'A tall image',
      html:'<h4>'+this.selectedProduct.pname+'</h4>'+
      '<h5 style="color:purple">'+this.selectedProduct.details+'</h5>'
    })

  });

}
getofferdata()
{
  this.myoffer.getoffer().subscribe(res=>{
this.offerdata=res;
alert(typeof this.offerdata.time);
  })
}
addtocart(myproduct:Product)
{
  if(this.myoffer.isofferexit===true)
  {
    var offerprice=this.myoffer.rate;
    const offervalue=parseInt(myproduct.price)*(offerprice/100);
    const discountvalue=myproduct.price-offervalue;
    this.Product=
    {
      pid:myproduct.id,
      pname:myproduct.pname,
      quantity:myproduct.quantity,
      url:myproduct.url,
      price:discountvalue,
      productcount:1,
    }
  }
  else{
  this.Product=
  {
    pid:myproduct.id,
    pname:myproduct.pname,
    quantity:myproduct.quantity,
    url:myproduct.url,
    price:myproduct.price,
    productcount:1,
  }
}
  alert(this.currentuser.id)
  alert(this.Product.price)

  this.service.addtocart(this.currentuser.id,myproduct,this.Product);
}

FilterProduct(category:any)
{
this.filter=true;
   this.service.getProductbyCategory(category).subscribe(res=>{
    this.Product=res;
   })
}

}

