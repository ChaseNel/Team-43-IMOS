
import { EmployeeAttendanceComponent } from './employee/employee-attendance/employee-attendance.component';
import { UpdateProjectStaffComponent } from './project/project-staff/update-project-staff/update-project-staff.component';
import { AddProjectStaffComponent } from './project/project-staff/add-project-staff/add-project-staff.component';
import { VehicleAllocationComponent } from './vehicle/vehicle-allocation/vehicle-allocation.component';
import { AddSaftyChecklistCatagoryComponent } from './safty-checklist/safty-checklist-catagory/add-safty-checklist-catagory/add-safty-checklist-catagory.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { AddWarehouseComponent } from './warehouse/add-warehouse/add-warehouse.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ClientComponent } from './client/client.component';
import { ProjectComponent } from './project/project.component';
import { IncidentComponent } from './incident/incident.component';
import { SupplierOrderComponent } from './supplier/supplier-order/supplier-order.component';
import { MaterialRequestComponent } from './material/material-request/material-request.component';

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
import { AddEquipmentComponent } from './equipment/add-equipment/add-equipment.component';
import { UpdateEquipmentComponent } from './equipment/update-equipment/update-equipment.component';
import { UpdateWarehouseComponent } from './warehouse/update-warehouse/update-warehouse.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { AddIncidentComponent } from './incident/add-incident/add-incident.component';
import { UpdateIncidentComponent } from './incident/update-incident/update-incident.component';
import { SaftyChecklistComponent } from './safty-checklist/safty-checklist.component';
import { AddSaftyChecklistComponent } from './safty-checklist/add-safty-checklist/add-safty-checklist.component';
import { UpdateSaftyChecklistComponent } from './safty-checklist/update-safty-checklist/update-safty-checklist.component';
import { SaftyChecklistCatagoryComponent } from './safty-checklist/safty-checklist-catagory/safty-checklist-catagory.component';

import { UpdateSaftyChecklistCatagoryComponent } from './safty-checklist/safty-checklist-catagory/update-safty-checklist-catagory/update-safty-checklist-catagory.component';
import { UserRoleComponent } from './user/userrole/user-role.component';
import { AddUserRoleComponent } from './user/userrole/add-user-role/add-user-role.component';
import { UpdateUserRoleComponent } from './user/userrole/update-user-role/update-user-role.component';
import { ProjectStaffComponent } from './project/project-staff/project-staff.component';
import { AddSupplierOrderComponent } from './supplier/supplier-order/add-supplier-order/add-supplier-order.component';

import { CancelOrderComponent } from './supplier/supplier-order/cancel-order/cancel-order.component';
import { ReportingComponent } from './reporting/reporting.component';
import { AuthGuard } from './services/auth/auth.guard';


const routes: Routes = [
  //Default
  { path: '', component: LoginComponent },
  //Header
  { path: 'header', component: HeaderComponent },
  //Home
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard] },

  //Reporting
  { path: 'Allreports', component: ReportingComponent },

  { path: 'login', component: LoginComponent,  },
  { path: 'logout', component: LogoutComponent },
  { path: '', pathMatch: 'full', redirectTo: '/login' }, 

  
  { path: 'user', component: UserComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'updateuser', component: UpdateUserComponent },
  //UserRole
  { path: 'userrole', component: UserRoleComponent },
  { path: 'adduserrole', component: AddUserRoleComponent },
  { path: 'updateuserrole/:id', component: UpdateUserRoleComponent },
  //Employee
  { path: 'employee', component: EmployeeComponent },
  { path: 'UpdateEmployee/:id', component: UpdateEmployeeComponent },
  { path: 'AddEmployee', component: AddEmployeeComponent },
  //Employee Attendance
  { path: 'Employee-Attendance', component: EmployeeAttendanceComponent },

   //Upload employee
  
  //Material
  { path: 'material', component: MaterialComponent },
  { path: 'UpdateMaterial/:id', component: UpdateMaterialComponent },
  { path: 'addMaterial', component: AddMaterialComponent },
  //Material Type
  { path: 'materialtype', component: MaterialTypeComponent },
  { path: 'UpdateMaterialType', component: UpdateMaterialTypeComponent },
  { path: 'AddMaterialType', component: AddMaterialTypeComponent },
  //Material Requst
  { path: 'materialRequest', component: MaterialRequestComponent },
  //Supplier
  { path: 'supplier', component: SupplierComponent },
  { path: 'UpdateSupplier/:id', component: UpdateSupplierComponent },
  { path: 'AddSupplier', component: AddSupplierComponent },

  //Supplier Type
  { path: 'suppliertype', component: SupplierTypeComponent },
  { path: 'UpdateSupplierType/:id', component: UpdateSupplierTypeComponent },
  { path: 'AddSupplierType', component: AddSupplierTypeComponent },

  //Supplier Order 
  { path: 'supplierOrder', component: SupplierOrderComponent },
  { path: 'addSupplierOrder', component: AddSupplierOrderComponent },
  { path: 'CancelOrder/:id', component: CancelOrderComponent },

  
  //Vehicle
  { path: 'vehicle', component: VehicleComponent },
  { path: 'addVehicle', component: AddVehicleComponent },
  { path: 'updateVehicle/:id', component: UpdateVehicleComponent },
  //Vehicle Type
  { path: 'vehicleType', component: VehicleTypeComponent },
  { path: 'addVehicleType', component: AddVehicleTypeComponent },
  { path: 'updateVehicleType', component: UpdateVehicleTypeComponent },
  //Vehicle allocation
  { path: 'vehicle-allocation', component: VehicleAllocationComponent },
  


  //Incident
  { path: 'incident', component: IncidentComponent },
  { path: 'addIncident', component: AddIncidentComponent },
  { path: 'updateIncident', component: UpdateIncidentComponent },
  //Projects
  { path: 'project', component: ProjectComponent },
  { path: 'addProject', component: AddProjectComponent },
  { path: 'UpdateProjectSafetyChecklist', component: UpdateProjectComponent },

  // Project staff
  { path: 'projectstaff', component: ProjectStaffComponent },
  { path: 'AddStaff', component: AddProjectStaffComponent },
  { path: 'updateProjectStaff/:id', component: UpdateProjectStaffComponent },


  //Clients
  { path: 'client', component: ClientComponent },
  { path: 'addClient', component: AddClientComponent },
  { path: 'updateClient', component: UpdateClientComponent },
  //Warehouses
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'addWarehouse', component: AddWarehouseComponent },
  { path: 'updateWarehouse/:id', component: UpdateWarehouseComponent },
  //Equipment
  { path: 'equipment', component: EquipmentComponent },
  { path: 'addEquipment', component: AddEquipmentComponent },
  { path: 'updateEquipment/:id', component: UpdateEquipmentComponent },
  //Safty Checklist
  { path: 'saftyChecklist', component: SaftyChecklistComponent },
  { path: 'addsaftyChecklist', component: AddSaftyChecklistComponent },
  { path: 'updatesaftyChecklist/:id', component: UpdateSaftyChecklistComponent },
  
  //Safty Checklist Category
  { path: 'saftyChecklistCatagory', component: SaftyChecklistCatagoryComponent },
  { path: 'UpdateSafetyChecklistCategory/:id', component: UpdateSaftyChecklistCatagoryComponent },
  { path: 'AddSafetyChecklistCategory', component: AddSaftyChecklistCatagoryComponent },
  
  //Safty Checklist Items
  {path: 'AddSaftyChecklist', component: AddSaftyChecklistComponent },

// reporting 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
