import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { PayerNode } from '../../../shared/models/payernode';

@Component({
  selector: 'app-pn-add-dialog',
  templateUrl: './pn-add-dialog.component.html',
  styleUrls: ['./pn-add-dialog.component.css']
})
export class PnAddDialogComponent {

  pnForm;
  pnInputs: PayerNode = {
    id: null,
    customernumber: '',
    customername: '',
    hierarchy: '',
    payernodenumber: 0,
    payernodedescription: '',
    payernodecode: ''
  };

  constructor(
    private dialogRef: MatDialogRef<PnAddDialogComponent>
  ) {
    this.pnForm = new FormGroup({
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      hierarchy: new FormControl('', Validators.required),
      payernodenumber: new FormControl('', Validators.required),
      payernodedescription: new FormControl('', Validators.required),
      payernodecode: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.pnInputs);
  }

  get formcustomernumber() {
    return this.pnForm.get('customernumber');
  }

  get formcustomername() {
    return this.pnForm.get('customername');
  }

  get formhierarchy() {
    return this.pnForm.get('hierarchy');
  }

  get formpayernodenumber() {
    return this.pnForm.get('payernodenumber');
  }

  get formpayernodedescription() {
    return this.pnForm.get('payernodedescription');
  }

  get formpayernodecode() {
    return this.pnForm.get('payernodecode');
  }
}
