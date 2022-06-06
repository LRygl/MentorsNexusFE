import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/model/course';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CourseService } from 'src/app/service/course.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  public isRefreshing: boolean;
  public courses: Course[];
  private subsciptions: Subscription[] = [];


  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private courseService: CourseService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()){
      this.getAllCourses(true);
    } else {
      this.router.navigateByUrl('/login');
    }
  }


  getAllCourses(showNotification: boolean): void {
    this.isRefreshing = true;
    this.subsciptions.push(
      this.courseService.getAllCourses().subscribe(
        (response: Course[]) => {
          this.courses = response;
          console.log(this.courses);
          this.isRefreshing = false;
          if (showNotification) {
            this.notificationService.sendSuccessNotification(`${response.length} courses loaded sucessfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.sendErrorNotification("ERROR");
          this.isRefreshing=false;
        }
      )
    )


  }
}
