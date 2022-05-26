import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }
  public UrlPathHome = "";
  public UrlPathLogin = "";
  public UrlPathCourse = "";

  ngOnInit(): void {
    this.UrlPathHome = environment.UrlPathHome;
    this.UrlPathLogin = environment.UrlPathLogin;
    this.UrlPathCourse = environment.UrlPathCourse;
  }

}
