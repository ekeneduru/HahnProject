  export interface AssetModel{
    Id:number,
    AssetName:string;
    Department: number;
    CountryOfDepartment:string;
    EMailAdressOfDepartment:string;
    PurchaseDate:string,
    Broken:boolean,
  }
  export interface IDepartment{
    id: number;
    name: string;
  }