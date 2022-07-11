
import { User } from './../user/user.component';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

//Employee Interface
export interface employee {
  employeeId: number,
  documentId: number,
  name: string,
  email: string,
  contactNumber: number,
  document: null,
  projectEmp: null,
  users: null
}

export interface user {
  userId: number,
  userRole: number,
  employeeId: number,
  username: string,
  userPassword: string,


  /* userroleNavigation: null,
   equipmentchecks: [],
   stocktakes: [],
   tasks: [],
   userincidents: [],
   vehicles: []*/
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

//Material Request Interface/incomoplete
export interface materialRequest {
  projectmaterialrequestId: number,
  projectId: number,
  urgencylevelId: number,
  fulfillmenttype: string, 
  project: string,
  urgencylevel: string,
  projectmaterialrequestlists: []
}

//User Role Interface
export interface userrole {
  userrole1: number,
  description: string
}

//Supplier Interface
export interface supplier {
  supplierId: number,
  suppliertypeId: number,
  name: string,
  address: string,
  email: string,
  contactNumber: number,
  suppliertype: string,
  supplierorderlines: []
}

//Supplier Type Interface
export interface suppliertype {
  id: number,
  name: string,
  suppliers: []
}

//Supplier Order Interface
export interface supplierOrder {
  SupplierID: number,
  MaterialID: number,
  quanitity: number,
  address: string,
  material:string,
  supplier:string,
  deliveries:[]
}

//Vehicle Interface
export interface vehicle {
  vehicleId: number,
  vehicletypeId: number,
  make: string,
  model: string,
  year: string,
  color: string,
  status: string,
  DatePurchased: string,
  LastServiced: string,
  vehicletype: string,
}


//Vehicle Type Interface
export interface vehicletype {
  id: number,
  description: string,
  vehicles: []
}

//Incident Interface
export interface incident {
  incidentID: number,
  description: string,
  userIncidents: []
}

//Project Interface
export interface project {
  projectId: number,
  constructionsiteId: number,
  initialrequestId: number,
  safetyfilecreated: boolean,
  constructionsite: string,
  initialrequest: string,
  deliveries: [],
  invoices: [],
  projectemployees: [],
  projectequipments: [],
  projectmaterialrequests: [],
  projectmaterials : [],
  safetyfilechecklists: []
}

//Client Interface
export interface client {
  clientId: number,
  contactnumber: number,
  clientname: string,
  requests: []
}

//Warehouse Interface
export interface warehouse {
  warehouseId: number,
  name: string,
  location: string,
  warehouseequipments: [],
  warehousematerials: []
}

//Equipment Interface
export interface equipment {
  equipmentId: number,
  name: string,
  description: string,
  projectequipments: [],
  warehouseequipments: []
}

export interface tasktype{
  tasktypeId: number,
  description: string,
  tasks: []
}

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  //URL from API
  readonly Root_URL = 'https://localhost:5001/api'

  httpOptions = {
    headers: new HttpHeaders({
      contentType: 'application/json'
    })
  };

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
  //Add
  addUser(obj: any): Observable<any> {
    return this.http.post(this.Root_URL + '/User/CreateUser', obj);
  }
  //Update
  updateUser(payload: any, id: number) {
    return this.http.put(this.Root_URL.concat("User/" + "/" + id),
      payload,
      { reportProgress: true, observe: 'events' });
  }

  //UserRole
  //Get
  getUserRole(): Observable<userrole[]> {
    return this.http.get<userrole[]>(this.Root_URL + 'UserRole/Roles/GetAll')
  }

  //Update
  editUserRole(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/UserRole/EditUserRole/' + id;
    return this.http.put(endPointUrl, val);
  }
  //Update user role endpoint 

  //Delete
  deleteUserRole(id: number) {
    return this.http.delete(this.Root_URL + '/UserRole/RemoveUserRole/' + id);
  }
  //Add
  addUserRole(val: any) {
    return this.http.post(this.Root_URL + '/UserRole/AddRole', val)
  }

  //Employee

  //Get
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.Root_URL + '/Employee')
  }
  //add 
  addEmployee(val: any){

    return this.http.post(this.Root_URL + 'Employee/AddEmployee',val)
  }
  // update employee 

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
  //Add
  addMaterial(val: any) {
    return this.http.post(this.Root_URL + '/Material/CreateMaterial', val)
  }

  //Material Type
  //Get
  getMaterialType(): Observable<materialType[]> {
    return this.http.get<materialType[]>(this.Root_URL + '/Materialtype/GetMaterialtypes')
  }
  //Add
  addMaterialType(val: any) {
    return this.http.post(this.Root_URL + '/Materialtype/CreateMaterialtype', val)
  }

  //Update
  editMaterialType(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/Materialtype/UpdateMaterialtype/' + id;
    return this.http.put(endPointUrl, val);

    return this.http.get<materialType[]>(this.Root_URL + '/MaterialType/GetAll')
  }
  //Delete
  deleteMaterialType(id: number) {
    return this.http.delete(this.Root_URL + '/MaterialType/DeleteMaterialtype/' + id);
  }

  //Material Request
  //Get
  getMaterialRequets(): Observable<materialRequest[]> {
    return this.http.get<materialRequest[]>(this.Root_URL + '/Projectmaterialrequest/GetProjectmaterialrequests')
  }
  //Delete
  deleteMaterialRequest(id: number) {
    return this.http.delete(this.Root_URL + '/Projectmaterialrequest/DeleteProjectmaterialrequest/' + id);
  }

  //Supplier
getSupplierById(id:number){
  return this.http.get(this.Root_URL + '/Supplier/GetSupplierById/' + id);

}

  //Get All
  getSupplier(): Observable<supplier[]> {
    return this.http.get<supplier[]>(this.Root_URL + '/Supplier/GetSuppliers')
  }
  // add supplier
  addSupplier(val:any){
    return this.http.post(this.Root_URL + '/Supplier/AddSupplier',val);
  }

  //update supplier endpoint
  updateSupplier(id:number,data:any){
    return this.http.put(this.Root_URL + '/Supplier/updateSupplier/'+id,data);
    
  }

  //Delete
  deleteSupplier(id: number) {
    return this.http.delete(this.Root_URL + '/Supplier/' + id);
  }
  //Add
  // addSupplier(val: any) {
  //   return this.http.post(this.Root_URL + '/Supplier/CreateSupplier', val)
  //   }
  //GetBy ID
  SupplierID(id: number)
  {
    return this.http.get(this.Root_URL + '/Supplier/GetSupplier/' + id);
  }
  //Update
  UpdateSuplier(id: number, data: any){
    return this.http.put(this.Root_URL + '/Supplier/UpdateSupplier/' + id, data);
  }

  //Supplier Type
  //Get
  getSupplierType(): Observable<suppliertype[]> {
    return this.http.get<suppliertype[]>(this.Root_URL + '/SupplierType/GetAll')
  }

  //add 

  
  //update

  //Delete
  deleteSupplierType(id: number) {
    return this.http.delete(this.Root_URL + '/SupplierType/DeleteSuppliertype/' + id);
  }
  //Add
  addSupplierType(val: any) {
    return this.http.post(this.Root_URL + '/Suppliertype/CreateSuppliertype', val)
  }

  //Update
  editSupplierType(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/Suppliertype/UpdateSuppliertype/' + id;
    return this.http.put(endPointUrl, val);

  }

  //Supplier Order
  //Get
  getSupplierOrder(): Observable<supplierOrder[]> {
    return this.http.get<supplierOrder[]>(this.Root_URL + '/Supplierorderlines/GetSupplierorderlines')
  }
  //Delete
  deleteSupplierOrder(id: number) {
    return this.http.delete(this.Root_URL + '/Supplierorderlines/DeleteSupplierorderline/' + id);
  }

  //Vehicle
  //Get
  getVehicle(): Observable<vehicle[]> {
    return this.http.get<vehicle[]>(this.Root_URL + '/Vehicle/GetAllVehicles')
  }
  //Delete
  deleteVehicle(id: number) {
    return this.http.delete(this.Root_URL + '/Vehicle/DeleteVehicle/' + id);
  }


  //Vehicle Type
  //Get
  getVehicleType(): Observable<vehicletype[]> {
    return this.http.get<vehicletype[]>(this.Root_URL + '/Vehicletype/GetVehicletypes')
  }


  //Add
  addVehicleType(val: any) {
    return this.http.post(this.Root_URL + '/api/Vehicletype/CreateVehicletype', val)

  }

  //Update
  editVehicleType(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/Vehicletype/UpdateVehicletype/' + id;
    return this.http.put(endPointUrl, val);

  }
  
 
  //Delete
  deleteVehicleType(id: number) {
    return this.http.delete(this.Root_URL + '/VehicleType/DeleteEmployee/' + id);
  }

  //Incident
  //Get
  getIncident(): Observable<incident[]> {
    return this.http.get<incident[]>("https://localhost:44381/api/incident/getincidents")
  }

  //Add
  addIncident(val: any) {
    return this.http.post("https://localhost:44381/api/incident/createincident", val)

  }

  //Update
  editIncident(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = "https://localhost:44381/api/incident/updateincident" + id;
    return this.http.put(endPointUrl, val);

  }
  

  //Delete
  deleteIncident(id: number) {
    return this.http.delete("https://localhost:44381/api/incident/deleteincident" + id);
  }

  //Projects
  //Get
  getProject(): Observable<project[]> {
    return this.http.get<project[]>(this.Root_URL + '/Project/GetProjects')
  }
  //Delete
  deleteProject(id: number) {
    return this.http.delete(this.Root_URL + '/Project/DeleteProject/' + id);
  }

  //Clients
  //Get
  getClients(): Observable<client[]> {
    return this.http.get<client[]>(this.Root_URL + '/Client/GetClients')
  }
  //Delete
  deleteClient(id: number) {
    return this.http.delete(this.Root_URL + '/Client/DeleteClient/' + id);
  }

  //Warehouse
  //Get
  getWarehouses(): Observable<warehouse[]> {
    return this.http.get<warehouse[]>(this.Root_URL + '/Warehouse/GetWarehouses')
  }
  //Delete
  deleteWarehouse(id: number) {
    return this.http.delete(this.Root_URL + '/Warehouse/DeleteWarehouse/' + id);
  }

  //Equipment
  //Get
  getEquipment(): Observable<equipment[]> {
    return this.http.get<equipment[]>(this.Root_URL + '/Equipment/GetEquipments')
  }
  //get by Id
getEquipmentById(id:number){
  return this.http.get(this.Root_URL + '/Equipment/GetEquipmentById/' + id);

}
//add equipment
addEquipment(val:any){
  return this.http.post(this.Root_URL + '/Equipment/AddEquipment',val);
}
//Update
UpdateEquipment(id: number, data: any){
  return this.http.put(this.Root_URL + '/Equipment/UpdateEquipment/' + id, data);
}

  //Delete
  deleteEquipment(id: number) {
    return this.http.delete(this.Root_URL + '/Equipment/DeleteEquipment/' + id);
  }
  //Vehicle End Points 
  // add 
  addVehicle(val:any){
    return this.http.post(this.Root_URL + '/Vehicle/AddVehicle',val)
  }
  // Get All
  //Update 
  //Delete


  //Task Type
  //Get
  getTaskType(): Observable<tasktype[]> {
    return this.http.get<tasktype[]>("https://localhost:44381/api/tasktype/gettasktypes")
  }


  //Add
  addTaskType(val: any) {
    return this.http.post("https://localhost:44381/api/tasktype/createtasktype", val)

  }

  //Update
  editTaskType(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = "https://localhost:44381/api/tasktype/updatetasktype"+ id;
    return this.http.put(endPointUrl, val);

  }
  
 
  //Delete
  deleteTaskType(id: number) {
    return this.http.delete("https://localhost:44381/api/tasktype/deletetasktype" + id);
  }




}
