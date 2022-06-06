import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private host: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) { }


  public getAllCourses(): Observable<Course[] | HttpErrorResponse>{
    return this.httpClient.get<Course[]>(`${this.host}/course/list/published`);
  }








}
