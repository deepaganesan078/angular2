import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl,FormBuilder, Validators}from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styles: ['input.ng-valid{border-left:5px solid green;}']

})

export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private _http:HttpClient,private router:Router,private service:AuthserviceService,private route:ActivatedRoute) {}

   LoginForm:FormGroup|any;
   isloggedin:any;
   isAdminLogin:any;
   userdata:any;
   retUrl:any='Home';

    ngOnInit()
    {
        this.LoginForm=new FormGroup({
        "emailid":new FormControl,
        "password":new FormControl});
        this.route.queryParamMap.subscribe(parama=>{
          this.retUrl=parama.get('retUrl');});

      }
      Loginuser(LoginForm:any)
      {
        if(LoginForm.value.emailid==='Admin@gmail.com' && LoginForm.value.password==='Admin2023')
        {
            this.isAdminLogin=true;
            Swal.fire({
              icon: 'success',
              title: 'Logged in ...',
              text: 'Login successfull!',
            })
            localStorage.setItem('isadmin','true');
            this.LoginForm.reset();
            this.service.adminlogin();
            if(this.retUrl!=null){
              this.router.navigate([this.retUrl]);
            }
            else{
              this.router.navigate(["Home"]);
            }
        }

        else
        {
          this.isAdminLogin=false;
          this._http.get<any>('https://localhost:7250/api/User').subscribe(res=>{
            const user=res.find((a:any)=>{
              return a.emailid===LoginForm.value.emailid && a.password===LoginForm.value.password;
            });
          if(user)
          {
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('loggedin','true');
            this.LoginForm.reset();
            this.service.login();
            Swal.fire({
              icon: 'success',
              title: 'Logged in ...',
              text: 'Login successfull!',
            })
            if(this.retUrl!=null){
              this.router.navigate([this.retUrl]);
            }
            else{
              this.router.navigate(["Home"]);
            }
          }
          else
          {
            Swal.fire({
              icon: 'error',
              title: 'Login in failed...',
              text: 'Failed To Login!',
            })          }
        })
      }
      }
}


