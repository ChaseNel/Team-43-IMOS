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
  document: string,
  projectemployees: [],
  users: [],
}
//User Role Interface
export interface userrole {
  id: string,
  description: string,
  users: []
}

export interface user {
  userId: number,
  userRoleId: number,
  employeeId: number,
  username: string,
  userPassword: string,
  employee:string,
  userrole:string,
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
  suppliermaterialorders: [],
  suppliermaterials:[],
  taskmaterials: [],
  warehousematerials: []
}

//Material Type Interface
export interface materialtype {
  materialtypeId: number,
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



//Supplier Interface
export interface supplier {
  id: number,
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

//Supplier Order 
export interface  orderline {
  orderId: number,
  date:Date,
  orderNumber:string,
  deliveries:[],
  suppliermaterialorders:[],
  suppliersordersuppliers:[]
}
//suppliermaterial
export interface suppliermaterial{
  materialId: number,
  material: string,
  supplierId: number,
  supplier: string

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
//Construction Site Interface
export interface constructionSite {
  constructionsiteId: number,
  address: string,
  projects: []
}


//Project Interface
export interface project {
  projectId: number,
  name:string,
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
  projectmaterials: [],
  safetyfilechecklists: []
}

//requests 
export interface request{
  requestId:number,
  clientId:number,
  description:string,
  client:string,
  projects:[]

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
  id: number,
  name: string,
  location: string,
  warehouseequipments: [],
  materials: []
}

// add all project,safetychecklist,checklist Item  category 

export interface safetyitemcategory {
  id: number,
  categoryName: string,
  safetyfileitems: [],
}

export interface safetyItem {
  safetyfileitemId:number,
  name:string,
  safetyitemcategoryId:number,
  safetyitemcategory:string,
  safetyfilechecklists:[]
}

//Equipment Interface
export interface equipment {
  equipmentId: number,
  name: string,
  description: string,
  projectequipments: [],
  warehouseequipments: []
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
    return this.http.get<user[]>(this.Root_URL + '/User/GetAll/Users')
  }
  //Delete
  deleteUser(id: number) {
    return this.http.delete(this.Root_URL + '/User/DeleteUser/' + id);
  }
  //Add
  registerUser(obj: any): Observable<any> {
    return this.http.post(this.Root_URL + '/User', obj);
  }
  //Update
  updateUser(payload: any, id: number) {
    return this.http.put(this.Root_URL.concat("User/" + "/" + id),
      payload,
      { reportProgress: true, observe: 'events' });
  }

  //UserRoles Htttp Requests 
  //Get
  getUserRole(): Observable<userrole[]> {
    return this.http.get<userrole[]>(this.Root_URL + '/UserRole/Roles/GetAll')
  }
  //get by Id
  getUserRoleById(id:number){
    return this.http.get(this.Root_URL + '/UserRole/GetUserRole/' + id);
  }
  //Update
  editUserRole(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/UserRole/EditUserRole/' + id;
    return this.http.put(endPointUrl, val);
  }
  //Delete
  deleteUserRole(id: number) {
    return this.http.delete(this.Root_URL + '/RemoveUserRole/' + id);
  }
  //Add
  addUserRole(val: any) {
    return this.http.post(this.Root_URL + '/UserRole/AddRole/', val)
  }





  //Employee Http requests 
  //get By Id
  getEmployeeById(id:number){
    return this.http.get(this.Root_URL + '/Employee/GetEmployeeById/' + id);
  }

  //Get
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.Root_URL + '/Employee')
  }
  //add 
  addEmployee(val: any){
    return this.http.post(this.Root_URL + '/Employee/AddEmployee',val)
  }
  // update employee 
  updateEmployee(id:number,data:any){
    return this.http.put(this.Root_URL + '/Employee/updateEmployee/'+id,data);
  }

  //Delete
  deleteEmployee(id: number) {
    return this.http.delete(this.Root_URL + '/Employee/DeleteEmployee/' + id);
  }

  //Material Http requests 
  //getById

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
    return this.http.post(this.Root_URL + '/Material/AddMaterial', val)
  }
  // update material
  updateMaterial(id:number,data:any){
    return this.http.put(this.Root_URL + '/Material/updateMaterial/'+id,data);
    
  }

  //Material Type  Http requests 
  //Get
  getMaterialType(): Observable<materialtype []> {
    return this.http.get<materialtype []>(this.Root_URL + '/MaterialType/GetAll')
  }
  //getById

  //Add
  addMaterialType(val: any) {
    return this.http.post(this.Root_URL + '/MaterialType/AddMaterialType', val)
  }
  //Update
  editMaterialType(id:number,data:any){
    return this.http.put(this.Root_URL + '/MaterialType/UpdateType/'+id,data);
  }
  //Delete
  deleteMaterialType(id: number) {
    return this.http.delete(this.Root_URL + '/MaterialType/DeleteType/' + id);
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
    return this.http.post(this.Root_URL + '/Suppliertype/AddType', val)
  }

  //Update
  editSupplierType(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/Suppliertype/UpdateSuppliertype/' + id;
    return this.http.put(endPointUrl, val);

  }

  //Supplier Order Http Requests
  //Get All
  getSupplierOrder(): Observable< orderline[]> {
    return this.http.get< orderline[]>(this.Root_URL + '/Supplierorderlines/GetSupplierorderlines')
  }
  // add new order

  //Delete OR Cancel Order
  deleteSupplierOrder(id: number) {
    return this.http.delete(this.Root_URL + '/Supplierorderlines/DeleteSupplierorderline/' + id);
  }

  //Vehicle Http requests 
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
    return this.http.get<vehicletype[]>(this.Root_URL + '/VehicleType/GetAll')
  }


  //Add
  addVehicleType(val: any) {
    return this.http.post(this.Root_URL + '/Vehicletype/CreateVehicletype', val)

  }

  //Update
  editVehicleType(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/Vehicletype/UpdateVehicletype/' + id;
    return this.http.put(endPointUrl, val);

  }
  
  // add vehicle
  //Delete
  deleteVehicleType(id: number) {
    return this.http.delete(this.Root_URL + '/VehicleType/DeleteEmployee/' + id);
  }

  //Vehicle Allocations 
  //Get All  Not assigned 
  getAlllVehiclesNotAssigned(){
    return this.http.get<vehicle[]>(this.Root_URL + '/VehicleAllocation/GetAll/NotAssigned')

  }


  //Incident
  //Get
  getInicdent(): Observable<incident[]> {
    return this.http.get<incident[]>(this.Root_URL + '/Incident/GetIncidents')
  }
  //Delete
  deleteIncident(id: number) {
    return this.http.delete(this.Root_URL + '/Incident/DeleteIncident/' + id);
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
  //getById
  getWarehouseById(id:number){
    return this.http.get(this.Root_URL + '/Warehouse/GetWarehouseById/' + id);
  }
  //Get
  getWarehouses(): Observable<warehouse[]> {
    return this.http.get<warehouse[]>(this.Root_URL + '/Warehouse/GetAll')
  }
  //add warehouse
  addWarehouse(val:any){
    return this.http.post(this.Root_URL + '/Warehouse/AddWarehouse',val);
  }
  //update warehouse
  UpdateWarehouse(id: number, data: any){
    return this.http.put(this.Root_URL + '/Warehouse/UpdateWarehouse/' + id, data);
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
  //getById
  getVehicleById(id:number){
    return this.http.get(this.Root_URL + '/Vehicle/GetVehicleById/' + id);
  }
  //Update 
  updateVehicle(id:number,data:any){
    return this.http.put(this.Root_URL + '/Vehicle/UpdateVehicle/' + id, data)
  }
  //Delete


  // SafetyCategory 
  //Get
  getSafetyCategory(): Observable<safetyitemcategory[]> {
    return this.http.get<safetyitemcategory[]>(this.Root_URL + '/SafetyItemCategory/GetAll')
  }
   //Add 
  addSafetyCategory(val:any){
    return this.http.post(this.Root_URL + '/SafetyItemCategory/AddCategory', val)
}
  // put 

   //Delete
   deleteSafetyItemCategory(id: number) {
    return this.http.delete(this.Root_URL + '/SafetyItemCategory/DeleteSafetyItemCategory/' + id);
  }

  //SafetyFile 
  //SafetyChecklist 
  //Get All
  getProjectChecklist(): Observable<safetyItem[]> {
    return this.http.get<safetyItem[]>(this.Root_URL + '/SafetyFileItem/GetProjectChecklist/GetAll')
  }
  //getById

  //Add
  //update

  // deleteProjectSafetyChecklist
  deleteProjectSafetyChecklist(id: number) {
    return this.http.delete(this.Root_URL + '/SafetyChecklist/' + id);
  }

  //Construction Site
  //Get
  getConstructionSite(): Observable<constructionSite[]> {
    return this.http.get<constructionSite[]>(this.Root_URL + '/Constructionsite/GetConstructionsites')
  }
  //Add
  addConstructionSite(val: any) {
    return this.http.post(this.Root_URL + '/Constructionsite/CreateConstructionsite', val)
  }

  //Update
  editConstructionSite(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/Constructionsite/UpdateConstructionsite/' + id;
    return this.http.put(endPointUrl, val);

    return this.http.get<materialtype[]>(this.Root_URL + '/Constructionsite/GetConstructionsites')
  }
  //Delete
  deleteConstructionSite(id: number) {
    return this.http.delete(this.Root_URL + '/Constructionsite/DeleteConstructionsite/' + id);
  }
  //add Project
  addProject(val: any) {
    return this.http.post(this.Root_URL + '/Project/AddProject', val);
  }

  // Request HttpRequest
  getRequest(): Observable<request[]> {
    return this.http.get<request[]>(this.Root_URL + '/Request/GetAll')
  }

  // Project Staff 
  getProjectStaff(): Observable<employee[]> {
    return this.http.get<employee[]>(this.Root_URL + '/Project/EmployeeStaff')
  }
  addProjectEmployee(val:any){
    return this.http.post(this.Root_URL + '/ProjectEmployee/Assign',val);
  }
}
