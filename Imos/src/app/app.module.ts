
import { AddMaterialRequestComponent } from './project/project-material-request/add-material-request/add-material-request.component';
import { ServiceService } from './services/service.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {getMatInputUnsupportedTypeError, MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { PopUpComponent } from './logout/pop-up/pop-up.component';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './login/Dialogs/success/success.component';
import { UnsuccessfulComponent } from './login/Dialogs/unsuccessful/unsuccessful.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';



import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { UserComponent } from './user/user.component';
import { AddUserRoleComponent } from './user/user-role/add-user-role/add-user-role.component';
import { UpdateUserRoleComponent } from './user/user-role/update-user-role/update-user-role.component';
import { UserRoleComponent } from './user/user-role/user-role.component';
import { MaterialComponent } from './material/material.component';
import { SupplierComponent } from './supplier/supplier.component';
import { MaterialTypeComponent } from './material/material-type/material-type.component';
import { SupplierTypeComponent } from './supplier/supplier-type/supplier-type.component';
import { AddMaterialComponent } from './material/add-material/add-material.component';
import { UpdateMaterialComponent } from './material/update-material/update-material.component';
import { UpdateMaterialTypeComponent } from './material/material-type/update-material-type/update-material-type.component';
import { AddMaterialTypeComponent } from './material/material-type/add-material-type/add-material-type.component';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { UpdateSupplierComponent } from './supplier/update-supplier/update-supplier.component';
import { UpdateSupplierTypeComponent } from './supplier/supplier-type/update-supplier-type/update-supplier-type.component';
import { AddSupplierTypeComponent } from './supplier/supplier-type/add-supplier-type/add-supplier-type.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import {AddUserComponent} from 'src/app/user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { UpdateVehicleComponent } from './vehicle/update-vehicle/update-vehicle.component';
import { VehicleTypeComponent } from './vehicle/vehicle-type/vehicle-type.component';
import { AddVehicleTypeComponent } from './vehicle/vehicle-type/add-vehicle-type/add-vehicle-type.component';
import { UpdateVehicleTypeComponent } from './vehicle/vehicle-type/update-vehicle-type/update-vehicle-type.component';

import { IncidentComponent } from './incident/incident.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { ProjectComponent } from './project/project.component';
import { ClientComponent } from './client/client.component';
import { WarehouseComponent } from './warehouse/warehouse.component';

import { SupplierOrderComponent } from './supplier/supplier-order/supplier-order.component';
import { AddEquipmentComponent } from './equipment/add-equipment/add-equipment.component';
import { UpdateEquipmentComponent } from './equipment/update-equipment/update-equipment.component';
import { UpdateWarehouseComponent } from './warehouse/update-warehouse/update-warehouse.component';
import { AddWarehouseComponent } from './warehouse/add-warehouse/add-warehouse.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { UpdateClientComponent } from './client/update-client/update-client.component';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { AddIncidentComponent } from './incident/add-incident/add-incident.component';
import { UpdateIncidentComponent } from './incident/update-incident/update-incident.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { UpdateTaskComponent } from './task/update-task/update-task.component';
import { TaskTypeComponent } from './task/task-type/task-type.component';
import { AddTaskTypeComponent } from './task/task-type/add-task-type/add-task-type.component';
import { UpdateTaskTypeComponent } from './task/task-type/update-task-type/update-task-type.component';
import { ProjectStaffComponent } from './project/project-staff/project-staff.component';
import { AddProjectStaffComponent } from './project/project-staff/add-project-staff/add-project-staff.component';
import { UpdateProjectStaffComponent } from './project/project-staff/update-project-staff/update-project-staff.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SaftyChecklistComponent } from './safty-checklist/safty-checklist.component';
import { AddSaftyChecklistComponent } from './safty-checklist/add-safty-checklist/add-safty-checklist.component';
import { UpdateSaftyChecklistComponent } from './safty-checklist/update-safty-checklist/update-safty-checklist.component';
import { SaftyChecklistCatagoryComponent } from './safty-checklist/safty-checklist-catagory/safty-checklist-catagory.component';
import { SaftyChecklistItemsComponent } from './safty-checklist/safty-checklist-catagory/safty-checklist-items/safty-checklist-items.component';
import { AddSaftyChecklistItemsComponent } from './safty-checklist/safty-checklist-catagory/safty-checklist-items/add-safty-checklist-items/add-safty-checklist-items.component';
import { UpdateSaftyChecklistItemsComponent } from './safty-checklist/safty-checklist-catagory/safty-checklist-items/update-safty-checklist-items/update-safty-checklist-items.component';
import { AddSaftyChecklistCatagoryComponent } from './safty-checklist/safty-checklist-catagory/add-safty-checklist-catagory/add-safty-checklist-catagory.component';
import { UpdateSaftyChecklistCatagoryComponent } from './safty-checklist/safty-checklist-catagory/update-safty-checklist-catagory/update-safty-checklist-catagory.component';
import { ClientRequestComponent } from './client-request/client-request.component';
import { AddRequestComponent } from './client-request/add-request/add-request.component';
import { UpdateRequestComponent } from './client-request/update-request/update-request.component';


import { UpdateMaterialRequestComponent} from './project/project-material-request/update-material-request/update-material-request.component';
import { ViewMaterialRequestDetailsComponent} from './project/project-material-request/view-material-request-details/view-material-request-details.component';
import { BasketMaterialComponent } from './project/project-material-request/basket-material/basket-material.component';
import { UrgencyLevelComponent } from './project/project-material-request/urgency-level/urgency-level.component';
import { AddUrgencyLevelComponent } from './project/project-material-request/urgency-level/add-urgency-level/add-urgency-level.component';
import { UpdateUrgencyLevelComponent } from './project/project-material-request/urgency-level/update-urgency-level/update-urgency-level.component';
import { ReportComponent } from './report/report.component';
import { MaterialRequestReportViewComponent } from './report/material-request-report-view/material-request-report-view.component';
import { RequestcountreportComponent } from './report/requestcountreport/requestcountreport.component';
import { NgChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Component } from '@angular/core';
import {UploadVehiclePhotoComponent} from './vehicle/upload-vehicle-photo/upload-vehicle-photo.component';


import { ProjectMaterialRequestComponent} from './project/project-material-request/project-material-request.component';
import { UnassignedVehicleViewComponent } from './vehicle/unassigned-vehicle-view/unassigned-vehicle-view.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ApprovedRequestReportViewComponent } from './report/approved-request-report-view/approved-request-report-view.component';
import { DemoUtilsModule } from '../app/demo-utils/module';
import { MaterialRequestStatusComponent } from './project/project-material-request/material-request-status/material-request-status.component';
import { AddMaterialRequestStatusComponent } from './project/project-material-request/material-request-status/add-material-request-status/add-material-request-status.component';
import { UpdateMaterialRequestStatusComponent } from './project/project-material-request/material-request-status/update-material-request-status/update-material-request-status.component';

const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatListModule
];



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeComponent,
    VehicleComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    PopUpComponent,
    HomeComponent,
    SuccessComponent,
    UnsuccessfulComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent,
    UserComponent,
    AddUserRoleComponent,
    UpdateUserRoleComponent,
    UserRoleComponent,
    MaterialComponent,
    SupplierComponent,
    MaterialTypeComponent,
    SupplierTypeComponent,
    AddMaterialComponent,
    UpdateMaterialComponent,
    UpdateMaterialTypeComponent,
    AddMaterialTypeComponent,
    AddSupplierComponent,
    UpdateSupplierComponent,
    UpdateSupplierTypeComponent,
    AddSupplierTypeComponent,
    AddUserComponent,
    UpdateUserComponent,
    AddVehicleComponent,
    UpdateVehicleComponent,
    VehicleTypeComponent,
    AddVehicleTypeComponent,
    UpdateVehicleTypeComponent,
    IncidentComponent,
    EquipmentComponent,
    ProjectComponent,
    ClientComponent,
    WarehouseComponent,
    SupplierOrderComponent,
    AddEquipmentComponent,
    UpdateEquipmentComponent,
    UpdateWarehouseComponent,
    AddWarehouseComponent,
    AddClientComponent,
    UpdateClientComponent,
    UpdateProjectComponent,
    AddProjectComponent,
    AddIncidentComponent,
    UpdateIncidentComponent,
    TaskComponent,
    AddTaskComponent,
    UpdateTaskComponent,
    TaskTypeComponent,
    AddTaskTypeComponent,
    UpdateTaskTypeComponent,
    ProjectStaffComponent,
    AddProjectStaffComponent,
    UpdateProjectStaffComponent,
    SaftyChecklistComponent,
    AddSaftyChecklistComponent,
    UpdateSaftyChecklistComponent,
    SaftyChecklistCatagoryComponent,
    SaftyChecklistItemsComponent,
    AddSaftyChecklistItemsComponent,
    UpdateSaftyChecklistItemsComponent,
    AddSaftyChecklistCatagoryComponent,
    UpdateSaftyChecklistCatagoryComponent,
    ClientRequestComponent,
    AddRequestComponent,
    UpdateRequestComponent,
    ProjectMaterialRequestComponent,
    UpdateMaterialRequestComponent,
    ViewMaterialRequestDetailsComponent,
    AddMaterialRequestComponent,
    BasketMaterialComponent,
    UrgencyLevelComponent,
    AddUrgencyLevelComponent,
    UpdateUrgencyLevelComponent,
    ReportComponent,
    MaterialRequestReportViewComponent,
    RequestcountreportComponent,
    UnassignedVehicleViewComponent,
    UploadVehiclePhotoComponent,
    ApprovedRequestReportViewComponent,
    MaterialRequestStatusComponent,
    AddMaterialRequestStatusComponent,
    UpdateMaterialRequestStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    HttpClientModule,
    MatToolbarModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatListModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    DemoUtilsModule,
  ],
  providers: [
    ServiceService,
    MatDialogModule, { provide: MAT_DIALOG_DATA, useValue: {} }, { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
