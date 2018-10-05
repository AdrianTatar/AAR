import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Zahlerknoten } from '../../../shared/models/Zahlerknoten';

@Component({
  selector: 'app-zah-add-dialog',
  templateUrl: './zah-add-dialog.component.html',
  styleUrls: ['./zah-add-dialog.component.css']
})
export class ZahAddDialogComponent {

  fppForm;
  fppInputs: Zahlerknoten = {
    position: null,
    kunde: 0,
    bez_kunde: '',
    hierarchie: '',
    zahlerknoten_nr: 0,
    zahlerknoten_bez: '',
    knoten: ''
  };

  constructor(
    private dialogRef: MatDialogRef<ZahAddDialogComponent>
  ) {
    this.fppForm = new FormGroup({
      kunde: new FormControl('', Validators.required),
      bez_kunde: new FormControl('', Validators.required),
      hierarchie: new FormControl('', Validators.required),
      zahlerknoten_nr: new FormControl('', Validators.required),
      zahlerknoten_bez: new FormControl('', Validators.required),
      knoten: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.fppInputs);
  }

  get formkunde() {
    return this.fppForm.get('kunde');
  }

  get formbez_kunde() {
    return this.fppForm.get('bez_kunde');
  }

  get formhierarchie() {
    return this.fppForm.get('hierarchie');
  }

  get formzahlerknoten_nr() {
    return this.fppForm.get('zahlerknoten_nr');
  }

  get formzahlerknoten_bez() {
    return this.fppForm.get('zahlerknoten_bez');
  }

  get formknoten() {
    return this.fppForm.get('knoten');
  }
}
