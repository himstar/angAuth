import { Component, OnInit  } from '@angular/core';
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

  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
 chartData = [
    {
      label: '1st Year',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
    },
    { 
      label: '2nd Year',
      data: [47, 9, 28, 54, 77, 51, 24]
    }
  ];

  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]

  onChartClick(event) {
    console.log(event);
  }

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
