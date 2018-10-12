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
    debitornumber: null,
    debitorname: '',
    type: '',
    customernumber: null,
    customername: '',
    n2015: 0,
    n2016: 0,
    n2017: 0,
    n2018: 0,
    aufschlag_2018: 0
  };

  constructor(
    private dialogRef: MatDialogRef<ScAddDialogComponent>
  ) {
    this.scForm = new FormGroup({
      debitorennr: new FormControl('', Validators.required),
      debitor: new FormControl('', Validators.required),
      typ: new FormControl('', Validators.required),
      kundennr: new FormControl('', Validators.required),
      kunde: new FormControl('', Validators.required),
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

  get formDebitorennr() {
    return this.scForm.get('debitorennr');
  }

  get formDebitor() {
    return this.scForm.get('debitor');
  }

  get formTyp() {
    return this.scForm.get('typ');
  }

  get formKundennr() {
    return this.scForm.get('kundennr');
  }

  get formKunde() {
    return this.scForm.get('kunde');
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
