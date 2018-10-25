import { SurchargeCustomersService } from './../services/surcharge-customers.service';
import { SurchargeCustomer } from './../../../shared/models/surcharge.customer';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SurchargeCustomerRate } from 'src/app/shared/models/surcharge.customer.rate';

@Component({
  selector: 'app-sc-view-dialog',
  templateUrl: './sc-view-dialog.component.html',
  styleUrls: ['./sc-view-dialog.component.css']
})
export class ScViewDialogComponent implements OnInit {
  scForm;
  ratesArray: Object = [{
    year: 0,
    dailyrate: 0
  }];
  selectedRowToEdit = -1;
  scInputs: SurchargeCustomer = {
    id: null,
    debitornumber: 0,
    debitorname: '',
    type: '',
    customernumber: 0,
    customername: '',
    rates: null
  };
  surchargeCustomer: SurchargeCustomer[];
  scrForm;
  filteredDataSource = new MatTableDataSource<SurchargeCustomer>();
  dataSource = new MatTableDataSource<SurchargeCustomer>();
  scrInputs: SurchargeCustomerRate = {
    id: null,
    year: 0,
    dailyrate: 0
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private surchargeCustomersService: SurchargeCustomersService,
    private dialogRef: MatDialogRef<ScViewDialogComponent>
  ) {
    this.scForm = new FormGroup({
      debitorenumber: new FormControl('', Validators.required),
      debitorname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      rates: new FormControl('', Validators.required)
    });
    this.scInputs.customernumber = this.data.customerNumberData;
    this.scInputs.customername = this.data.customerNameData;
    this.scInputs.type = this.data.typeData;
    this.scInputs.debitorname = this.data.debitorNameData;
    this.scInputs.debitornumber = this.data.debitorNumberData;
    this.scInputs.rates = this.data.rateData;
    for (let index = 0; index < this.scInputs.rates.length; index++) {
      this.ratesArray[index] = this.scInputs.rates[index];
    }
  }
  async ngOnInit() {

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
