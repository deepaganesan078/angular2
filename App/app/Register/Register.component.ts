import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmedValidator } from '../Conformed.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styles: ['input.ng-valid{border-left:5px solid green;}']
})
export class RegisterComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  constructor(private fb:FormBuilder,private http:HttpClient,private _route:Router) { }
  Register=this.fb.group({
    fname:["",[Validators.required,Validators.minLength(5),Validators.pattern('[A-Za-z]+')]],
    lname:["",[Validators.required,Validators.minLength(1),Validators.pattern('[A-Z]+')]],
    emailid:["",[Validators.required,Validators.email]],
    phonenumber:["",[Validators.required,Validators.pattern('[6-9][0-9]+'),Validators.minLength(10)]],
    password:["",[Validators.required,Validators.minLength(8),Validators.pattern('[a-z]+[@\_\.]+[0-9]+')]],
    cpassword:["",[Validators.required,Validators.minLength(8)]],
    cart:[[]],
    // wallet:['']
  },{validator:ConfirmedValidator('password','cpassword')});

  ngOnInit()
  {

  }
Submitform(Register:FormGroup)
{
  const MyRegister={
    fname:this.Register.value.fname,
    lname:this.Register.value.lname,
    emailid:this.Register.value.emailid,
    phonenumber:this.Register.value.phonenumber,
    password:this.Register.value.password,
    cpassword:this.Register.value.cpassword,
    mycart:[]
  }
  this.http.post<any>("https://localhost:7250/api/User",JSON.stringify(MyRegister),this.httpOptions).subscribe(res=>{
    alert("You are successfully signup");
    Swal.fire({
      icon: 'success',
      title: 'Registered...',
      text: 'User Registered successfully!',
    })
    this.Register.reset();
    this._route.navigate(['Login']);
  },err=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  })
}

}

