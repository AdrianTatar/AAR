import { SurchargeCustomersRateService } from './../surchargecustomersrates/services/surcharge-customers-rates.service';
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
  l;
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

  scrForm;
  scrInputs: SurchargeCustomerRate = {
    id: null,
    year: 0,
    dailyrate: 0
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private surchargeCustomersService: SurchargeCustomersService,
    private dialogRef: MatDialogRef<ScAddDialogComponent>
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
  editRatesTable() {
    this.addedElement = this.scInputs;
    console.log(this.addedElement);
    this.addedElement.rates.push(this.scrInputs);
    console.log(this.addedElement);
  }

  save() {
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
