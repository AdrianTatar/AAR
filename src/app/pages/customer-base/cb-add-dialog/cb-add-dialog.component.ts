import { CustomerBase } from './../../../shared/models/customerbase';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cb-add-dialog',
  templateUrl: './cb-add-dialog.component.html',
  styleUrls: ['./cb-add-dialog.component.css']
})
export class CbAddDialogComponent {

  cbForm;
  cbInputs: CustomerBase = {
    id: null,
    blz: 0,
    block: '',
    node: '',
    customername: '',
    bankgroup: '',
    cluster: ''
  };

  constructor(
    private dialogRef: MatDialogRef<CbAddDialogComponent>
  ) {
    this.cbForm = new FormGroup({
      blz_pnr: new FormControl('', Validators.required),
      block_pnr: new FormControl('', Validators.required),
      knoten_pnr: new FormControl('', Validators.required),
      kundenname_pnr: new FormControl('', Validators.required),
      bkgr_pnr: new FormControl('', Validators.required),
      cluster_pnr: new FormControl('', Validators.required)
    });
  }

  save() {
    this.dialogRef.close(this.cbInputs);
  }

  get formblz_pnr() {
    return this.cbForm.get('blz_pnr');
  }

  get formblock() {
    return this.cbForm.get('block_pnr');
  }

  get formKnoten() {
    return this.cbForm.get('knoten_pnr');
  }

  get formKundenname() {
    return this.cbForm.get('kundenname_pnr');
  }

  get formBkGr() {
    return this.cbForm.get('bkgr_pnr');
  }

  get formCluster() {
    return this.cbForm.get('cluster_pnr');
  }
}
