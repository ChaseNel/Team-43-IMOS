import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-add-supplier-type',
  templateUrl: './add-supplier-type.component.html',
  styleUrls: ['./add-supplier-type.component.css']
})
export class AddSupplierTypeComponent implements OnInit {

  addForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private _service:ServiceService
  ) { }

  ngOnInit(): void {
    this.buildAddForm();

  }
  private buildAddForm() {
    this.addForm = this.fb.group({
      Name: ['', [Validators.required]],
    });
  }

}
