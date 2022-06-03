import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { customHttpResponse } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  public getUsers(): Observable<User[] | HttpErrorResponse>{
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<customHttpResponse | HttpErrorResponse>{
    return this.http.get<customHttpResponse>(`${this.host}/user/resetPassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,{reportProgress: true, observe: 'events'});
  }

  public deleteUser(userId: number): Observable<customHttpResponse | HttpErrorResponse>{
    return this.http.delete<customHttpResponse>(`${this.host}/user/delete/${userId}`);
  }

  public addUsersToLocalCache(users: User[]): void{
    localStorage.setItem('users',JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[]{
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users') || '') ;
    } else {
      return null!;
    }
    return null!;
  }


  //UTILS FOLDER
  public createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData {

    const formData = new FormData();

    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.userFirstName);
    formData.append('lastName', user.userLastName);
    formData.append('email', user.userEmail);
    formData.append('role', user.userRole);
    formData.append('profileImage', profileImage);
    formData.append('iaActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;



  }



}
