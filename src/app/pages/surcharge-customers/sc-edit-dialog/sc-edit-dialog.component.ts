import { SurchargeCustomersService } from './../services/surcharge-customers.service';
import { SurchargeCustomersRateService } from './../surchargecustomersrates/services/surcharge-customers-rates.service';
import { SurchargeCustomerRate } from './../../../shared/models/surcharge-customer-rate';
import { SurchargeCustomer } from '../../../shared/models/surcharge-custome';
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
    debitorNumber: 0,
    debitorName: '',
    type: '',
    customerNumber: 0,
    customerName: '',
    rates: null
  };

  scrForm;
  scrInputs: SurchargeCustomerRate = {
    id: null,
    year: null,
    dailyrateAt: null,
    dailyrateHu: null,
    dailyrateSk: null,
    dailyrateRo: null
  };

  scrEditForm;
  scrInputsEdit: SurchargeCustomerRate = {
    id: null,
    year: 0,
    dailyrateAt: 0,
    dailyrateHu: 0,
    dailyrateSk: 0,
    dailyrateRo: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SurchargeCustomer,
    private dialogRef: MatDialogRef<ScEditDialogComponent>,
    private surchargeCustomerService: SurchargeCustomersService
  ) {
    this.scInputs.id = this.data.id;
    this.scInputs.customerNumber = this.data.customerNumber;
    this.scInputs.customerName = this.data.customerName;
    this.scInputs.type = this.data.type;
    this.scInputs.debitorName = this.data.debitorName;
    this.scInputs.debitorNumber = this.data.debitorNumber;
    this.surchargeRates = this.data.rates;
    this.surchargeRatesDataSource.data = this.data.rates;
  }

  private isFieldChanged() {
    if (this.scInputs.debitorNumber === this.data.debitorNumber  &&
      this.scInputs.debitorName === this.data.debitorName &&
      this.scInputs.type === this.data.type &&
      this.scInputs.customerNumber === this.data.customerNumber &&
      this.scInputs.customerName === this.data.customerName) {
        return false;
    }
  }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();

    this.scForm = new FormGroup({
      debitorenumber: new FormControl('', Validators.required),
      debitorName: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customerNumber: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
    });

    this.scrForm = new FormGroup({
      year: new FormControl('', Validators.required),
      dailyrateAt: new FormControl('', Validators.required),
      dailyrateHu: new FormControl('', Validators.required),
      dailyrateSk: new FormControl('', Validators.required),
      dailyrateRo: new FormControl('', Validators.required),
    });

    this.scrEditForm = new FormGroup({
      dailyrateAt: new FormControl('', Validators.required),
      dailyrateHu: new FormControl('', Validators.required),
      dailyrateSk: new FormControl('', Validators.required),
      dailyrateRo: new FormControl('', Validators.required),
    });
  }

  addSurchargeRate() {
    const rateToAdd: SurchargeCustomerRate = {
      id: null,
      year: this.scrInputs.year,
      dailyrateAt: this.scrInputs.dailyrateRo,
      dailyrateHu: this.scrInputs.dailyrateHu,
      dailyrateSk: this.scrInputs.dailyrateSk,
      dailyrateRo: this.scrInputs.dailyrateRo
    };
    this.surchargeRates.push(rateToAdd);
    this.surchargeRatesDataSource.data = this.surchargeRates;

    this.scrInputs.year = null;
    this.scrInputs.dailyrateAt = null;
    this.scrInputs.dailyrateHu = null;
    this.scrInputs.dailyrateSk = null;
    this.scrInputs.dailyrateRo = null;

    this.scrForm = new FormGroup({
      year: new FormControl('', Validators.required),
      dailyrateAt: new FormControl('', Validators.required),
      dailyrateHu: new FormControl('', Validators.required),
      dailyrateSk: new FormControl('', Validators.required),
      dailyrateRo: new FormControl('', Validators.required),
    });
  }

  private confirmDailyRateEdit(index) {
    this.surchargeRates[index].dailyrateAt = this.scrInputsEdit.dailyrateAt;
    this.surchargeRates[index].dailyrateHu = this.scrInputsEdit.dailyrateHu;
    this.surchargeRates[index].dailyrateSk = this.scrInputsEdit.dailyrateSk;
    this.surchargeRates[index].dailyrateRo = this.scrInputsEdit.dailyrateRo;
    this.surchargeRatesDataSource.data = this.surchargeRates;

    this.data.rates[0].dailyrateAt = this.surchargeRatesDataSource.data[0].dailyrateAt;
    this.data.rates[0].dailyrateHu = this.surchargeRatesDataSource.data[0].dailyrateHu;
    this.data.rates[0].dailyrateSk = this.surchargeRatesDataSource.data[0].dailyrateSk;
    this.data.rates[0].dailyrateRo = this.surchargeRatesDataSource.data[0].dailyrateRo;
    this.data.rates[0].id = this.surchargeRatesDataSource.data[0].id;
    this.data.rates[0].year = this.surchargeRatesDataSource.data[0].year;
    this.surchargeCustomerService.updateSurchargeCustomer(this.data);
    console.log(this.data);
    this.editDailyRate = false;
  }

  private dailyRateEdit(index) {
    this.editDailyRate = true;
    this.scrInputsEdit.dailyrateAt = this.surchargeRates[index].dailyrateAt;
    this.scrInputsEdit.dailyrateHu = this.surchargeRates[index].dailyrateHu;
    this.scrInputsEdit.dailyrateSk = this.surchargeRates[index].dailyrateSk;
    this.scrInputsEdit.dailyrateRo = this.surchargeRates[index].dailyrateRo;
  }

  private cancelDailyRateEdit() {
    this.editDailyRate = false;
  }

  editSurchargeCustomer() {
    const surchargeCustomerToEdit = {
      debitorNumber: this.scInputs.debitorNumber,
      debitorName: this.scInputs.debitorName,
      customerName: this.scInputs.customerName,
      customerNumber: this.scInputs.customerNumber,
      type: this.scInputs.type,
      rates: this.surchargeRates
    };
    this.dialogRef.close(surchargeCustomerToEdit);
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

  get formEditAT() {
    return this.scrEditForm.get('dailyrateAt');
  }

  get formEditHU() {
    return this.scrEditForm.get('dailyrateHu');
  }

  get formEditSK() {
    return this.scrEditForm.get('dailyrateSk');
  }

  get formEditRO() {
    return this.scrEditForm.get('dailyrateRo');
  }
}
