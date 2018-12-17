import { SurchargeCustomersService } from './../services/surcharge-customers.service';
import { SurchargeCustomersRateService } from './../surchargecustomersrates/services/surcharge-customers-rates.service';
import { SurchargeCustomerRate } from './../../../shared/models/surcharge.customer.rate';
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

  displayedSurchargeRateColumns: String[] = ['year', 'at', 'hu', 'sk', 'ro', 'menu'];
  surchargeRates = [];
  surchargeRatesDataSource = new MatTableDataSource<SurchargeCustomerRate>(this.surchargeRates);

  currentYear;

  editDailyRate = false;

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
    year: null,
    dailyrate_at: null,
    dailyrate_hu: null,
    dailyrate_sk: null,
    dailyrate_ro: null
  };

  scrEditForm;
  scrInputsEdit: SurchargeCustomerRate = {
    id: null,
    year: 0,
    dailyrate_at: 0,
    dailyrate_hu: 0,
    dailyrate_sk: 0,
    dailyrate_ro: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SurchargeCustomer,
    private dialogRef: MatDialogRef<ScEditDialogComponent>,
    private surchargeCustomerService: SurchargeCustomersService
  ) {
    this.scInputs.id = this.data.id;
    this.scInputs.customernumber = this.data.customernumber;
    this.scInputs.customername = this.data.customername;
    this.scInputs.type = this.data.type;
    this.scInputs.debitorname = this.data.debitorname;
    this.scInputs.debitornumber = this.data.debitornumber;
    this.surchargeRates = this.data.rates;
    this.surchargeRatesDataSource.data = this.data.rates;
  }

  private isFieldChanged() {
    if (this.scInputs.debitornumber === this.data.debitornumber  &&
      this.scInputs.debitorname === this.data.debitorname &&
      this.scInputs.type === this.data.type &&
      this.scInputs.customernumber === this.data.customernumber &&
      this.scInputs.customername === this.data.customername) {
        return false;
    }
  }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();

    this.scForm = new FormGroup({
      debitorenumber: new FormControl('', Validators.required),
      debitorname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
    });

    this.scrForm = new FormGroup({
      year: new FormControl('', Validators.required),
      dailyrate_at: new FormControl('', Validators.required),
      dailyrate_hu: new FormControl('', Validators.required),
      dailyrate_sk: new FormControl('', Validators.required),
      dailyrate_ro: new FormControl('', Validators.required),
    });

    this.scrEditForm = new FormGroup({
      dailyrate_at: new FormControl('', Validators.required),
      dailyrate_hu: new FormControl('', Validators.required),
      dailyrate_sk: new FormControl('', Validators.required),
      dailyrate_ro: new FormControl('', Validators.required),
    });
  }

  addSurchargeRate() {
    const rateToAdd: SurchargeCustomerRate = {
      id: null,
      year: this.scrInputs.year,
      dailyrate_at: this.scrInputs.dailyrate_ro,
      dailyrate_hu: this.scrInputs.dailyrate_hu,
      dailyrate_sk: this.scrInputs.dailyrate_sk,
      dailyrate_ro: this.scrInputs.dailyrate_ro
    };
    this.surchargeRates.push(rateToAdd);
    this.surchargeRatesDataSource.data = this.surchargeRates;

    this.scrInputs.year = null;
    this.scrInputs.dailyrate_at = null;
    this.scrInputs.dailyrate_hu = null;
    this.scrInputs.dailyrate_sk = null;
    this.scrInputs.dailyrate_ro = null;

    this.scrForm = new FormGroup({
      year: new FormControl('', Validators.required),
      dailyrate_at: new FormControl('', Validators.required),
      dailyrate_hu: new FormControl('', Validators.required),
      dailyrate_sk: new FormControl('', Validators.required),
      dailyrate_ro: new FormControl('', Validators.required),
    });
  }

  private confirmDailyRateEdit(index) {
    this.surchargeRates[index].dailyrate_at = this.scrInputsEdit.dailyrate_at;
    this.surchargeRates[index].dailyrate_hu = this.scrInputsEdit.dailyrate_hu;
    this.surchargeRates[index].dailyrate_sk = this.scrInputsEdit.dailyrate_sk;
    this.surchargeRates[index].dailyrate_ro = this.scrInputsEdit.dailyrate_ro;
    this.surchargeRatesDataSource.data = this.surchargeRates;

    this.data.rates[0].dailyrate_at = this.surchargeRatesDataSource.data[0].dailyrate_at;
    this.data.rates[0].dailyrate_hu = this.surchargeRatesDataSource.data[0].dailyrate_hu;
    this.data.rates[0].dailyrate_sk = this.surchargeRatesDataSource.data[0].dailyrate_sk;
    this.data.rates[0].dailyrate_ro = this.surchargeRatesDataSource.data[0].dailyrate_ro;
    this.data.rates[0].id = this.surchargeRatesDataSource.data[0].id;
    this.data.rates[0].year = this.surchargeRatesDataSource.data[0].year;
    this.surchargeCustomerService.updateSurchargeCustomer(this.data);
    console.log(this.data);
    this.editDailyRate = false;
  }

  private dailyRateEdit(index) {
    this.editDailyRate = true;
    this.scrInputsEdit.dailyrate_at = this.surchargeRates[index].dailyrate_at;
    this.scrInputsEdit.dailyrate_hu = this.surchargeRates[index].dailyrate_hu;
    this.scrInputsEdit.dailyrate_sk = this.surchargeRates[index].dailyrate_sk;
    this.scrInputsEdit.dailyrate_ro = this.surchargeRates[index].dailyrate_ro;
  }

  private cancelDailyRateEdit() {
    this.editDailyRate = false;
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

  get formEditAT() {
    return this.scrEditForm.get('dailyrate_at');
  }

  get formEditHU() {
    return this.scrEditForm.get('dailyrate_hu');
  }

  get formEditSK() {
    return this.scrEditForm.get('dailyrate_sk');
  }

  get formEditRO() {
    return this.scrEditForm.get('dailyrate_ro');
  }
}
