import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  userdata:any;
  originaldata:any;
  mycart:any;
  producttopay:any;
  isReturnvalid=false;
  constructor(private http:HttpClient) { }
  getproduct()
  {
    return this.http.get("https://localhost:7250/api/product");
  }
  getProductById(productid:any)
  {
    const selectedurl='https://localhost:7250/api/product/'+productid;
    return this.http.get(selectedurl);
  }
  updateProduct(id:any,product:any)
  {
    const selectedurl='https://localhost:7250/api/product/'+id;
    return this.http.put(selectedurl,JSON.stringify(product),this.httpOptions);
  }

  addtocart(id:any,myproduct:any,Product:any)
  {
    this.http.get('https://localhost:7250/api/User/'+id).subscribe(res=>{
     this.userdata=res;
     if(!this.userdata.mycart)
     {
      this.userdata.mycart=[];
     }
     const index = this.userdata.mycart.findIndex((item: any) => item.pid === myproduct.id && item.price === Product.price);
     if(index!=-1)
     {
     this.userdata.mycart[index].productcount+=1;
     Swal.fire({
      icon: 'success',
      title: 'Updated to cart...',
      text: 'Updateded successfully!',
    })
     }

     else
     {
     this.userdata.mycart.push(Product);
     }
     const producturl='https://localhost:7250/api/User/'+id;
     this.http.patch(producturl,JSON.stringify(this.userdata)).subscribe(res=>{
      Swal.fire({
        icon: 'success',
        title: 'Updated to cart...',
        text: 'Updateded successfully!',
      })     })
    });
  }

  updatetocart(value:any,id:any,myproduct:any)
  {
    this.getProductById(myproduct.pid).subscribe((res)=>{
      this.originaldata=res;
    });
    this.http.get('https://localhost:7250/api/User/'+id).subscribe(res=>{
     this.userdata=res;
     const index = this.userdata.mycart.findIndex((item: any) => item.pid === myproduct.pid);
     if(index!=-1)
     {
       if(value==='max')
       {
        this.userdata.cart[index].productcount+=1;
        this.userdata.cart[index].price=this.originaldata.price*this.userdata.cart[index].productcount;
        Swal.fire({
          icon: 'success',
          title: 'Updated to cart...',
          text: 'Updateded successfully!',
        })       }
       if(value==='min')
       {
        this.userdata.cart[index].productcount-=1;
        this.userdata.cart[index].price-=this.originaldata.price;
        Swal.fire({
          icon: 'success',
          title: 'Updated to cart...',
          text: 'Updateded successfully!',
        })       }
     }
     const producturl='https://localhost:7250/api/User/'+id;
     this.http.patch(producturl,this.userdata).subscribe(res=>{
      })
    });
  }

deletecartproduct(id:any,userid:any)
{
  this.http.get('https://localhost:7250/api/User/'+userid).subscribe(res=>{
    this.userdata=res;
    const index = this.userdata.cart.findIndex((item: any) => item.pid === id);
    this.userdata.cart.splice(index,1);
    this.http.patch('https://localhost:7250/api/User/'+userid,this.userdata).subscribe(res=>{
      Swal.fire({
        icon: 'success',
        title: 'Moved  to Myorders...',
        text: 'Moved successfully!',
      })
    });
  },
  error => {
    console.error(error); // Handle the error
  });

}

getProductbyCategory(category:any)
{
  return this.http.get("https://localhost:7250/api/product/api/product?category="+category);
}

Mycartdata(id:any)
{
  this.http.get('https://localhost:7250/api/User/'+id).subscribe(res=>{
    this.userdata=res;
    this.mycart=this.userdata.cart;
  });
}


Payproduct(payment:any,id:any)
{
  this.http.get('https://localhost:7250/api/User/'+id).subscribe(res=>{
   this.userdata=res;
   const cartcount=this.userdata.cart.length;
   for(let i=0;i<cartcount;i++)
   {
      this.userdata.cart[i].status='Paid'
   }
   const url='https://localhost:7250/api/User/'+id;
   this.http.patch(url,this.userdata).subscribe(res=>{
    this.PostToPay(payment,this.userdata.cart);
   })
  });

}

PostToPay(payment:any,usercart:any)
{
  this.producttopay={
    paymentid:payment.paymentid,
    userid:payment.userid,
    cardnumber:payment.cardnumber,
    cvvnumber:payment.cvvnumber,
    TotalAmount:payment.TotalAmount,
    product:usercart,
    paiddate:payment.paiddate,
    deliverydate:payment.deliverydate
   }
   this.http.post('http://localhost:3000/myorders',this.producttopay).subscribe(res=>{
    Swal.fire({
      icon: 'success',
      title: 'Product Paid...',
      text: 'Payment successfull!',
    })   });

   this.clearcart(payment.userid)
}
clearcart(userid:any)
{
  this.http.get('https://localhost:7250/api/User/'+userid).subscribe(res=>{
    this.userdata=res;
    this.userdata.cart.splice(0);
    this.http.patch('https://localhost:7250/api/User/'+userid,this.userdata).subscribe(res=>{
    });
  },
  error => {
    console.error(error); // Handle the error
  });
}
getmyorders(id:any)
{
 return  this.http.get('http://localhost:3000/myorders?userid='+id);
}

ProductTimer(data:any)
{
   let fromdate=new Date().getTime();
   let Todate=new Date(data.deliverydate).getTime();
   let distance=Todate-fromdate;
   alert(distance)
   setTimeout(()=>{
    this.isReturnvalid=false;
  },distance)

  if(distance<=0)
  {
    this.isReturnvalid=false;
    return this.isReturnvalid;
  }

  return this.isReturnvalid;
}

}
