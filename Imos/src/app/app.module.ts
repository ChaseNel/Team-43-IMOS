import { ServiceService } from './services/service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from "@angular/common/http";
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
import {MatGridListModule} from '@angular/material/grid-list';
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

@NgModule({
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
    CommonModule
  ],
  providers: [
    ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
