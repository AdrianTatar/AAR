import { SurchargeCustomersRateService } from './../surchargecustomersrates/services/surcharge-customers-rates.service';
import { SurchargeCustomerRate } from './../../../shared/models/surcharge.customer.rate';
import { SurchargeCustomersService } from './../services/surcharge-customers.service';
import { SurchargeCustomer } from './../../../shared/models/surcharge.customer';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sc-edit-dialog',
  templateUrl: './sc-edit-dialog.component.html',
  styleUrls: ['./sc-edit-dialog.component.css']
})
export class ScEditDialogComponent {
  dataSource = new MatTableDataSource<SurchargeCustomer>();
  selectedRowToEdit = -1;
  scForm;
  scInputs: SurchargeCustomer = {
    id: null,
    debitornumber: 0,
    debitorname: '',
    type: '',
    customernumber: 0,
    customername: '',
    rates: null
  };

  scrForm;
  scrInputs: SurchargeCustomerRate = {
    id: null,
    year: 0,
    dailyrate: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private surchargeCustomersService: SurchargeCustomersService,
    private dialogRef: MatDialogRef<ScEditDialogComponent>
  ) {
    this.scForm = new FormGroup({
      debitorenumber: new FormControl('', Validators.required),
      debitorname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      rates: new FormControl('', Validators.required)
    });
    this.scrForm = new FormGroup({
      year: new FormControl('', Validators.required),
      dailyrate: new FormControl('', Validators.required)
    });
    this.scInputs.customernumber = this.data.customerNumberData;
    this.scInputs.customername = this.data.customerNameData;
    this.scInputs.type = this.data.typeData;
    this.scInputs.debitorname = this.data.debitorNameData;
    this.scInputs.debitornumber = this.data.debitorNumberData;
    this.scInputs.rates = this.data.rateData;
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

  get formrates() {
    return this.scForm.get('rates');
  }

  get formratesyear() {
    return this.scrForm.get('year');
  }

  get formratesdailyrate() {
    return this.scrForm.get('dailyrate');
  }

  private addRates() {
      const rates = this.scrInputs;
      this.surchargeCustomersService.updateSurchargeCustomer(this.dataSource.data[this.selectedRowToEdit - 1]);
      this.selectedRowToEdit = -1;
      console.log(this.scInputs);
  }
  private pushObject(data: SurchargeCustomer) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    //this.dataSource.data.push(this.scrInputs);
  }

  private mapToDataSource(elementId) {
    let pos = 0;
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].id === elementId) {
        pos = i;
      }
    }
    return pos + 1;
  }
}
