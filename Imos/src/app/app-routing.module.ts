import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  
  //Header
  { path: 'header', component: HeaderComponent},
  //Home
  { path: 'home', component: HomeComponent},
  //User
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
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
