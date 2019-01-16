import { CustomerInfo } from '../../../shared/models/customer-info';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-info-add-dialog',
  templateUrl: './customer-info-add-dialog.component.html',
  styleUrls: ['./customer-info-add-dialog.component.css']
})
export class CustomerInfoAddDialogComponent {

  cbForm;
  cbInputs: CustomerInfo = {
    id: null,
    blz: 0,
    block: '',
    node: '',
    customername: '',
    bankgroup: '',
    cluster: ''
  };

  constructor(
    private dialogRef: MatDialogRef<CustomerInfoAddDialogComponent>
  ) {
    this.cbForm = new FormGroup({
      blz: new FormControl('', Validators.required),
      block: new FormControl('', Validators.required),
      node: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      bankgroup: new FormControl('', Validators.required),
      cluster: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.cbInputs);
  }

  get formblz() {
    return this.cbForm.get('blz');
  }

  get formblock() {
    return this.cbForm.get('block');
  }

  get formnode() {
    return this.cbForm.get('node');
  }

  get formcustomername() {
    return this.cbForm.get('customername');
  }

  get formbankgroup() {
    return this.cbForm.get('bankgroup');
  }

  get formcluster() {
    return this.cbForm.get('cluster');
  }
}
