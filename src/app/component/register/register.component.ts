import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { first, Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { MustMatch } from 'src/app/_helper/form-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  private subsciptions: Subscription[] = [];


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      userEmail: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      userSecondaryEmail: ['', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validator: MustMatch('userEmail', 'userSecondaryEmail')
    });

    if(this.authenticationService.isLoggedIn()){
      this.router.navigateByUrl('/admin');
    }
}

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.authenticationService.register(this.form.value)
        .pipe(first())
        .subscribe(
          data => {
            this.notificationService.sendSuccessNotification(`Odeslali jsme aktivační email na adresu ` + this.form.controls['userEmail'].value);
            this.router.navigate(['../login']);
          },
          error => {
            this.notificationService.sendErrorNotification("An Error occurred!");
          }
        );
    }

}


  // onRegister(user: User): void {
  //   this.showLoading = true;
  //   this.subsciptions.push(
  //     this.authenticationService.register(user).subscribe(
  //        (response: User) => {
  //          this.showLoading = false;
  //          this.notificationService.sendSuccessNotification(`A new user was created for ${response.firstName}. Please check your email.`);
  //          this.router.navigateByUrl(environment.UrlPathLogin);
  //        },
  //        (httpErrorResponse: HttpErrorResponse) => {
  //         this.sendNotification(NotificationType.ERROR,httpErrorResponse.message);
  //          this.showLoading = false;
  //        }
  //     )
  //   );
  // }




