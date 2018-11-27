import { SurchargeCustomerRate } from './../../../shared/models/surcharge.customer.rate';
import { SurchargeCustomersService } from './../services/surcharge-customers.service';
import { SurchargeCustomer } from './../../../shared/models/surcharge.customer';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sc-add-dialog',
  templateUrl: './sc-add-dialog.component.html',
  styleUrls: ['./sc-add-dialog.component.css']
})
export class ScAddDialogComponent implements OnInit {

  displayedColumns: string[] = ['year', 'at', 'hu', 'sk', 'ro'];
  surchargeRates: SurchargeCustomerRate[] = [];
  surchargeRatesDataSource = new MatTableDataSource<SurchargeCustomerRate>(this.surchargeRates);

  currentYear;

  scrForm;
  scrInputs: SurchargeCustomerRate = {
    id: null,
    year: 0,
    dailyrate_at: null,
    dailyrate_hu: null,
    dailyrate_ro: null,
    dailyrate_sk: null
  };

  scForm;
  scInputs: SurchargeCustomer = {
    id: null,
    debitornumber: 0,
    debitorname: '',
    type: '',
    customernumber: 0,
    customername: '',
    rates: [this.scrInputs]
  };

  constructor(
    private dialogRef: MatDialogRef<ScAddDialogComponent>
  ) {
  }

  async ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.scForm = new FormGroup({
      debitorenumber: new FormControl('', Validators.required),
      debitorname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required)
    });

    this.scrForm = new FormGroup({
      year: new FormControl('', Validators.required),
      dailyrate_at: new FormControl('', Validators.required),
      dailyrate_hu: new FormControl('', Validators.required),
      dailyrate_sk: new FormControl('', Validators.required),
      dailyrate_ro: new FormControl('', Validators.required),
    });

  }

  addSurchargeRate() {
    console.log(this.scInputs);
    const rateToAdd: SurchargeCustomerRate = {
      id: null,
      year: this.scrInputs.year,
      dailyrate_at: this.scrInputs.dailyrate_at,
      dailyrate_hu: this.scrInputs.dailyrate_hu,
      dailyrate_sk: this.scrInputs.dailyrate_sk,
      dailyrate_ro: this.scrInputs.dailyrate_ro
    };
    this.surchargeRates.push(rateToAdd);
    this.surchargeRatesDataSource.data = this.surchargeRates;

    this.scrInputs.year = 0;
    this.scrInputs.dailyrate_at = 0;
    this.scrInputs.dailyrate_hu = 0;
    this.scrInputs.dailyrate_sk = 0;
    this.scrInputs.dailyrate_ro = 0;
  }

  saveSurchargeCustomer() {
    const surchargeCustomerToAdd = {
      debitornumber: this.scInputs.debitornumber,
      debitorname: this.scInputs.debitorname,
      customername: this.scInputs.customername,
      customernumber: this.scInputs.customernumber,
      type: this.scInputs.type,
      rates: this.surchargeRates
    };
    this.dialogRef.close(surchargeCustomerToAdd);
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

  get formyear() {
    return this.scrForm.get('year');
  }

  get formdailyrate() {
    return this.scrForm.get('dailyrate');
  }

  get formAT() {
    return this.scrForm.get('dailyrate_at');
  }

  get formHU() {
    return this.scrForm.get('dailyrate_hu');
  }

  get formSK() {
    return this.scrForm.get('dailyrate_sk');
  }

  get formRO() {
    return this.scrForm.get('dailyrate_ro');
  }
}

