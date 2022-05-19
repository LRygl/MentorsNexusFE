import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';

import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user.component';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';

import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
  ],
  providers: [
    AuthenticationService,
    UserService,
    AuthenticationGuard,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
