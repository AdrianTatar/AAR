import { SurchargeCustomersService } from './services/surcharge-customers.service';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SurchargeCustomer } from '../../shared/models/surcharge-custome';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScAddDialogComponent } from './sc-add-dialog/sc-add-dialog.component';
import { ScEditDialogComponent } from './sc-edit-dialog/sc-edit-dialog.component';
import { ScViewDialogComponent } from './sc-view-dialog/sc-view-dialog.component';
import { delay } from 'q';

@Component({
  selector: 'app-surcharge-customers',
  templateUrl: './surcharge-customers.component.html',
  styleUrls: ['./surcharge-customers.component.css']
})
export class SurchargeCustomersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['debitorNumber', 'debitorName',
    'type', 'customerNumber', 'customerName', 'year',
    'menu'];
  dataSource = new MatTableDataSource<SurchargeCustomer>();
  filteredDataSource = new MatTableDataSource<SurchargeCustomer>();
  surchargeCustomer: SurchargeCustomer[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  debitorNumberSearch = false;
  debitorNameSearch = false;
  typeSearch = false;
  customerNumberSearch = false;
  customerNameSearch = false;

  debitorNumberSearchQuery = 0;
  debitorNameSearchQuery = '';
  typeSearchQuery = '';
  customerNumberSearchQuery = 0;
  customerNameSearchQuery = '';

  addNewElement = false;

  scForm;
  scInputs: SurchargeCustomer = {
    id: null,
    debitorNumber: null,
    debitorName: '',
    type: '',
    customerNumber: null,
    customerName: '',
    rates: null
  };

  constructor(
    public dialog: MatDialog, private surchargeCustomerService: SurchargeCustomersService
  ) { }

  async ngOnInit() {
    this.scForm = new FormGroup({
      debitorNumber: new FormControl('', Validators.required),
      debitorName: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customerNumber: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
    });

    await this.surchargeCustomerService.getSurchargeCustomers().subscribe(data => {
      this.surchargeCustomer = data;
      this.dataSource.data = this.surchargeCustomer;
      this.filteredDataSource.data = this.surchargeCustomer;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.filteredDataSource.paginator = this.paginator;

    document.addEventListener('click', function (event) {
      if (document.getElementById('mat-select-0')) {
        document.getElementById('mat-select-0').blur();
      }
    });
  }

  filter() {
    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.debitorNumberSearchQuery) ?
      this.filteredDataSource.data
        .sort(function (a: SurchargeCustomer, b: SurchargeCustomer) { return a.debitorNumber - b.debitorNumber; })
        .filter(p => p.debitorNumber.toString()
          .includes(this.debitorNumberSearchQuery.toString().trim()))
      : this.dataSource.data;

    this.filteredDataSource.data = (this.debitorNameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.debitorName
        .toLocaleLowerCase()
        .trim()
        .includes(this.debitorNameSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.typeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.type
        .toLocaleLowerCase()
        .trim()
        .includes(this.typeSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.customerNumberSearchQuery) ?
      this.filteredDataSource.data
        .sort(function (a: SurchargeCustomer, b: SurchargeCustomer) { return a.customerNumber - b.customerNumber; })
        .filter(p => p.customerNumber
          .toString()
          .includes(this.customerNumberSearchQuery.toString().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.customerNameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customerName
        .toLocaleLowerCase()
        .trim()
        .includes(this.customerNameSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;
  }

  @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      if (!this.paginator.hasNextPage()) {
        if (this.selectedRow < (this.paginator.length % this.paginator.pageSize) - 1) {
          this.selectedRow++;
        }
      } else {
        this.selectedRow++;
      }
      if (this.selectedRow === this.paginator.pageSize && this.paginator.hasNextPage()) {
        this.paginator.nextPage();
        this.selectedRow = 0;
      }
    } else if (event.key === 'ArrowUp') {
      if (!this.paginator.hasPreviousPage()) {
        if (this.selectedRow !== 0) {
          this.selectedRow--;
        }
      } else {
        this.selectedRow--;
      }
      if (this.selectedRow === -1 && this.paginator.hasPreviousPage()) {
        this.paginator.previousPage();
        this.selectedRow = this.paginator.pageSize - 1;
      }
    }
  }

  get formdebitorNumber() {
    return this.scForm.get('debitorNumber');
  }

  get formdebitorName() {
    return this.scForm.get('debitorName');
  }

  get formType() {
    return this.scForm.get('type');
  }

  get formcustomerNumber() {
    return this.scForm.get('customerNumber');
  }

  get formcustomerName() {
    return this.scForm.get('customerName');
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
      width: '60%',
      height: '85%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.surchargeCustomerService.createSurchargeCustomer(data);
        this.pushObject(data);
      }
    });
  }

  openEditDialog(rowNumber): void {
    this.selectedRowToEdit = this.mapToDataSource(rowNumber);
    const dialogRef = this.dialog.open(ScEditDialogComponent, {
      width: '60%',
      height: '87%',
      disableClose: true,
      data: {
        id: this.dataSource.data[this.selectedRowToEdit - 1].id,
        debitorName: this.dataSource.data[this.selectedRowToEdit - 1].debitorName,
        debitorNumber: this.dataSource.data[this.selectedRowToEdit - 1].debitorNumber,
        type: this.dataSource.data[this.selectedRowToEdit - 1].type,
        customerName: this.dataSource.data[this.selectedRowToEdit - 1].customerName,
        customerNumber: this.dataSource.data[this.selectedRowToEdit - 1].customerNumber,
        rates: this.dataSource.data[this.selectedRowToEdit - 1].rates,
      }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.dataSource.data[this.selectedRowToEdit - 1] = data;
        this.surchargeCustomerService.updateSurchargeCustomer(this.dataSource.data[this.selectedRowToEdit - 1]);
        this.selectedRowToEdit = -1;
        this.filter();
      }
    });
  }

  openViewDialog(selectedRow): void {
    const dialogRef = this.dialog.open(ScViewDialogComponent, {
      width: '60%',
      height: '75%',
      data: {
        debitorName: this.dataSource.data[selectedRow - 1].debitorName,
        debitorNumber: this.dataSource.data[selectedRow - 1].debitorNumber,
        type: this.dataSource.data[selectedRow - 1].type,
        customerName: this.dataSource.data[selectedRow - 1].customerName,
        customerNumber: this.dataSource.data[selectedRow - 1].customerNumber,
        rates: this.dataSource.data[selectedRow - 1].rates
      }
    });
  }

  async pushObject(data: SurchargeCustomer) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    this.dataSource.data.push(data);
    this.filteredDataSource.data = this.dataSource.data;
    await this.filteredDataSource._updatePaginator(this.dataSource.data.length);
    this.filteredDataSource.paginator.lastPage();
  }

  clearSearchInputBox() {
    if (!this.debitorNumberSearch) {
      this.debitorNumberSearchQuery = 0;
    }
    if (!this.debitorNameSearch) {
      this.debitorNameSearchQuery = '';
    }
    if (!this.typeSearch) {
      this.typeSearchQuery = '';
    }
    if (!this.customerNumberSearch) {
      this.customerNumberSearchQuery = 0;
    }
    if (!this.customerNameSearch) {
      this.customerNameSearchQuery = '';
    }
    this.filter();
  }

  private confirmEdit() {
    if (this.scForm.valid) {
      this.dataSource.data[this.selectedRowToEdit - 1].debitorNumber = this.scInputs.debitorNumber;
      this.dataSource.data[this.selectedRowToEdit - 1].debitorName = this.scInputs.debitorName;
      this.dataSource.data[this.selectedRowToEdit - 1].type = this.scInputs.type;
      this.dataSource.data[this.selectedRowToEdit - 1].customerNumber = this.scInputs.customerNumber;
      this.dataSource.data[this.selectedRowToEdit - 1].customerName = this.scInputs.customerName;
      this.dataSource.data[this.selectedRowToEdit - 1].rates = this.scInputs.rates;
      this.surchargeCustomerService.updateSurchargeCustomer(this.dataSource.data[this.selectedRowToEdit - 1]);
      this.selectedRowToEdit = -1;
    }
  }

  private setEditValues(rowNumber) {
    this.scInputs.debitorNumber = this.dataSource.data[rowNumber - 1].debitorNumber;
    this.scInputs.debitorName = this.dataSource.data[rowNumber - 1].debitorName;
    this.scInputs.type = this.dataSource.data[rowNumber - 1].type;
    this.scInputs.customerNumber = this.dataSource.data[rowNumber - 1].customerNumber;
    this.scInputs.customerName = this.dataSource.data[rowNumber - 1].customerName;
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
