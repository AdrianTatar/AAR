import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { PayerNode } from '../../../shared/models/payernode';

@Component({
  selector: 'app-zah-add-dialog',
  templateUrl: './zah-add-dialog.component.html',
  styleUrls: ['./zah-add-dialog.component.css']
})
export class ZahAddDialogComponent {

  fppForm;
  fppInputs: PayerNode = {
    id: null,
    customernumber: '',
    customername: '',
    hierarchy: '',
    payernodenumber: 0,
    payernodedescription: '',
    payernodecode: ''
  };

  constructor(
    private dialogRef: MatDialogRef<ZahAddDialogComponent>
  ) {
    this.fppForm = new FormGroup({
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      hierarchy: new FormControl('', Validators.required),
      payernodenumber: new FormControl('', Validators.required),
      payernodedescription: new FormControl('', Validators.required),
      payernodecode: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.fppInputs);
  }

  get formcustomernumber() {
    return this.fppForm.get('customernumber');
  }

  get formcustomername() {
    return this.fppForm.get('customername');
  }

  get formhierarchy() {
    return this.fppForm.get('hierarchy');
  }

  get formpayernodenumber() {
    return this.fppForm.get('payernodenumber');
  }

  get formpayernodedescription() {
    return this.fppForm.get('payernodedescription');
  }

  get formpayernodecode() {
    return this.fppForm.get('payernodecode');
  }
}
