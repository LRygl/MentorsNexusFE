import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseCategory } from 'src/app/model/courseCategory';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CourseCategoryService } from 'src/app/service/course-category.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit {

  public isRefreshing: boolean;
  public showAddForm: boolean;
  public showEditForm: boolean;
  public showCategory: boolean;
  public categories: CourseCategory[];
  private subscription: Subscription[] = [];


  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private courseCategoryService: CourseCategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
      this.getAllCourseCategories(true);
      this.showAddForm = false;
      this.showEditForm = false;
      this.showCategory = true;
  }

  displayAddForm():void{
    this.showAddForm = true;
    this.showEditForm = false;
    this.showCategory = false;
  }

  displayEditForm(categoryId: number):void{
    this.showAddForm = false;
    this.showEditForm = true;
    this.showCategory = false;

    console.log(categoryId);

  }

  getCourseCategoryById(categoryId: number): void {
    return null;
  }

  getAllCourseCategories(showNotification: boolean): void {
    this.isRefreshing = true;
    this.subscription.push(
      this.courseCategoryService.getAllCourseCategories().subscribe(
        (response: CourseCategory[]) => {
          this.categories = response;
          console.log(this.categories);
          if(showNotification){
            this.notificationService.sendSuccessNotification(`${response.length} courses loaded sucessfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.sendErrorNotification("ERROR" + errorResponse);
          this.isRefreshing = false;
        }
      )
    )
  }

  upadeCourseCategory():void{
    return null;
  }

  deleteCourseCategory(categoryId: number){
    this.courseCategoryService.deleteCourseCategory(categoryId).subscribe(
      (response: void) => {
        this.notificationService.sendSuccessNotification(`Course category with ID = ${categoryId} was successfuly deleted`)
        this.getAllCourseCategories(false);
      },
      (error: HttpErrorResponse) => {
        this.notificationService.sendErrorNotification("ERROR");
      }
    );
  }
}
