import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { FixedPricedProjects } from '../../shared/models/FixedPricedProjects';

@Component({
  selector: 'app-fpp-add-dialog',
  templateUrl: './fpp-add-dialog.component.html',
  styleUrls: ['./fpp-add-dialog.component.css']
})
export class FppAddDialogComponent {

  fppForm;
  fppInputs: FixedPricedProjects = {
    position: null,
    planmill_pnr: '',
    tagetik_projektID: '',
    projbez: '',
    kundennr: 0,
    fixpreis: 0
  };

  constructor(
    private dialogRef: MatDialogRef<FppAddDialogComponent>
  ) {
    this.fppForm = new FormGroup({
      planmill_pnr: new FormControl('', Validators.required),
      tagetik_projektID: new FormControl('', Validators.required),
      projbez: new FormControl('', Validators.required),
      kundennr: new FormControl('', Validators.required),
      fixpreis: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.fppInputs);
  }

  get formPlanmill_pnr() {
    return this.fppForm.get('planmill_pnr');
  }

  get formTagetik_ProjektID() {
    return this.fppForm.get('tagetik_projektID');
  }

  get formProjbez() {
    return this.fppForm.get('projbez');
  }

  get formKundennr() {
    return this.fppForm.get('kundennr');
  }

  get formFixpreis() {
    return this.fppForm.get('fixpreis');
  }
}
