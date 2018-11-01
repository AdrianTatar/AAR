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
  displayedColumns: String[] = ['year', 'dailyrate'];
  dataSource = new MatTableDataSource<SurchargeCustomer>();
  filteredDataSource = new MatTableDataSource<SurchargeCustomer>();
  surchargeCustomer: SurchargeCustomer[];
  selectedRowToEdit = -1;

  ratesArray: Object = [{
    id: null,
    year: 0,
    dailyrate: 0
  }];
  addedElement: SurchargeCustomer = {
    id: null,
    debitornumber: 0,
    debitorname: '',
    type: '',
    customernumber: 0,
    customername: '',
    rates: null
  };
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

  l;

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
    this.scInputs.id = this.data.customerId;
    this.scInputs.customernumber = this.data.customerNumberData;
    this.scInputs.customername = this.data.customerNameData;
    this.scInputs.type = this.data.typeData;
    this.scInputs.debitorname = this.data.debitorNameData;
    this.scInputs.debitornumber = this.data.debitorNumberData;
    this.scInputs.rates = this.data.rateData;
    for (let index = 0; index < this.scInputs.rates.length; index++) {
      this.ratesArray[index] = this.scInputs.rates[index];
    }
    this.l = this.scInputs.rates.length;
  }

  async ngOnInit() {

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

    await this.surchargeCustomersService.getSurchargeCustomers().subscribe(data => {
      this.surchargeCustomer = data;
      this.dataSource.data = this.surchargeCustomer;
      this.filteredDataSource.data = this.surchargeCustomer;
    });
  }

  editRatesTable() {
    this.addedElement = this.scInputs;
    this.addedElement.rates.push(this.scrInputs);
    for (let index = 0; index < this.addedElement.rates.length; index++) {
      this.ratesArray[index] = this.addedElement.rates[index];
    }
    for (let index = this.l; index < this.addedElement.rates.length; index++) {
      this.ratesArray[index].id = this.addedElement.rates[index - 1].id + 2;
    }
  }

  save() {
    this.addedElement = this.scInputs;
    this.addedElement.customername = this.scInputs.customername;
    this.addedElement.customernumber = this.scInputs.customernumber;
    this.addedElement.type = this.scInputs.type;
    this.addedElement.debitorname = this.scInputs.debitorname;
    this.addedElement.debitornumber = this.scInputs.debitornumber;
    this.dialogRef.close(this.addedElement);
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

  private pushObject(data: SurchargeCustomer) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
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
