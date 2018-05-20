import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGaurdService } from './services/auth-gaurd.service';
import { AdminHeaderComponent } from './common/admin-header/admin-header.component';
import { AdminFooterComponent } from './common/admin-footer/admin-footer.component';
import { UserService } from './services/user.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'u/profile',
    component: UserProfileComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGaurdService]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGaurdService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
