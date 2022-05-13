import { UserRoleComponent } from './user/user-role/user-role.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { AddUserRoleComponent } from './user/user-role/add-user-role/add-user-role.component';
import { UpdateUserRoleComponent } from './user/user-role/update-user-role/update-user-role.component';

const routes: Routes = [
  //Default
  { path: '', component: LoginComponent},
  //Header
  { path: 'header', component: HeaderComponent},
  //Home
  { path: 'home', component: HomeComponent},
  //User
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'user', component: UserComponent},
  { path: 'adduser', component: AddUserComponent},
  { path: 'updateuser', component: UpdateUserComponent},
//UserRole
  { path: 'userrole', component: UserRoleComponent},
  { path: 'adduserrole', component: AddUserRoleComponent},
  { path: 'updateuserrole', component: UpdateUserRoleComponent},
  //Employee
  { path: 'employee', component: EmployeeComponent},
  { path: 'UpdateEmployee', component: UpdateEmployeeComponent},
  { path: 'AddEmployee', component: AddEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
