import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { getDefaultService } from 'selenium-webdriver/opera';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  results: Object[];
  
  constructor(
    private router: Router,
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
