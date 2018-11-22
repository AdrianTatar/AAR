import { SurchargeCustomer } from './../../../shared/models/surcharge.customer';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatTableDataSource } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SurchargeCustomerRate } from 'src/app/shared/models/surcharge.customer.rate';

@Component({
  selector: 'app-sc-view-dialog',
  templateUrl: './sc-view-dialog.component.html',
  styleUrls: ['./sc-view-dialog.component.css']
})
export class ScViewDialogComponent {

  displayedSurchargeRateColumns: String[] = ['year', 'at', 'hu', 'sk', 'ro'];
  surchargeRatesDataSource = new MatTableDataSource<SurchargeCustomerRate>();

  scInputs: SurchargeCustomer = {
    id: null,
    debitornumber: 0,
    debitorname: '',
    type: '',
    customernumber: 0,
    customername: '',
    rates: null
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ScViewDialogComponent>
  ) {
    this.scInputs.id = this.data.customerId;
    this.scInputs.customernumber = this.data.customerNumber;
    this.scInputs.customername = this.data.customerName;
    this.scInputs.type = this.data.type;
    this.scInputs.debitorname = this.data.debitorName;
    this.scInputs.debitornumber = this.data.debitorNumber;
    this.surchargeRatesDataSource.data = this.data.rates;
  }
}
