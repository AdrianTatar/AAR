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
    customerNumber: '',
    customerName: '',
    hierarchy: '',
    payerNodeNumber: 0,
    payerNodeDescription: '',
    payerNodeCode: ''
  };

  constructor(
    private dialogRef: MatDialogRef<PnAddDialogComponent>
  ) {
    this.pnForm = new FormGroup({
      customerNumber: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      hierarchy: new FormControl('', Validators.required),
      payerNodeNumber: new FormControl('', Validators.required),
      payerNodeDescription: new FormControl('', Validators.required),
      payerNodeCode: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.pnInputs);
  }

  get formcustomerNumber() {
    return this.pnForm.get('customerNumber');
  }

  get formcustomerName() {
    return this.pnForm.get('customerName');
  }

  get formhierarchy() {
    return this.pnForm.get('hierarchy');
  }

  get formpayerNodeNumber() {
    return this.pnForm.get('payerNodeNumber');
  }

  get formpayerNodeDescription() {
    return this.pnForm.get('payerNodeDescription');
  }

  get formpayerNodeCode() {
    return this.pnForm.get('payerNodeCode');
  }
}
