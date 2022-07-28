import { WarehouseEquipmentComponent } from './warehouse/warehouse-equipment/warehouse-equipment.component';
import { UpdateCheckListComponent } from './safty-checklist/update-check-list/update-check-list.component';
import { AddCheckListComponent } from './safty-checklist/add-check-list/add-check-list.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { AddWarehouseComponent } from './warehouse/add-warehouse/add-warehouse.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ClientComponent } from './client/client.component';
import { ProjectComponent } from './project/project.component';
import { IncidentComponent } from './incident/incident.component';
import { SupplierOrderComponent } from './supplier/supplier-order/supplier-order.component';
import { MaterialRequestComponent } from './material/material-request/material-request.component';
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
import { AddEquipmentComponent } from './equipment/add-equipment/add-equipment.component';
import { UpdateEquipmentComponent } from './equipment/update-equipment/update-equipment.component';
import { UpdateWarehouseComponent } from './warehouse/update-warehouse/update-warehouse.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { AddIncidentComponent } from './incident/add-incident/add-incident.component';
import { UpdateIncidentComponent } from './incident/update-incident/update-incident.component';
import { SaftyChecklistComponent } from './safty-checklist/safty-checklist.component';
import { SaftyChecklistCatagoryComponent } from './safty-checklist/safty-checklist-catagory/safty-checklist-catagory.component';
import { SaftyChecklistItemsComponent } from './safty-checklist/safty-checklist-catagory/safty-checklist-items/safty-checklist-items.component';
import { AddSaftyChecklistItemsComponent } from './safty-checklist/safty-checklist-catagory/safty-checklist-items/add-safty-checklist-items/add-safty-checklist-items.component';
import { UpdateSaftyChecklistItemsComponent } from './safty-checklist/safty-checklist-catagory/safty-checklist-items/update-safty-checklist-items/update-safty-checklist-items.component';

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
  //Vehicle
  { path: 'vehicle', component: VehicleComponent },
  { path: 'addVehicle', component: AddVehicleComponent },
  { path: 'updateVehicle', component: UpdateVehicleComponent },
  //Vehicle Type
  { path: 'vehicleType', component: VehicleTypeComponent },
  { path: 'addVehicleType', component: AddVehicleTypeComponent },
  { path: 'updateVehicleType', component: UpdateVehicleTypeComponent },
  //Incident
  { path: 'incident', component: IncidentComponent },
  { path: 'addIncident', component: AddIncidentComponent },
  { path: 'updateIncident', component: UpdateIncidentComponent },
  //Projects
  { path: 'project', component: ProjectComponent },
  { path: 'addProject', component: AddProjectComponent },
  { path: 'updateProject', component: UpdateProjectComponent },
  //Clients
  { path: 'client', component: ClientComponent },
  { path: 'addClient', component: AddClientComponent },
  { path: 'updateClient', component: UpdateClientComponent },
  //Warehouses
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'addWarehouse', component: AddWarehouseComponent },
  { path: 'updateWarehouse', component: UpdateWarehouseComponent },
  //Qarehouse Equipment Check
  { path: 'warehouseEquipment', component: WarehouseEquipmentComponent },
  { path: 'addWarehouseEquipment', component: AddWarehouseComponent },
  { path: 'updateWarehouseEquipment', component: UpdateWarehouseComponent },
  //Equipment
  { path: 'equipment', component: EquipmentComponent },
  { path: 'addEquipment', component: AddEquipmentComponent },
  { path: 'updateEquipment/:id', component: UpdateEquipmentComponent },
  //Safty Checklist
  { path: 'saftyChecklist', component: SaftyChecklistComponent },
  { path: 'addsaftyChecklist', component: AddCheckListComponent },
  { path: 'updatesaftyChecklist/:id', component: UpdateCheckListComponent },
  //Safty Checklist Caragory
  { path: 'saftyChecklistCatagory', component: SaftyChecklistCatagoryComponent },
  //Safty Checklist Items
  { path: 'saftyChecklistItems', component: SaftyChecklistItemsComponent },
  { path: 'addsaftyChecklistItems', component: AddSaftyChecklistItemsComponent },
  { path: 'updatesaftyChecklistItems/:id', component: UpdateSaftyChecklistItemsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
