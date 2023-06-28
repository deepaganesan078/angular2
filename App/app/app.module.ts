import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { AdminComponent } from './Admin/Admin.component';
import {ProductsComponent} from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { EditProductsComponent } from './EditProducts/EditProducts.component';
import { AddToCartComponent } from './AddToCart/AddToCart.component';
import { HeaderComponent } from './header/header.component';
import { OfferComponent } from './offer/offer.component';
import { WeightPipe } from './weight.pipe';
import { CdTimerModule } from 'angular-cd-timer';
import { OfferpipePipe } from './offerpipe.pipe';
import { PaymentComponent } from './payment/payment.component';
import { MyordersComponent } from './myorders/myorders.component';
import { FeedbackComponent } from './feedback/feedback.component';
@NgModule({
  declarations: [			
    AppComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      AdminComponent,
      ProductsComponent,
      EditProductsComponent,
      AddToCartComponent,
      HeaderComponent,
      OfferComponent,
      WeightPipe,
      OfferpipePipe,
      PaymentComponent,
      MyordersComponent,
      FeedbackComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdTimerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
