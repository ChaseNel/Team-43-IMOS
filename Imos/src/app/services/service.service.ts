


import { User } from './../user/user.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


//Employee Interface
export interface employee {
  EmployeeId: number,
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
  employee: string,
  userrole: string,
  equipmentchecks: [],
  stocktakes: [],
  tasks: [],
  userincidents: [],
  Vehicles: []
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

  supplierorderlines: [],
  suppliermaterials: [],
  taskmaterials: [],
  warehouse: string
  warehouseId: number
}

//Material Type Interface
export interface materialtype {
  id: number,
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







///Report INterface

export interface requestcount{
  clientName:string;
  count:number;
}

export interface ApprovedRequestCount{
  clientName:string;
  count:number;
}

export interface MaterialComposition{
  materialName: string;
  count:number;
  materialTotal: number;
  materialAverage: number;
}











export interface ProjectMaterialRequest{

  materialRequestId: number,
  projectId: number,
  urgencylevelName: string,
  requestDate :string,
  statusName:string,
  statusUpdateDate: string,


}

//Material Request Interface/incomoplete
export interface materialRequest {
  projectmaterialrequestId: number,
  projectId: number,
  urgencylevelId: number,
  fulfillmenttype: string,
  statusName:string,
  project: string,
  urgencylevel: string,

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

//Supplier Order Interface
export interface supplierOrder {
  SupplierID: number,
  MaterialID: number,
  quanitity: number,
  address: string,
  material: string,
  supplier: string,
  deliveries: []
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
  imageUrl: string,
  AssignedStatus: number,
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

//Request Interface
export interface request {
  requestId: number,
  clientId: number,
  description: string,
  client: string,
  projects: []
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
  id: number,
  name: string,
  description: string,
  warehouseequipments: [],
  materials: []
}

//Equipment Interface
export interface equipment {
  equipmentId: number,
  name: string,
  description: string,
  quantity: number,
  projectequipments: [],
  warehouseequipments: [],
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
export interface safetyfileitems{}
//Safty File Interface
export interface saftyFile {
  SafetyFileID: number,
  catagory: string,
  item: string,
  project: string,
}


export interface tasktype {
  tasktype1: number,
  description: string,
  tasks: []
}

export interface task {
  taskId: number,
  tasktype: string,
  userid: string,
  startdate: any,
  enddate: any,
  invoices: [],
  taskmaterials: []
}

export interface deliveryNote {
  DeliveryID: number,
  ProjectID: string,
  SupplierID: string,
  MaterialID: any,
  date: any,
  DeliveryNote: any,
}

export interface UploadFinishedEventArgs {
  filePath: '' //Comes from server
}




@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  public taskId: number;

  //URL from API
  readonly Root_URL = 'https://localhost:44381/api'

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

  downloadVehiclePhoto(VehicleId:any) {
    return this.http.get(
      this.Root_URL.concat("Uploads/Vehicles/Photos/Download/" + VehicleId),
      { responseType: 'blob', observe: 'response' }
    );
  }

  //Add
  uploadVehiclePhoto(obj: any): Observable<any> {
    return this.http.post(this.Root_URL + '/Uploads/Vehicles/Upload/', obj
    , {reportProgress: true, observe: 'events'});
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
  addUser(obj: any): Observable<any> {
    return this.http.post(this.Root_URL + '/User/Register/UserAccount', obj);
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
  getUserRoleById(id: number) {
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
  getEmployeeById(id: number) {
    return this.http.get(this.Root_URL + '/Employee/GetEmployeeById/' + id);
  }

  //Get
  getEmployees(): Observable<employee[]> {
    return this.http.get<employee[]>(this.Root_URL + '/Employee')
  }
  //add
  addEmployee(val: any) {
    return this.http.post(this.Root_URL + '/Employee/AddEmployee', val)
  }
  // update employee
  updateEmployee(id: number, data: any) {
    return this.http.put(this.Root_URL + '/Employee/updateEmployee/' + id, data);
  }

  //Delete
  deleteEmployee(id: number) {
    return this.http.delete(this.Root_URL + '/Employee/DeleteEmployee/' + id);
  }

  //Material Http requests
  //getById
  getMaterialID(id: number) {
    return this.http.get(this.Root_URL + '/Material/GetAll/' + id);
  }
  //Get
  getMaterial(): Observable<material[]> {
    return this.http.get<material[]>(this.Root_URL + '/Material/GetMaterials')
  }
  //Delete
  deleteMaterial(id: number) {
    return this.http.delete(this.Root_URL + '/Material/DeleteMaterialSupplier/' + id);
  }
  //Add
  addMaterial(val: any) {
    return this.http.post(this.Root_URL + '/Material/AddMaterial', val)
  }
  // update material
  updateMaterial(id: number, data: any) {
    return this.http.put(this.Root_URL + '/Material/updateMaterial/' + id, data);

  }

  //Material TypeHttp requests

  //getById
  getMaterialTypeID(id: number) {
    return this.http.get(this.Root_URL + '/MaterialType/GetMaterialType/' + id);
  }
  //Get
  getMaterialType(): Observable<materialtype[]> {
    return this.http.get<materialtype[]>(this.Root_URL + '/MaterialType/GetAll')
  }
  //Add
  addMaterialType(val: any) {
    return this.http.post(this.Root_URL + '/Materialtype/AddMaterialType', val)
  }

  //Update
  editMaterialType(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/Materialtype/UpdateType/' + id;
    return this.http.put(endPointUrl, val);

    return this.http.get<materialtype[]>(this.Root_URL + '/MaterialType/GetAll')
  }
  //Delete
  deleteMaterialType(id: number) {
    return this.http.delete(this.Root_URL + '/MaterialType/DeleteType/' + id);
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


  getMaterialRequetsCount(): Observable<any> {
    return this.http.get<any>(this.Root_URL + '/ProjectMaterialRequestReportsController1/GetProjectMaterialRequestCount')
    .pipe(map(result => result))
  }

  getApprovedRequestCount(): Observable<any> {
    return this.http.get<any>(this.Root_URL + '/ProjectMaterialRequestReportsController1/GetApprovedRequestCount')
    .pipe(map(result => result))
  }

  getMaterialCompositonCount(): Observable<any> {
    return this.http.get<any>(this.Root_URL + '/ProjectMaterialRequestReportsController1/MaterialCompositionCount')
    .pipe(map(result => result))
  }

  getMaterialRequestControls(): Observable<any> {
    return this.http.get<any>(this.Root_URL + '/ProjectMaterialRequestReportsController1/RequestMaterialControl')
    .pipe(map(result => result))
  }

  getMaterialRequest(): Observable<any> {
    return this.http.get<any>(this.Root_URL + '/ProjectMaterialRequest/GetAllMaterialRequests')
    .pipe(map(result => result))
  }




  CompileRequestCountDashboard(): Observable<any>{
    return this.http.get(`${this.Root_URL}/ProjectMaterialRequestReportsController1/GetProjectMaterialRequestCount`)
    .pipe(map(result => result))
  }















  //Supplier
  getSupplierById(id: number) {
    return this.http.get(this.Root_URL + '/Supplier/GetSupplierById/' + id);
  }

  //Get All
  getSupplier(): Observable<supplier[]> {
    return this.http.get<supplier[]>(this.Root_URL + '/Supplier/GetSuppliers')
  }
  // add supplier
  addSupplier(val: any) {
    return this.http.post(this.Root_URL + '/Supplier/AddSupplier', val);
  }

  //update supplier endpoint
  updateSupplier(id: number, data: any) {
    return this.http.put(this.Root_URL + '/Supplier/updateSupplier/' + id, data);
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
  SupplierID(id: number) {
    return this.http.get(this.Root_URL + '/Supplier/GetSupplier/' + id);
  }
  //Update
  UpdateSuplier(id: number, data: any) {
    return this.http.put(this.Root_URL + '/Supplier/UpdateSupplier/' + id, data);
  }

  //Supplier Type
  //Get
  getSupplierType(): Observable<suppliertype[]> {
    return this.http.get<suppliertype[]>(this.Root_URL + '/SupplierType/GetAll')
  }

  //By ID
  SupplierTypeID(id: number) {
    return this.http.get(this.Root_URL + '/SupplierType/' + id);
  }

  //Delete
  deleteSupplierType(id: number) {
    return this.http.delete(this.Root_URL + '/SupplierType/' + id);
  }
  //Add
  addSupplierType(val: any) {
    return this.http.post(this.Root_URL + '/Suppliertype/CreateSuppliertype', val)
  }

  //Update
  editSupplierType(id: number, val: any) {
    return this.http.put(this.Root_URL + '/SupplierType/' + id, val);
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

  //By ID
  getVehicleTypeID(id: number) {
    return this.http.get(this.Root_URL + '/Vehicletype/' + id);
  }

  //Get
  getVehicleType(): Observable<vehicletype[]> {
    return this.http.get<vehicletype[]>(this.Root_URL + '/Vehicletype/Vehicletype/GetVehicletypes')
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
    return this.http.delete(this.Root_URL + '/VehicleType/' + id);
  }



  //Vehicle Allocations
  //Get All  Not assigned
  getAlllVehiclesNotAssigned() {
    return this.http.get<vehicle[]>(this.Root_URL + '/VehicleAllocation/GetAll/NotAssigned')

  }


  //Incident
  //Get
  getInicdent(): Observable<incident[]> {
    return this.http.get<incident[]>(this.Root_URL + '/Incident/GetIncidents')
  }
  /*Delete
  deleteIncident(id: number) {
    return this.http.delete(this.Root_URL + '/Incident/DeleteIncident/' + id);
  }*/

  //Projects
  //getID
  getProjectById(id: number) {
    return this.http.get(this.Root_URL + '/Project/GetProjects/' + id);
  }
  //Get
  getProject(): Observable<project[]> {
    return this.http.get<project[]>(this.Root_URL + '/Project/GetProjects')
  }
  //Delete
  deleteProject(id: number) {
    return this.http.delete(this.Root_URL + '/Project/DeleteProject/' + id);
  }
  //add Project
  addProject(val: any) {
    return this.http.post(this.Root_URL + '/Project/CreateProject', val);
  }
  //Update
  UpdateProject(id: number, data: any) {
    return this.http.put(this.Root_URL + '/Project/UpdateProject/' + id, data);
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
  //getById
  getWarehouseById(id: number) {
    return this.http.get(this.Root_URL + '/Warehouse/GetWarehouseById/' + id);
  }
  //Get
  getWarehouses(): Observable<warehouse[]> {
    return this.http.get<warehouse[]>(this.Root_URL + '/Warehouse/GetAll')
  }
  /*add warehouse
  addWarehouse(val:any){
    return this.http.post(this.Root_URL + '/Warehouse/AddWarehouse',val);
  }*/
  //update warehouse
  UpdateWarehouse(id: number, data: any) {
    return this.http.put(this.Root_URL + '/Warehouse/UpdateWarehouse/' + id, data);
  }
  //Delete
  deleteWarehouse(id: number) {
    return this.http.delete(this.Root_URL + '/Warehouse/' + id);
  }

  //Equipment
  //Get
  getEquipment(): Observable<equipment[]> {
    return this.http.get<equipment[]>(this.Root_URL + '/Equipment/GetEquipments')
  }
  //get by Id
  getEquipmentById(id: number) {
    return this.http.get(this.Root_URL + '/Equipment/GetEquipmentById/' + id);

  }
  //add equipment
  addEquipment(val: any) {
    return this.http.post(this.Root_URL + '/Equipment/AddEquipment', val);
  }
  //Update
  UpdateEquipment(id: number, data: any) {
    return this.http.put(this.Root_URL + '/Equipment/UpdateEquipment/' + id, data);
  }

  //Delete
  deleteEquipment(id: number) {
    return this.http.delete(this.Root_URL + '/Equipment/DeleteEquipment/' + id);
  }
  //Vehicle End Points
  // add
  addVehicle(val: any) {
    return this.http.post(this.Root_URL + '/Vehicle/AddVehicle', val)
  }
  // Get All
  //getById
  getVehicleById(id: number) {
    return this.http.get(this.Root_URL + '/Vehicle/GetVehicleById/' + id);
  }
  //Update
  updateVehicle(id: number, data: any) {
    return this.http.put(this.Root_URL + '/Vehicle/UpdateVehicle/' + id, data)
  }
  //Delete

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

  //Requeast
  //Get
  getRequeast(): Observable<request[]> {
    return this.http.get<request[]>(this.Root_URL + '/Request/GetRequests')
  }
  //Add
  addRequeast(val: any) {
    return this.http.post(this.Root_URL + '/Request/CreateRequest', val)
  }

  //Update
  editRequeast(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + '/Request/UpdateRequest/' + id;
    return this.http.put(endPointUrl, val);

    return this.http.get<materialtype[]>(this.Root_URL + '/Request/GetRequests')
  }
  //Delete
  deleteRequeast(id: number) {
    return this.http.delete(this.Root_URL + '/Request/DeleteRequest/' + id);
  }

  //Safty File
  //Get
  getSaftyFile(): Observable<saftyFile[]> {
    return this.http.get<saftyFile[]>(this.Root_URL + '/User')
  }
  //Delete
  deleteSaftyFile(id: number) {
    return this.http.delete(this.Root_URL + '/User/DeleteUser/' + id);
  }
  //Add
  addSaftyFile(obj: any): Observable<any> {
    return this.http.post(this.Root_URL + '/User/CreateUser', obj);
  }
  //Update
  updateSaftyFile(payload: any, id: number) {
    return this.http.put(this.Root_URL.concat("User/" + "/" + id),
      payload,
      { reportProgress: true, observe: 'events' });
  }



  //Task Type
  //Get
  getTaskType(): Observable<tasktype[]> {
    return this.http.get<tasktype[]>(this.Root_URL + "/tasktype/gettasktypes")
  }


  //Add
  addTaskType(val: any) {
    return this.http.post(this.Root_URL + "/tasktype/createtasktype", val)

  }

  //Update
  editTaskType(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + "/tasktype/updatetasktype/" + id;
    return this.http.put(endPointUrl, val);

  }


  //Delete
  deleteTaskType(id: number) {
    return this.http.delete(this.Root_URL + "/tasktype/deletetasktype/" + id);
  }



  //Task
  //Get
  getTask(): Observable<task[]> {
    return this.http.get<task[]>(this.Root_URL + "/task/gettask")
  }


  //Add
  addTask(val: any) {
    return this.http.post(this.Root_URL + "/task/createtask", val)

  }

  //Update
  editTask(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + "/task/updatetask/" + id;
    return this.http.put(endPointUrl, val);

  }

  setTaskId(Id: any) {
    this.taskId = Id;
    console.log(this.taskId);
  }

  getTaskId() {
    return this.taskId;
  }


  //Delete
  deleteTask(id: number) {
    return this.http.delete(this.Root_URL + "/task/deletetask/" + id);
  }



  //Add
  addWarehouse(val: any) {
    return this.http.post(this.Root_URL + "/Warehouse/AddWarehouse", val)

  }


  //Update
  editWarehouse(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + "/warehouse/updatewarehouse/" + id;
    return this.http.put(endPointUrl, val);

  }

  //Incident
  //getID
  getIncidentById(id: number) {
    return this.http.get(this.Root_URL + '/incident/GetIncident/' + id);
  }
  //get
  getIncident(): Observable<incident[]> {
    return this.http.get<incident[]>(this.Root_URL + "/incident/getincidents")
  }
  //Add
  addIncident(val: any) {
    return this.http.post(this.Root_URL + "/incident/createincident", val)
  }
  //Update
  editIncident(id: any, val: any): Observable<any> {
    console.log(id, val)
    const endPointUrl = this.Root_URL + "/incident/updateincident/" + id;
    return this.http.put(endPointUrl, val);

  }


  //Delete
  deleteIncident(id: number) {
    return this.http.delete(this.Root_URL + '/Incident/DeleteIncident/' + id);
  }
  getSafetyCategory() {

  }
  addSafetyCategory() {

  }
  deleteSafetyItemCategory(id: number) {
    return this.http.delete(this.Root_URL + '/Incident/DeleteIncident/' + id);
  }

  //Delivery note
  getDeliveryNoteID(id: number) {
    return this.http.get(this.Root_URL + '/Delivery/GetDelivery/' + id);
  }

  //Get All
  getdeliveryNote(): Observable<deliveryNote[]> {
    return this.http.get<deliveryNote[]>(this.Root_URL + '/Delivery/GetDeliverys')
  }
  // add supplier
  addDeliveryNote(val: any) {
    return this.http.post(this.Root_URL + '/Delivery/CreateDelivery', val);
  }

  //update supplier endpoint
  updateDeliveryNote(id: number, data: any) {
    return this.http.put(this.Root_URL + '/Delivery/UpdateDelivery/' + id, data);
  }

  //Delete
  deleteDeliveryNote(id: number) {
    return this.http.delete(this.Root_URL + '/Delivery/DeleteDelivery' + id);
  }

 //Manage Products
 addProduct(payload: any) {
  return this.http.post(this.Root_URL.concat("Products"),
    payload,
    { reportProgress: true, observe: 'events' });
}




}


