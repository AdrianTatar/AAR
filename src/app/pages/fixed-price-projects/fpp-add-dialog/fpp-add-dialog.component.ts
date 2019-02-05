import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { FixedPriceProject } from '../../../shared/models/fixed-price-project';

@Component({
  selector: 'app-fpp-add-dialog',
  templateUrl: './fpp-add-dialog.component.html',
  styleUrls: ['./fpp-add-dialog.component.css']
})
export class FppAddDialogComponent {

  fppForm;
  fppInputs: FixedPriceProject = {
    id: null,
    projectPlanmillNumber: '',
    projectIdTagetik: '',
    projectDescription: '',
    customerNumber: 0,
    price: 0
  };

  constructor(
    private dialogRef: MatDialogRef<FppAddDialogComponent>
  ) {
    this.fppForm = new FormGroup({
      projectPlanmillNumber: new FormControl('', Validators.required),
      projectIdTagetik: new FormControl('', Validators.required),
      projectDescription: new FormControl('', Validators.required),
      customerNumber: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.fppInputs);
  }

  get formprojectPlanmillNumber() {
    return this.fppForm.get('projectPlanmillNumber');
  }

  get formprojectIdTagetik() {
    return this.fppForm.get('projectIdTagetik');
  }

  get formprojectDescription() {
    return this.fppForm.get('projectDescription');
  }

  get formcustomerNumber() {
    return this.fppForm.get('customerNumber');
  }

  get formPrice() {
    return this.fppForm.get('price');
  }
}
