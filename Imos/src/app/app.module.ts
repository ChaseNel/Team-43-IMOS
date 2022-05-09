import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

//Angular Material Files
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { PopUpComponent } from './logout/pop-up/pop-up.component';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './login/Dialogs/success/success.component';
import { UnsuccessfulComponent } from './login/Dialogs/unsuccessful/unsuccessful.component';
import { UserComponent } from './user/user.component';
import { UserRoleComponent } from './user-role/user-role.component';

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
    HomeComponent,
    UserComponent,
    UserRoleComponent,

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
    HttpClientModule
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
