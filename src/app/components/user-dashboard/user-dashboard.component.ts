import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: any;
  results: Object[];
  
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  userDetails(){
    this.user = this.authService.currentUser._id;
    this.userService.getUser(this.user)
      .subscribe(
        data => {
          this.results = data.json();
        }
      );    
  }

  ngOnInit() {
    this.userDetails();
  }
}
