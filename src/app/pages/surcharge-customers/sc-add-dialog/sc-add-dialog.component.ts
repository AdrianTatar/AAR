import { Component } from '@angular/core';
import { SurchargeCustomer } from '../../../shared/models/surcharge.customer';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sc-add-dialog',
  templateUrl: './sc-add-dialog.component.html',
  styleUrls: ['./sc-add-dialog.component.css']
})
export class ScAddDialogComponent {

  scForm;
  scInputs: SurchargeCustomer = {
    id: null,
    debitornumber: 0,
    debitorname: '',
    type: '',
    customernumber: 0,
    customername: ''
  };

  constructor(
    private dialogRef: MatDialogRef<ScAddDialogComponent>
  ) {
    this.scForm = new FormGroup({
      debitorenumber: new FormControl('', Validators.required),
      debitorname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.scInputs);
  }

  get formdebitornumber() {
    return this.scForm.get('debitorenumber');
  }

  get formdebitorname() {
    return this.scForm.get('debitorname');
  }

  get formtype() {
    return this.scForm.get('type');
  }

  get formcustomernumber() {
    return this.scForm.get('customernumber');
  }

  get formcustomername() {
    return this.scForm.get('customername');
  }
}
