import { inject } from 'aurelia-framework';
import { AssetModel, IDepartment } from "models/assetmodel";
import { ValidationControllerFactory, ValidationRules } from 'aurelia-validation';
import { AssetService } from 'services/assetservice';
import {DialogService} from 'aurelia-dialog';
import { Prompt } from 'modal';
import {Router} from 'aurelia-router';
 
@inject(ValidationControllerFactory,AssetService,DialogService,Router)
export class CreateAsset {
     assetmodel:AssetModel= {} as AssetModel
     message="Create Asset";
     controller=null;
      departments: IDepartment[] = [
      { id: 1, name: 'HQ' },
      { id: 2, name: 'Store1' },
      { id: 3, name: 'Store2' },
      { id: 4, name: 'Store3' },
      { id: 5, name: 'MaintenanceStation' },
    ];

     constructor(validationControllerFactory: ValidationControllerFactory, private assetservice:AssetService, private dialogService:DialogService,private router) {
        this.dialogService = dialogService;
        this.assetservice=assetservice;
        this.router = router;
        this.controller=validationControllerFactory.createForCurrentScope();
        ValidationRules
        .ensure((c:CreateAsset["assetmodel"])=>c.AssetName).required()
        .ensure((c:CreateAsset["assetmodel"])=>c.CountryOfDepartment).required()
        .ensure((c:CreateAsset["assetmodel"])=>c.EMailAdressOfDepartment).required()
        .ensure((c:CreateAsset["assetmodel"])=>c.PurchaseDate).required()
        .ensure((c:CreateAsset["assetmodel"])=>c.Department).required().min(1).withMessage("Please select a valid Department.")
        .on(this.assetmodel);
        
      }

      get canSave() { 
        return  ( this.assetmodel.AssetName!=""&&this.assetmodel.AssetName!=undefined)
        &&(this.assetmodel.CountryOfDepartment !=""&&this.assetmodel.CountryOfDepartment!=undefined)
        &&this.assetmodel.Department>0
        &&(this.assetmodel.EMailAdressOfDepartment !=""&&this.assetmodel.EMailAdressOfDepartment!=undefined)
        &&(this.assetmodel.PurchaseDate!=""&&this.assetmodel.PurchaseDate!=undefined)
      }

      get canReset() { 
        return( this.assetmodel.AssetName!=""&&this.assetmodel.AssetName!=undefined)
        ||(this.assetmodel.CountryOfDepartment !=""&&this.assetmodel.CountryOfDepartment!=undefined)
        ||this.assetmodel.Department>0
        ||(this.assetmodel.EMailAdressOfDepartment !=""&&this.assetmodel.EMailAdressOfDepartment!=undefined)
        ||(this.assetmodel.PurchaseDate!=undefined)
      }
      
      save(){
        this.controller.validate();
        this.assetservice.savePost(this.assetmodel).then(res =>{
            if(res.statusCode==201)
            {
            this.router.navigate('/')
            }
           else {
             this.dialogService.open( {viewModel: Prompt, model: res.data.message }).whenClosed(response => {  });
           }
        }).catch(error =>{
            this.dialogService.open( {viewModel: Prompt, model: error }).whenClosed(response => {  });
        }) 
      }

      reset(){
        this.assetmodel= {} as AssetModel 
      }


    }

  
  


