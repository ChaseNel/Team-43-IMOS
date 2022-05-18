import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Employee Interface
export interface employee {
  employeeID: number,
  documentId: number,
  name: string,
  email: string,
  contactNumber: number,
  document: null,
  projectEmp: null,
  users: null
}

//User Interface
export interface user {
  userId: number,
  userRole: number,
  employeeId: number,
  userName: string,
  userPassword: string,
  employee: null,
  userroleNavigation: null,
  equipmentchecks: [],
  stocktakes: [],
  tasks: [],
  userincidents: [],
  vehicles: []
}

//Material Interface
export interface material {
  materialId: number,
  materialtypeId: number,
  name: string,
  description: string,
  materialtype: string,
  projectmaterialrequestlists: [],
  projectmaterials: [],
  supplierorderlines: [],
  taskmaterials: [],
  warehousematerials: [],
}

//Material Type Interface
export interface materialType {
  materialTypeID: number,
  name: string,
  description: string,
  materials: []
}

//User Role Interface
export interface userrole {
  userRole: number,
  description: string
}

//Supplier Interface
export interface supplier {
  supplierId: number,
  suppliertypeId: number,
  name: string,
  address: string,
  email: string,
  contactnumber: number,
  suppliertype: string,
  supplierorderlines: []
}

//Supplier Type Interface
//User Role Interface
export interface suppliertype {
  suppliertypeId: number,
  Material: string,
  suppliers: []
}


@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  //URL from API
  readonly Root_URL = 'https://localhost:44381/api'

  constructor(private http: HttpClient) {
  }

  //User
  //Get
  getUser(): Observable<user[]> {
    return this.http.get<user[]>(this.Root_URL + '/User')
  }
  //Delete
  deleteUser(id: number) {
    return this.http.delete(this.Root_URL + '/User/DeleteUser/' + id);
  }

  //UserRole
  //Get
  getUserRole(): Observable<userrole[]> {
    return this.http.get<userrole[]>(this.Root_URL + '/UserRole/Roles/GetAll')
  }
  //Delete
  deleteUserRole(id: number) {
    return this.http.delete(this.Root_URL + '/UserRole/RemoveUserRole/' + id);
  }

  //UserRole
  //Add
  addUserRole(val: any){

    return this.http.post(this.Root_URL + '/UserRole/AddRole',val)
  }

  //Employee
  //Get
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.Root_URL + '/Employee')
  }
  //Delete
  deleteEmployee(id: number) {
    return this.http.delete(this.Root_URL + '/Employee/DeleteEmployee/' + id);
  }


  //Material
  //Get
  getMaterial(): Observable<material[]> {
    return this.http.get<material[]>(this.Root_URL + '/Material/GetMaterials')
  }
  //Delete
  deleteMaterial(id: number) {
    return this.http.delete(this.Root_URL + '/Material/DeleteMaterial/' + id);
  }

  //Material Type
  //Get
  getMaterialType(): Observable<materialType[]> {
    return this.http.get<materialType[]>(this.Root_URL + '/MaterialType/GetMaterialtypes')
  }
  //Delete
  deleteMaterialType(id: number) {
    return this.http.delete(this.Root_URL + '/MaterialType/DeleteMaterialtype/' + id);
  }

  //Supplier
  //Get
  getSupplier(): Observable<supplier[]> {
    return this.http.get<supplier[]>(this.Root_URL + '/Supplier/GetSuppliers')
  }
  //Delete
  deleteSupplier(id: number) {
    return this.http.delete(this.Root_URL + '/Supplier/DeleteSupplier/' + id);
  }

  //Supplier Type
  //Get
  getSupplierType(): Observable<suppliertype[]> {
    return this.http.get<suppliertype[]>(this.Root_URL + '/SupplierType/GetSuppliertype')
  }
  //Delete
  deleteSupplierType(id: number) {
    return this.http.delete(this.Root_URL + '/SupplierType/DeleteSuppliertype/' + id);
  }
}


