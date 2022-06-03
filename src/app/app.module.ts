import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';

import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoginComponent } from './component/login/login.component';
import UserComponent from './component/user/user.component';


import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { CourseComponent } from './component/course/course.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { RegisterComponent } from './component/register/register.component';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';



@NgModule({
  declarations: [ AppComponent, LoginComponent, ResetPasswordComponent, UserComponent, FooterComponent, HeaderComponent,
    ResetPasswordComponent, HomeComponent, CourseComponent, CarouselComponent, RegisterComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, NotificationModule, NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService, UserService, AuthenticationGuard, NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
