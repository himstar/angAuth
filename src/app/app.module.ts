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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { AdminHeaderComponent } from './common/admin-header/admin-header.component';
import { AdminFooterComponent } from './common/admin-footer/admin-footer.component';
import { UserService } from './services/user.service';
import { ApiUrlService } from './config/api-url.service';
import { CompanyRegisterComponent } from './components/company-register/company-register.component';
import { CompanyLoginComponent } from './components/company-login/company-login.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'u/register', component: UserRegisterComponent},
  {path: 'u/login', component: UserLoginComponent},
  {path: 'c/register', component: CompanyRegisterComponent},
  {path: 'c/login', component: CompanyLoginComponent},
  {
    path: 'u/profile',
    component: UserProfileComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'u/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGaurdService]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    UserLoginComponent,
    DashboardComponent,
    HomeComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    UserProfileComponent,
    UserRegisterComponent,
    CompanyRegisterComponent,
    CompanyLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGaurdService, 
    UserService,
    ApiUrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
