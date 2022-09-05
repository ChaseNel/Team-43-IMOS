import { material } from './../../../services/service.service';
import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { AbstractControlOptions, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-material-type',
  templateUrl: './update-material-type.component.html',
  styleUrls: ['./update-material-type.component.css']
})
export class UpdateMaterialTypeComponent implements OnInit {

  Material!: material;
  id!: number;
  updateForm:FormGroup;


  constructor( 
    private fb:FormBuilder, 
    private _service:ServiceService,
    private route: ActivatedRoute,
    private router:Router,
    private http:HttpClient, 
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {};
    this.updateForm=this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-z ]{1,25}"), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.maxLength(40)]],
    }, formOptions);

    this.id=+this.route.snapshot.params['id'];
    this._service.getMaterialTypeID(this.id).subscribe((res:any)=>{
      this.Material=res;
      console.log(this.Material);
      this.updateForm=this.fb.group({
        name:[this.Material.name,[Validators.required, Validators.pattern("[A-Za-z ]{1,25}"), Validators.maxLength(25)]],
        description:[this.Material.description,[Validators.required,  Validators.minLength(10), Validators.maxLength(40)]],
      },formOptions)
    });
  }

  get formdet(){
    return this.updateForm.controls;
}
  
  onSubmit(){
    this._service.editMaterialType(this.route.snapshot.params['id'],this.updateForm.value).subscribe(
      res=>{
        if (confirm('Are you sure you want to Update this Material Type?')) {
            this._snackBar.open("Success, you have Update a Material Type!", 'OK', {
              duration: 3000,
              verticalPosition: 'bottom',
            });
        }
      })
    }
  back(){
    this.router.navigateByUrl('materialtype')
  }

}
