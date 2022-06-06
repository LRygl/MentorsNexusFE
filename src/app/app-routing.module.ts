import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import UserComponent from '../app/component/user/user.component';
import { RegisterComponent } from '../app/component/register/register.component';
import { LoginComponent } from '../app/component/login/login.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { CourseComponent } from './component/course/course.component';
import { FormsModule } from '@angular/forms';
import { CourseCategoryComponent } from './component/course-category/course-category.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },



  { path: 'home', component: HomeComponent},
  { path: 'course', component: CourseComponent},
  { path: 'category', component: CourseCategoryComponent },

  { path: 'admin/users', component: UserComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
