import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private authenticationService: AuthenticationService,
  ) { }
  public UrlPathHome = "";
  public UrlPathLogin = "";
  public UrlPathCourse = "";

  ngOnInit(): void {
    this.UrlPathHome = environment.UrlPathHome;
    this.UrlPathLogin = environment.UrlPathLogin;
    this.UrlPathCourse = environment.UrlPathCourse;
    this.isLoggedIn = this.authenticationService.isLoggedIn();
  }

  onLogout(){
    this.authenticationService.logOut();
    this.isLoggedIn = this.authenticationService.isLoggedIn();
  }

}
