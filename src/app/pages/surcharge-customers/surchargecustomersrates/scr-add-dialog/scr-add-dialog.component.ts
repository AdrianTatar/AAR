import { SurchargeCustomerRate } from '../../../../shared/models/surcharge.customer.rate';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-scr-add-dialog',
  templateUrl: './scr-add-dialog.component.html',
  styleUrls: ['./scr-add-dialog.component.css']
})
export class ScrAddDialogComponent {

  scForm;
  scInputs: SurchargeCustomerRate = {
    id: null,
    year: 0,
    dailyrate: 0
  };

  constructor(
    private dialogRef: MatDialogRef<ScrAddDialogComponent>
  ) {
    this.scForm = new FormGroup({
      year: new FormControl('', Validators.required),
      dailyrate: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.scInputs);
  }

  get formyear() {
    return this.scForm.get('year');
  }

  get formdailyrate() {
    return this.scForm.get('dailyrate');
  }
}
