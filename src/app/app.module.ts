import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthService } from './services/auth.service';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { DashboardHeaderComponent } from './common/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './common/dashboard-footer/dashboard-footer.component';
import { UserService } from './services/user.service';
import { ApiUrlService } from './config/api-url.service';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';
import { CompanyLoginComponent } from './components/company-login/company-login.component';
import { CompanyDashboardComponent } from './components/company-dashboard/company-dashboard.component';
import { CompanyService } from './services/company.service';
import { CompanyAuthGaurdService } from './services/company-auth-gaurd.service';
import { NoAccessComponent } from './common/no-access/no-access.component';
import { UserAuthGaurdService } from './services/user-auth-gaurd.service';
import { Error404Component } from './common/error-404/error-404.component';
import { ChartsModule } from 'ng2-charts';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component'


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'u/register', component: UserRegisterComponent},
  {path: 'u/login', component: UserLoginComponent},
  {path: 'c/register', component: CompanyRegisterComponent},
  {path: 'c/login', component: CompanyLoginComponent},
  {path: 'no-access', component: NoAccessComponent},
  {
    path: 'u/profile',
    component: UserProfileComponent,
    canActivate: [AuthGaurdService, UserAuthGaurdService]
  },
  {
    path: 'u/dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGaurdService, UserAuthGaurdService]
  },
  {
    path: 'c/profile',
    component: CompanyProfileComponent,
    canActivate: [AuthGaurdService, CompanyAuthGaurdService]
  },  
  {
    path: 'c/dashboard',
    component: CompanyDashboardComponent,
    canActivate: [AuthGaurdService, CompanyAuthGaurdService]
  },
  {path: '404', component: Error404Component},
  {path: '**', redirectTo: '404'},    
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    UserLoginComponent,
    UserDashboardComponent,
    HomeComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    UserProfileComponent,
    UserRegisterComponent,
    CompanyRegisterComponent,
    CompanyLoginComponent,
    CompanyDashboardComponent,
    NoAccessComponent,
    Error404Component,
    CompanyProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule
  ],
  providers: [
    AuthService,
    AuthGaurdService, 
    UserService,
    CompanyService,
    CompanyAuthGaurdService,
    UserAuthGaurdService,
    ApiUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
