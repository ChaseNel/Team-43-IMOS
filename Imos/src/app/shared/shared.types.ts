export interface supplierType {
    id: number;
    name: string;
  }
  // add all project,safetychecklist,checklist Item  category 
  export interface SafetyChecklist{
    projectId:number,
  //  safetyFileItemId:number,
    projectname:string,
    safetyfileitems:[]
  }
  export interface  Safetyitemcategory{
    safetyItemCategoryId: number,
    CategoryName: string,
    Safetyfileitems: []
  }

  export interface Safetyfileitem{
    SafetyfileitemId: number,
    SafetyitemcategoryId: number,
    name: string,
    Safetyitemcategory: string
  }



 
  