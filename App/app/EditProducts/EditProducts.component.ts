import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-EditProducts',
  templateUrl: './EditProducts.component.html',
  styleUrls: ['./EditProducts.component.css']
})
export class EditProductsComponent implements OnInit {

  constructor(private service:ProductserviceService,private http:HttpClient) { }
  ngOnInit() {
    this.getMyProduct();
  }

  id:any="";
  pid:any="";
  pname:any=" ";
  quantity:any="";
  price:any="";
  details:any="";
  stock:any="";
  url:any="";
  Product:any;
  updatedProduct:any;

  getMyProduct()
  {
    this.service.getproduct().subscribe(res=>{
      this.Product=res;
    });
  }
  deleteproduct(productid:any)
  {
    alert(productid)
    const url= 'https://localhost:7250/api/product/'+productid;
    this.http.delete(url).subscribe(res=>
      {
        Swal.fire({
          icon: 'success',
          title: 'Deleted....',
          text: 'Product deleted succesfully!',
        })
      })
  }
  update(product:any)
  {
    this.pid=product.pid;
    this.pname=product.pname;
    this.price=product.price;
    this.quantity=product.quantity;
    this.url=product.url;
    this.stock=product.stock;
    this.details=product.details;
  }
  updateProduct(id:any,product:any)
  {
    var updatedProduct={
      pid:this.pid,
      pname:this.pname,
      price:this.price,
      quantity:this.quantity,
      url:this.url,
      stock:this.stock,
      details:this.details
    }
    this.service.updateProduct(id,updatedProduct).subscribe(res=>{
      alert("updated successfully....");
    })
  }
}
