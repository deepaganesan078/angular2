import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private service:AuthserviceService) { }
  // mail=localStorage.getItem('loggedInMailid');
  ngOnInit() {

  }
  userdata:any=localStorage.getItem('user');
  data=JSON.parse(this.userdata);

}
