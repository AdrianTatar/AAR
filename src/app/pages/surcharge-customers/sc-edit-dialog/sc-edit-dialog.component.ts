import { Component } from '@angular/core';
import { SurchargeCustomer } from '../../../shared/models/surcharge.customer';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sc-edit-dialog',
  templateUrl: './sc-edit-dialog.component.html',
  styleUrls: ['./sc-edit-dialog.component.css']
})
export class ScEditDialogComponent {

  scForm;
  scInputs: SurchargeCustomer = {
    id: null,
    debitornumber: 0,
    debitorname: '',
    type: '',
    customernumber: 0,
    customername: '',
    n2015: 0,
    n2016: 0,
    n2017: 0,
    n2018: 0,
    aufschlag_2018: 0
  };

  constructor(
    private dialogRef: MatDialogRef<ScEditDialogComponent>
  ) {
    this.scForm = new FormGroup({
      debitorenumber: new FormControl('', Validators.required),
      debitorname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      n2015: new FormControl('', Validators.required),
      n2016: new FormControl('', Validators.required),
      n2017: new FormControl('', Validators.required),
      n2018: new FormControl('', Validators.required),
      aufschlag_2018: new FormControl('', Validators.required),
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

  get formN2015() {
    return this.scForm.get('n2015');
  }

  get formN2016() {
    return this.scForm.get('n2016');
  }

  get formN2017() {
    return this.scForm.get('n2017');
  }

  get formN2018() {
    return this.scForm.get('n2018');
  }

  get formAufschlag_2018() {
    return this.scForm.get('aufschlag_2018');
  }
}
