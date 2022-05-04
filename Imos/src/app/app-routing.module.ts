import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { UserRoleComponent } from './user-role/user-role.component'

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'Employee', component: EmployeeComponent },
  {path: 'User', component: UserComponent },
  {path: 'UserRole', component: UserRoleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
