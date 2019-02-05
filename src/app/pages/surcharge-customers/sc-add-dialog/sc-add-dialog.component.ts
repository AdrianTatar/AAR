import { SurchargeCustomerRate } from './../../../shared/models/surcharge-customer-rate';
import { SurchargeCustomersService } from './../services/surcharge-customers.service';
import { SurchargeCustomer } from '../../../shared/models/surcharge-custome';
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
    dailyrateAt: null,
    dailyrateHu: null,
    dailyrateRo: null,
    dailyrateSk: null
  };

  scForm;
  scInputs: SurchargeCustomer = {
    id: null,
    debitorNumber: 0,
    debitorName: '',
    type: '',
    customerNumber: 0,
    customerName: '',
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
      debitorName: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customerNumber: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required)
    });

    this.scrForm = new FormGroup({
      year: new FormControl('', Validators.required),
      dailyrateAt: new FormControl('', Validators.required),
      dailyrateHu: new FormControl('', Validators.required),
      dailyrateSk: new FormControl('', Validators.required),
      dailyrateRo: new FormControl('', Validators.required),
    });

  }

  addSurchargeRate() {
    console.log(this.scInputs);
    const rateToAdd: SurchargeCustomerRate = {
      id: null,
      year: this.scrInputs.year,
      dailyrateAt: this.scrInputs.dailyrateAt,
      dailyrateHu: this.scrInputs.dailyrateHu,
      dailyrateSk: this.scrInputs.dailyrateSk,
      dailyrateRo: this.scrInputs.dailyrateRo
    };
    this.surchargeRates.push(rateToAdd);
    this.surchargeRatesDataSource.data = this.surchargeRates;

    this.scrInputs.year = 0;
    this.scrInputs.dailyrateAt = 0;
    this.scrInputs.dailyrateHu = 0;
    this.scrInputs.dailyrateSk = 0;
    this.scrInputs.dailyrateRo = 0;
  }

  saveSurchargeCustomer() {
    const surchargeCustomerToAdd = {
      debitorNumber: this.scInputs.debitorNumber,
      debitorName: this.scInputs.debitorName,
      customerName: this.scInputs.customerName,
      customerNumber: this.scInputs.customerNumber,
      type: this.scInputs.type,
      rates: this.surchargeRates
    };
    this.dialogRef.close(surchargeCustomerToAdd);
  }

  get formdebitorNumber() {
    return this.scForm.get('debitorenumber');
  }

  get formdebitorName() {
    return this.scForm.get('debitorName');
  }

  get formtype() {
    return this.scForm.get('type');
  }

  get formcustomerNumber() {
    return this.scForm.get('customerNumber');
  }

  get formcustomerName() {
    return this.scForm.get('customerName');
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
    return this.scrForm.get('dailyrateAt');
  }

  get formHU() {
    return this.scrForm.get('dailyrateHu');
  }

  get formSK() {
    return this.scrForm.get('dailyrateSk');
  }

  get formRO() {
    return this.scrForm.get('dailyrateRo');
  }
}

