import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})

export class AdminComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  pid:any="";
  pname:any=" ";
  quantity:any="";
  price:any="";
  details:any="";
  stock:any="";
  url:any="";
  category:any;

  msg:any="";

  categories=['fruits and Veges','snacks','Household','stationery']

  constructor(private http:HttpClient) { }

  ngOnInit() {

  }
  Addproduct(product:any)
  {
    console.warn(product);
    product={
      pid:this.pid,
      pname:this.pname,
      quantity:this.quantity,
      price:this.price,
      url:this.url,
      category:this.category,
      details:this.details,
      stock:this.stock
    };
    alert(this.pid);
    this.http.post<any>("https://localhost:7250/api/product",JSON.stringify(product),this.httpOptions).subscribe(res=>{
      Swal.fire({
        icon: 'success',
        title: 'Added....',
        text: 'Product Added succesfully!',
      })

    },err=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    })
  }

}

// select(event:any)
// {
//    if(!event.target.files[0]||event.target.files[0].length==0)
//    {
//      this.msg='you have to select image';
//      return;
//    }

// var mintype=event.target.files[0].type;
// if(mintype.match(/image\/*/)==null)
// {
//   this.msg="only images are supported";
//   return;
// }
// var reader=new FileReader();
// reader.onload=(_event)=>{
//   this.msg="";
//   this.url=reader.result;
//  }
//  reader.readAsDataURL(event.target.files[0]);

// }
