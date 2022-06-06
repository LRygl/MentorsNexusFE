import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../model/course';
import { CourseCategory } from '../model/courseCategory';

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {

  private host: string = environment.apiUrl;


  constructor(
    private httpClient: HttpClient,
  ) { }


  public getAllCourseCategories(): Observable<CourseCategory[] | HttpErrorResponse>{
    return this.httpClient.get<CourseCategory[]>(`${this.host}/category/list/all`);
  }

  public getCourseCategoryById(categoryId: number): Observable<CourseCategory | HttpErrorResponse>{
    return this.httpClient.get<CourseCategory>(`${this.host}/category/${categoryId}`);
  }


  public deleteCourseCategory(categoryId: number): Observable<void> {
    console.log(categoryId);
    return this.httpClient.delete<void>(`${this.host}/category/${categoryId}/delete`);
  }
}
