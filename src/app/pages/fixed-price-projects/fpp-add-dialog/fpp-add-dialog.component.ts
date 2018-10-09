import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { FixedPriceProject } from '../../../shared/models/fixed.price.project';

@Component({
  selector: 'app-fpp-add-dialog',
  templateUrl: './fpp-add-dialog.component.html',
  styleUrls: ['./fpp-add-dialog.component.css']
})
export class FppAddDialogComponent {

  fppForm;
  fppInputs: FixedPriceProject = {
    id: null,
    projectnumberplanmill: '',
    projectidtagetik: '',
    projectdescription: '',
    customernumber: 0,
    price: 0
  };

  constructor(
    private dialogRef: MatDialogRef<FppAddDialogComponent>
  ) {
    this.fppForm = new FormGroup({
      projectnumberplanmill: new FormControl('', Validators.required),
      projectidtagetik: new FormControl('', Validators.required),
      projectdescription: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.fppInputs);
  }

  get formProjectnumberplanmill() {
    return this.fppForm.get('projectnumberplanmill');
  }

  get formProjectidtagetik() {
    return this.fppForm.get('projectidtagetik');
  }

  get formProjectdescription() {
    return this.fppForm.get('projectdescription');
  }

  get formCustomernumber() {
    return this.fppForm.get('customernumber');
  }

  get formPrice() {
    return this.fppForm.get('price');
  }
}
