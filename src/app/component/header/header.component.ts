import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/enum/role.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private authenticationService: AuthenticationService,
  ) { }
  public UrlPathHome = "";
  public UrlPathLogin = "";
  public UrlPathCourse = "";
  public UrlAdminUsers = "";
  loginStatus;


  ngOnInit(): void {
    this.UrlPathHome = environment.UrlPathHome;
    this.UrlPathLogin = environment.UrlPathLogin;
    this.UrlPathCourse = environment.UrlPathCourse;
    this.UrlAdminUsers = environment.UrlAdminUsers;
    this.authenticationService.isUserLoggedIn.subscribe((status) => {
      this.loginStatus = status;
    });
  }

  onLogout(){
    this.authenticationService.logOut();
    this.authenticationService.isUserLoggedIn.subscribe((status) => {
      this.loginStatus = status;
    });
  }

  public get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }

  public get isManager(): boolean {
    return this.isAdmin|| this.getUserRole() === Role.MANAGER;
  }

  public get isUser(): boolean {
    return this.getUserRole() === Role.USER || this.isAdminOrManager;
  }

  public get isAdminOrManager(): boolean {
    return this.isAdmin || this.isManager;
  }

  private getUserRole(): string {
    if (this.authenticationService.isLoggedIn()===true){
      return this.authenticationService.getUserFromLocalCache().userRole;
    } else {
      return "";
    }
  }
}
