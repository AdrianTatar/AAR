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
    at: null,
    hu: null,
    sk: null,
    ro: null
  };

  scrEditForm;
  scrInputsEdit: SurchargeCustomerRate = {
    id: null,
    year: 0,
    at: 0,
    hu: 0,
    sk: 0,
    ro: 0
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
      at: new FormControl('', Validators.required),
      hu: new FormControl('', Validators.required),
      sk: new FormControl('', Validators.required),
      ro: new FormControl('', Validators.required),
    });

    this.scrEditForm = new FormGroup({
      at: new FormControl('', Validators.required),
      hu: new FormControl('', Validators.required),
      sk: new FormControl('', Validators.required),
      ro: new FormControl('', Validators.required),
    });
  }

  addSurchargeRate() {
    const rateToAdd: SurchargeCustomerRate = {
      id: null,
      year: this.scrInputs.year,
      at: this.scrInputs.ro,
      hu: this.scrInputs.hu,
      sk: this.scrInputs.sk,
      ro: this.scrInputs.ro
    };
    this.surchargeRates.push(rateToAdd);
    this.surchargeRatesDataSource.data = this.surchargeRates;

    this.scrInputs.year = null;
    this.scrInputs.at = null;
    this.scrInputs.hu = null;
    this.scrInputs.sk = null;
    this.scrInputs.ro = null;

    this.scrForm = new FormGroup({
      year: new FormControl('', Validators.required),
      at: new FormControl('', Validators.required),
      hu: new FormControl('', Validators.required),
      sk: new FormControl('', Validators.required),
      ro: new FormControl('', Validators.required),
    });
  }

  private confirmDailyRateEdit(index) {
    this.surchargeRates[index].at = this.scrInputsEdit.at;
    this.surchargeRates[index].hu = this.scrInputsEdit.hu;
    this.surchargeRates[index].sk = this.scrInputsEdit.sk;
    this.surchargeRates[index].ro = this.scrInputsEdit.ro;
    this.surchargeRatesDataSource.data = this.surchargeRates;
    this.editDailyRate = false;
  }

  private dailyRateEdit(index) {
    this.editDailyRate = true;
    this.scrInputsEdit.at = this.surchargeRates[index].at;
    this.scrInputsEdit.hu = this.surchargeRates[index].hu;
    this.scrInputsEdit.sk = this.surchargeRates[index].sk;
    this.scrInputsEdit.ro = this.surchargeRates[index].ro;
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
    return this.scrForm.get('at');
  }

  get formHU() {
    return this.scrForm.get('hu');
  }

  get formSK() {
    return this.scrForm.get('sk');
  }

  get formRO() {
    return this.scrForm.get('ro');
  }

  get formEditAT() {
    return this.scrEditForm.get('at');
  }

  get formEditHU() {
    return this.scrEditForm.get('hu');
  }

  get formEditSK() {
    return this.scrEditForm.get('sk');
  }

  get formEditRO() {
    return this.scrEditForm.get('ro');
  }
}
