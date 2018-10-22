import { SurchargeCustomerRate } from './../../shared/models/surcharge.customer.rate';
import { SurchargeCustomersService } from './services/surcharge-customers.service';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SurchargeCustomer } from '../../shared/models/surcharge.customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScAddDialogComponent } from './sc-add-dialog/sc-add-dialog.component';
import { ScEditDialogComponent } from './sc-edit-dialog/sc-edit-dialog.component';
import { ScViewDialogComponent } from './sc-view-dialog/sc-view-dialog.component';

@Component({
  selector: 'app-surcharge-customers',
  templateUrl: './surcharge-customers.component.html',
  styleUrls: ['./surcharge-customers.component.css']
})
export class SurchargeCustomersComponent implements OnInit {

  displayedColumns: string[] = ['debitornumber', 'debitorname',
    'type', 'customernumber', 'customername', 'year',
    'menu'];
  dataSource = new MatTableDataSource<SurchargeCustomer>();
  filteredDataSource = new MatTableDataSource<SurchargeCustomer>();
  surchargeCustomer: SurchargeCustomer[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  debitornumberSearch = false;
  debitornameSearch = false;
  typeSearch = false;
  customernumberSearch = false;
  customernameSearch = false;

  debitornumberSearchQuery = 0;
  debitornameSearchQuery = '';
  typeSearchQuery = '';
  customernumberSearchQuery = 0;
  customernameSearchQuery = '';

  addNewElement = false;

  scForm;
  scInputs: SurchargeCustomer = {
    id: null,
    debitornumber: null,
    debitorname: '',
    type: '',
    customernumber: null,
    customername: '',
    rates: null
  };

  constructor(
    public dialog: MatDialog, private surchargeCustomerService: SurchargeCustomersService
  ) { }

  filter() {
    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.debitornumberSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.debitornumber === this.debitornumberSearchQuery)
      : this.dataSource.data;

    this.filteredDataSource.data = (this.debitornameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.debitorname.toLocaleLowerCase()
        .includes(this.debitornameSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.typeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.type.toLocaleLowerCase()
        .includes(this.typeSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.customernumberSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customernumber === this.customernumberSearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.customernameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customername.toLocaleLowerCase()
        .includes(this.customernameSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;
  }

  @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.selectedRow -= (this.selectedRow === 0 ? 0 : 1);
    } else if (event.key === 'ArrowDown'
      && ((this.selectedRow + 1) / this.paginator.pageSize < 1)
      && (this.selectedRow + 1 < this.dataSource.data.length)) {
      // Formula in the if statement is used to not let the selected row go to another page -it keeps it on the current page
      this.selectedRow += (this.selectedRow === this.dataSource.data.length ? 0 : 1);
    }
  }

  async ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;

    this.scForm = new FormGroup({
      debitornumber: new FormControl('', Validators.required),
      debitorname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
    });

    await this.surchargeCustomerService.getSurchargeCustomers().subscribe(data => {
      this.surchargeCustomer = data;
      this.dataSource.data = this.surchargeCustomer;
      this.filteredDataSource.data = this.surchargeCustomer;
    });
  }

  get formDebitornumber() {
    return this.scForm.get('debitornumber');
  }

  get formDebitorname() {
    return this.scForm.get('debitorname');
  }

  get formType() {
    return this.scForm.get('type');
  }

  get formCustomernumber() {
    return this.scForm.get('customernumber');
  }

  get formCustomername() {
    return this.scForm.get('customername');
  }

  private selectRow(rowNumber) {
    this.selectedRow = rowNumber;
  }

  private editRow(rowNumber) {
    this.selectedRowToEdit = this.mapToDataSource(rowNumber);
    this.setEditValues(this.selectedRowToEdit);
  }

  private cancelEdit() {
    this.selectedRowToEdit = -1;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ScAddDialogComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.pushObject(data);
      }
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ScEditDialogComponent, {
      width: '800px',
      disableClose: true,
      data: {
        debitorNameData: this.dataSource.data[this.selectedRow].debitorname,
        debitorNumberData: this.dataSource.data[this.selectedRow].debitornumber,
        typeData: this.dataSource.data[this.selectedRow].type,
        customerNameData: this.dataSource.data[this.selectedRow].customername,
        customerNumberData: this.dataSource.data[this.selectedRow].customernumber,
        rateData: this.dataSource.data[this.selectedRow].rates
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.pushObject(data);
      }
    });
  }

  openViewDialog(): void {
    const dialogRef = this.dialog.open(ScViewDialogComponent, {
      width: '800px',
      disableClose: true,
      data: {
        debitorNameData: this.dataSource.data[this.selectedRow].debitorname,
        debitorNumberData: this.dataSource.data[this.selectedRow].debitornumber,
        typeData: this.dataSource.data[this.selectedRow].type,
        customerNameData: this.dataSource.data[this.selectedRow].customername,
        customerNumberData: this.dataSource.data[this.selectedRow].customernumber,
        rateData: this.dataSource.data[this.selectedRow].rates
      }
    });
  }

  private pushObject(data: SurchargeCustomer) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    this.dataSource.data.push(data);
    this.filteredDataSource.data = this.dataSource.data;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  clearSearchInputBox() {
    if (!this.debitornumberSearch) {
      this.debitornumberSearchQuery = 0;
    }
    if (!this.debitornameSearch) {
      this.debitornameSearchQuery = '';
    }
    if (!this.typeSearch) {
      this.typeSearchQuery = '';
    }
    if (!this.customernumberSearch) {
      this.customernumberSearchQuery = 0;
    }
    if (!this.customernameSearch) {
      this.customernameSearchQuery = '';
    }
    this.filter();
  }

  private confirmEdit() {
    if (this.scForm.valid) {
      this.dataSource.data[this.selectedRowToEdit - 1].debitornumber = this.scInputs.debitornumber;
      this.dataSource.data[this.selectedRowToEdit - 1].debitorname = this.scInputs.debitorname;
      this.dataSource.data[this.selectedRowToEdit - 1].type = this.scInputs.type;
      this.dataSource.data[this.selectedRowToEdit - 1].customernumber = this.scInputs.customernumber;
      this.dataSource.data[this.selectedRowToEdit - 1].customername = this.scInputs.customername;
      this.surchargeCustomerService.updateSurchargeCustomer(this.dataSource.data[this.selectedRowToEdit - 1]);
      this.selectedRowToEdit = -1;
    }
  }

  private setEditValues(rowNumber) {
    this.scInputs.debitornumber = this.dataSource.data[rowNumber - 1].debitornumber;
    this.scInputs.debitorname = this.dataSource.data[rowNumber - 1].debitorname;
    this.scInputs.type = this.dataSource.data[rowNumber - 1].type;
    this.scInputs.customernumber = this.dataSource.data[rowNumber - 1].customernumber;
    this.scInputs.customername = this.dataSource.data[rowNumber - 1].customername;
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
