import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading = false;
  loginForm: FormGroup;

  private subsciptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
 ) { }

  get f() { return this.loginForm.controls; }


  ngOnInit(): void {
    this.showLoading = false
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    {    });

    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/course');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(): void{
    this.showLoading = true;
    console.log(this.loginForm.value)
    this.subsciptions.push(
      this.authenticationService.login(this.loginForm.value).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/course');
          this.showLoading = false;
        },
        (httpErrorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR,httpErrorResponse.error.message );
          this.showLoading = false;
        }
      )
    );
  }
  private sendErrorNotification(notificationType: NotificationType, message: string) {
    if (message) {
      console.log("this.notificationService.notify(notificationType,message);");
    } else {
      //this.notificationService.notify(notificationType,'AN ERROR OCCURED');
    }
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach(sub => sub.unsubscribe());
  }

}
