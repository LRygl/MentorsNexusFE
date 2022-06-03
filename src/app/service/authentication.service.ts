import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt'



@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public host: string = environment.apiUrl;
  private token = "";
  private loggedInUsername = "";
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient) { }

  isUserLoggedIn = new BehaviorSubject(false);


  public login(user: User): Observable<HttpResponse<User> | HttpErrorResponse> {
    return this.http.post<User> (`${this.host}/user/login`, user, { observe: 'response' });
  }


  public register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(`${this.host}/user/register`, user);
  }

  public logOut(): void{
    this.token = "";
    this.loggedInUsername = "";
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
    this.isUserLoggedIn.next(false);
  }

  public saveToken(token: string): void{
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    if(this.token===""){
      return null;
    } else {
      return JSON.parse(localStorage.getItem('user') || '');
    }

  }


  public loadToken(): void {
    this.token = localStorage.getItem('token') || '';

  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if (!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          this.isUserLoggedIn.next(true);
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return false;
  }



}
