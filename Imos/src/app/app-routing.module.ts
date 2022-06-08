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
import { MaterialComponent } from './material/material.component';
import { MaterialTypeComponent } from './material/material-type/material-type.component';
import { SupplierComponent } from './supplier/supplier.component';
import { SupplierTypeComponent } from './supplier/supplier-type/supplier-type.component';
import { AddMaterialComponent } from './material/add-material/add-material.component';
import { UpdateMaterialComponent } from './material/update-material/update-material.component';
import { UpdateMaterialTypeComponent } from './material/material-type/update-material-type/update-material-type.component';
import { AddMaterialTypeComponent } from './material/material-type/add-material-type/add-material-type.component';
import { UpdateSupplierComponent } from './supplier/update-supplier/update-supplier.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { UpdateSupplierTypeComponent } from './supplier/supplier-type/update-supplier-type/update-supplier-type.component';
import { AddSupplierTypeComponent } from './supplier/supplier-type/add-supplier-type/add-supplier-type.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { UpdateVehicleComponent } from './vehicle/update-vehicle/update-vehicle.component';
import { VehicleTypeComponent } from './vehicle/vehicle-type/vehicle-type.component';
import { AddVehicleTypeComponent } from './vehicle/vehicle-type/add-vehicle-type/add-vehicle-type.component';
import { UpdateVehicleTypeComponent } from './vehicle/vehicle-type/update-vehicle-type/update-vehicle-type.component';

const routes: Routes = [
  //Default
  { path: '', component: LoginComponent },
  //Header
  { path: 'header', component: HeaderComponent },
  //Home
  { path: 'home', component: HomeComponent },
  //User
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'user', component: UserComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'updateuser', component: UpdateUserComponent },
  //UserRole
  { path: 'userrole', component: UserRoleComponent },
  { path: 'adduserrole', component: AddUserRoleComponent },
  { path: 'updateuserrole', component: UpdateUserRoleComponent },
  //Employee
  { path: 'employee', component: EmployeeComponent },
  { path: 'UpdateEmployee', component: UpdateEmployeeComponent },
  { path: 'AddEmployee', component: AddEmployeeComponent },
  //Material
  { path: 'material', component: MaterialComponent },
  { path: 'UpdateMaterial', component: UpdateMaterialComponent },
  { path: 'AddMaterial', component: AddMaterialComponent },
  //Material Type
  { path: 'materialtype', component: MaterialTypeComponent },
  { path: 'UpdateMaterialType', component: UpdateMaterialTypeComponent },
  { path: 'AddMaterialType', component: AddMaterialTypeComponent },
  //Supplier
  { path: 'supplier', component: SupplierComponent },
  { path: 'UpdateSupplier', component: UpdateSupplierComponent },
  { path: 'AddSupplier', component: AddSupplierComponent },
  {path:'UpdateSupplier',component:UpdateSupplierComponent},
  //Supplier Type
  { path: 'suppliertype', component: SupplierTypeComponent },
  { path: 'UpdateSupplierType', component: UpdateSupplierTypeComponent },
  { path: 'AddSupplierType', component: AddSupplierTypeComponent },
  //Vehicle
  { path: 'vehicle', component: VehicleComponent },
  { path: 'addVehicle', component: AddVehicleComponent },
  { path: 'updateVehicle', component: UpdateVehicleComponent },
  //Vehicle Type
  { path: 'vehicleType', component: VehicleTypeComponent },
  { path: 'addVehicleType', component: AddVehicleTypeComponent },
  { path: 'updateVehicleType', component: UpdateVehicleTypeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
