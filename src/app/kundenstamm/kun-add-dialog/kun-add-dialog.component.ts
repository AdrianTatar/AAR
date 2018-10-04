import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Kundenstamm } from '../../shared/models/Kundenstamm';

@Component({
  selector: 'app-kun-add-dialog',
  templateUrl: './kun-add-dialog.component.html',
  styleUrls: ['./kun-add-dialog.component.css']
})
export class KunAddDialogComponent {

  fppForm;
  fppInputs: Kundenstamm = {
    position: null,
    blz_pnr: 0,
    block_pnr: '',
    knoten_pnr: '',
    kundenname_pnr: '',
    bkgr_pnr: '',
    cluster_pnr: ''
  };

  constructor(
    private dialogRef: MatDialogRef<KunAddDialogComponent>
  ) {
    this.fppForm = new FormGroup({
      blz_pnr: new FormControl('', Validators.required),
      block_pnr: new FormControl('', Validators.required),
      knoten_pnr: new FormControl('', Validators.required),
      kundenname_pnr: new FormControl('', Validators.required),
      bkgr_pnr: new FormControl('', Validators.required),
      cluster_pnr: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.fppInputs);
  }

  get formblz_pnr() {
    return this.fppForm.get('blz_pnr');
  }

  get formblock() {
    return this.fppForm.get('block_pnr');
  }

  get formKnoten() {
    return this.fppForm.get('knoten_pnr');
  }

  get formKundenname() {
    return this.fppForm.get('kundenname_pnr');
  }

  get formBkGr() {
    return this.fppForm.get('bkgr_pnr');
  }

  get formCluster() {
    return this.fppForm.get('cluster_pnr');
  }
}
