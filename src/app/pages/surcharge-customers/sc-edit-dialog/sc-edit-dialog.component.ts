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
export class ScEditDialogComponent implements OnInit {

  displayedSurchargeRateColumns: String[] = ['year', 'dailyrate'];
  surchargeRates = [];
  surchargeRatesDataSource = new MatTableDataSource<SurchargeCustomerRate>(this.surchargeRates);

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
    private dialogRef: MatDialogRef<ScEditDialogComponent>
  ) {
    this.scInputs.id = this.data.customerId;
    this.scInputs.customernumber = this.data.customerNumber;
    this.scInputs.customername = this.data.customerName;
    this.scInputs.type = this.data.type;
    this.scInputs.debitorname = this.data.debitorName;
    this.scInputs.debitornumber = this.data.debitorNumber;
    this.surchargeRates = this.data.rates;
    this.surchargeRatesDataSource.data = this.data.rates;
  }

  ngOnInit() {
    this.scForm = new FormGroup({
      debitorenumber: new FormControl('', Validators.required),
      debitorname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      rates: new FormControl('', Validators.required)
    });

    this.scrForm = new FormGroup({
      surchargecustomer_id: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      dailyrate: new FormControl('', Validators.required)
    });
  }

  addSurchargeRate() {
    const rateToAdd: SurchargeCustomerRate = {
      id: null,
      year: this.scrInputs.year,
      dailyrate: this.scrInputs.dailyrate
    };
    this.surchargeRates.push(rateToAdd);
    this.surchargeRatesDataSource.data = this.surchargeRates;

    this.scrInputs.year = 0;
    this.scrInputs.dailyrate = 0;
  }

  editSurchargeCustomer() {
    const surchargeCustomerToEdit = {
      debitornumber: this.scInputs.debitornumber,
      debitorname: this.scInputs.debitorname,
      customername: this.scInputs.customername,
      customernumber: this.scInputs.customernumber,
      type: this.scInputs.type,
      rates: this.surchargeRates
    };
    this.dialogRef.close(surchargeCustomerToEdit);
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
}
