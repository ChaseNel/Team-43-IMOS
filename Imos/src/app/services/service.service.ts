


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
  id: number,
  materialtypeId: number,
  name: string,
  description: string,
  materialtype: string,
  projectmaterialrequestlists: [],
  projectmaterials: [],

}

//Material Type Interface
export interface materialType {
  materialTypeID: number,
  name: string,
  description: string,
  materials: []
}


export interface ViewMatarialRequest{
    materialTypeName: string,
    quantity: number
    materialName: string,
    description: string
}

export interface ReportMaterialRequest{

  clientName: string,
  urgencyLevelName: string,
  statusName: string,
  materialCount: number,
  requestDate :string,
}



export interface ProjectMaterialRequest{

  materialRequestId: number,
  projectId: number,
  urgencylevelName: string,
  fulfillmenttype: number,
  RequestDate :string,
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

export interface UrgencyLevel{
  id : number,
  level: string,
  description: string
}

export interface MaterialRequestStatus{
  id : number,
  name: string,
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
  CLIENT_ID: number,
  CONTACTNUMBER: number,
  CLIENTNAME: string,
  CLIENTEMAIL:string,

}

export interface ClientRequest{
REQUEST_ID:number,
CLIENT_ID:number,
DESCRIPTION: string,
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

// safety checklist
export interface safetychecklist {
}

// SafetyCategory
//Supplier Type Interface Safetyitemcategory
export interface safetyitemcategory {
  id: number,
  name: string,
  Safetyfileitems: []
}
export interface safetyfileitems{

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

 /* AddClient(addClient: client){
    return this.http.post(`${this.Root_URL}/Client/AddClient`, addClient, this.httpOptions)
  }*/





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



  addUrgencylvl(val: any) {
    return this.http.post(this.Root_URL + '/ProjectMaterialRequest/AddUrgencyLvl', val)
  }

  deleteUrgencylvl(id: number) {
    return this.http.delete(this.Root_URL + '/ProjectMaterialRequest/DeleteUrgencylvl/' + id);
  }

  getUrgencylvl(): Observable<UrgencyLevel[]> {
    return this.http.get<[UrgencyLevel]>(this.Root_URL + '/ProjectMaterialRequest/GetAllUrgencyLvl')
  }

  updateUgencylvl(id:number,data:any){
    return this.http.put(this.Root_URL + '/ProjectMaterialRequest/UpdateUrgencyLvl/'+id,data);

  }








  //Material Request
  //Get
  getMaterialRequets(): Observable<materialRequest[]> {
    return this.http.get<materialRequest[]>(this.Root_URL + '/Projectmaterialrequest/GetProjectmaterialrequests')
  }


  getMaterialRequetsDetails(id: number): Observable<ViewMatarialRequest[]> {
    return this.http.get<ViewMatarialRequest[]>(this.Root_URL + '/ProjectMaterialRequest/ViewRequestDetails/' + id)
  }

  getMaterialRequetsReport(id: number): Observable<ReportMaterialRequest[]> {
    return this.http.get<ReportMaterialRequest[]>(this.Root_URL + '/ProjectMaterialRequestReportsController1/GetMaterialRequesytByStatus/' + id)
  }



  //Delete
  deleteMaterialRequest(id: number) {
    return this.http.delete(this.Root_URL + '/ProjectMaterialRequest/DeleteMaterialRequest/' + id);
  }

  AddMaterialRequest(basketMaterials: any){
    return this.http.post(this.Root_URL + `/ProjectMaterialRequest/CreateMaterialRequest/${basketMaterials.projectid}/${basketMaterials.urgencyLevelId}/` , basketMaterials.basketMaterial);
  }





  createOrder(basketMaterials: any): Observable<any> {
    return this.http
      .post<any>(`${this.Root_URL}ProjectMaterialRequest/CreateMaterialRequest`, basketMaterials);
  }



  addProjMatRequest(basketMaterials: any, ) {
    return this.http.post(this.Root_URL + '/ProjectMaterialRequest/CreateMaterialRequest/', basketMaterials)
  }

  /*ManageRequestStatus(StatusDetails: any){
    return this.http.put(this.Root_URL + `/ProjectMaterialRequest/ManageMaterialRequestStatus/${StatusDetails.projectmaterialrequestId}/${StatusDetails.projectmaterialrequeststatusId}/`);
  }*/

  ManageRequestStatus( data: any) {
    return this.http.put(this.Root_URL + `/ProjectMaterialRequest/ManageMaterialRequestStatus/${data.projectmaterialrequestId}/${data.projectmaterialrequeststatusId}/`,{} );
  }










  placeOrder( val: any,projectid: number, urgencyLevelId:number, fulfillment:number) {
    return this.http.post(this.Root_URL.concat("ProjectMaterialRequest/CreateMaterialRequest/" + val + projectid + urgencyLevelId + fulfillment),
      { reportProgress: true, observe: 'events' });
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

  // add vehicle
  //Delete
  deleteVehicleType(id: number) {
    return this.http.delete(this.Root_URL + '/VehicleType/DeleteEmployee/' + id);
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
    return this.http.get<client[]>(this.Root_URL + '/Client/GetAllClients')
  }

  //Add
  addclient(val: any) {
    return this.http.post(this.Root_URL + '/Client/AddClient', val)
  }
 // update client
/* updateclient(val: any) {
  return this.http.put(this.Root_URL + '/Client/UpdateClient', val)
}*/

updateclient(val: any,id: number){
  return this.http.put(this.Root_URL + '/Client/UpdateClient/' + id,val);
}

  //Delete
  deleteClient(id: number) {
    return this.http.delete(this.Root_URL + '/Client/DeleteClient/' + id);
  }

  //Clients request
  getRequest(): Observable<ClientRequest[]> {
    return this.http.get<ClientRequest[]>(this.Root_URL + '/Client/GetAllRequests')
  }
//add client's request
  addRequest(val: any, id:number) {
    return this.http.post(this.Root_URL + '/Client/AddRequest/' + id, val)
  }

  updateRequest(val: any,id: number){
    return this.http.put(this.Root_URL + '/Client/UpdateRequest/' + id, val)
  }

  deleteRequest(id: number) {
    return this.http.delete(this.Root_URL + '/Client/DeleteRequest/' + id);
  }

  getRequestByClient(id: number):  Observable<ClientRequest[]> {
    return this.http.get<ClientRequest[]>(this.Root_URL + '/Client/GetRequestBYClient/' + id)
  }


  getMaterialRequestByProject(Id: number):  Observable<ProjectMaterialRequest[]> {
    return this.http.get<ProjectMaterialRequest[]>(this.Root_URL + '/ProjectMaterialRequest/GetRequestBYProject/' + Id)
  }





  getMaterialRequestStatus(): Observable<MaterialRequestStatus[]> {
    return this.http.get<MaterialRequestStatus[]>(this.Root_URL + '/ProjectMaterialRequest/GetAllRequestsStatus')
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
   //Delete
   deleteSafetyItemCategory(id: number) {
    return this.http.delete(this.Root_URL + '/SafetyItemCategory/DeleteSafetyItemCategory/' + id);
  }

  //SafetyFile
  //SafetyChecklist
  //Get All
  getProjectChecklist(): Observable<safetychecklist[]> {
    return this.http.get<safetychecklist[]>(this.Root_URL + '/SafetyChecklist/GetProjectChecklist/GetAll')
  }

  // deleteProjectSafetyChecklist
  deleteProjectSafetyChecklist(id: number) {
    return this.http.delete(this.Root_URL + '/SafetyChecklist/' + id);
  }

}
