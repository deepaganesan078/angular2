import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import {ProductsComponent} from './products/products.component';
import { AdminComponent } from './Admin/Admin.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { AuthGuard } from './auth.guard';
import { EditProductsComponent } from './EditProducts/EditProducts.component';
import { AddToCartComponent } from './AddToCart/AddToCart.component';
import { OfferComponent } from './offer/offer.component';
import { AdminguardGuard } from './adminguard.guard';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { MyordersComponent } from './myorders/myorders.component';
const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"Home",
    component:HomeComponent
  },

  {
    path:"products",
    component:ProductsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"profile",
    component:ProfileComponent
  },
  {
    path:"Editproducts",
    component:EditProductsComponent,
    canActivate:[AdminguardGuard]

  },
  {
    path:"AddToCart",
    component:AddToCartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"Admin",
    component:AdminComponent,
    canActivate:[AdminguardGuard]
  },
  {
    path:"Login",
    component:LoginComponent
  },
  {
    path:"Register",
    component:RegisterComponent
  },
  {
    path:"offer",
    component:OfferComponent,
    canActivate:[AdminguardGuard]
  },
  {
    path:"payment/:amount",
    component:PaymentComponent
  },
  {
    path:"myorder",
    component:MyordersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
