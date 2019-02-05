import { CustomerInfoAddDialogComponent } from './customer-info-add-dialog/customer-info-add-dialog.component';
import { CustomerInfo } from '../../shared/models/customer-info';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit} from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CustomerInfoService } from './services/customer-info.service';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})

export class CustomerInfoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['blz', 'block', 'node', 'customerName', 'bankGroup', 'cluster', 'menu'];

  dataSource = new MatTableDataSource<CustomerInfo>();
  filteredDataSource = new MatTableDataSource<CustomerInfo>();
  CustomerInfo: CustomerInfo[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedPageSize = 5;
  selectedRowToEdit = -1;
  selectedRow = -1;

  blzSearch = false;
  blockSearch = false;
  nodeSearch = false;
  customerNameSearch = false;
  bankGroupSearch = false;
  clusterSearch = false;

  blzSearchQuery = 0;
  blockSearchQuery = '';
  nodeSearchQuery = '';
  customerNameSearchQuery = '';
  bankGroupSearchQuery = '';
  clusterSearchQuery = '';

  addNewElement = false;

  cbForm;
  cbInputs: CustomerInfo = {
    id: null,
    blz: 0,
    block: '',
    node: '',
    customerName: '',
    bankGroup: '',
    cluster: ''
  };

  async ngOnInit() {
    this.selectedRow = 0;

    this.cbForm = new FormGroup({
      blz: new FormControl('', Validators.required),
      block: new FormControl('', Validators.required),
      node: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      bankGroup: new FormControl('', Validators.required),
      cluster: new FormControl('', Validators.required)
    });

    await this.customerInfoService.getCustomerInfo().subscribe(data => {
      this.CustomerInfo = data;
      this.dataSource.data = this.CustomerInfo;
      this.filteredDataSource.data = this.CustomerInfo;
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

  constructor(
    public dialog: MatDialog, private customerInfoService: CustomerInfoService
  ) { }

  filter() {
    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.blockSearchQuery) ?
      this.dataSource.data
        .filter(p => p.block
          .toLocaleLowerCase()
          .includes(this.blockSearchQuery.trim().toLocaleLowerCase()))
      : this.dataSource.data;

    this.filteredDataSource.data = (this.nodeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.node
        .toLocaleLowerCase()
        .includes(this.nodeSearchQuery.trim().toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.customerNameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customerName.toLocaleLowerCase()
        .includes(this.customerNameSearchQuery.trim().toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.bankGroupSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.bankGroup.toLocaleLowerCase()
        .includes(this.bankGroupSearchQuery.trim().toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.clusterSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.cluster.toLocaleLowerCase()
        .includes(this.clusterSearchQuery.trim().toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.blzSearchQuery) ?
      this.filteredDataSource.data
        .sort(function (a: CustomerInfo, b: CustomerInfo) { return a.blz - b.blz; })
        .filter(p => p.blz.toString().includes(this.blzSearchQuery.toString()))
      : this.filteredDataSource.data;
  }

  get formblz() {
    return this.cbForm.get('blz');
  }

  get formblock() {
    return this.cbForm.get('block');
  }

  get formnode() {
    return this.cbForm.get('node');
  }

  get formcustomerName() {
    return this.cbForm.get('customerName');
  }

  get formbankGroup() {
    return this.cbForm.get('bankGroup');
  }

  get formcluster() {
    return this.cbForm.get('cluster');
  }

  triggerBlur() {
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerInfoAddDialogComponent, {
      width: '33%',
      height: '58%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.customerInfoService.createCustomerInfo(data);
        this.pushObject(data);
      }
    });
  }

  clearSearchInputBox() {
    if (!this.blzSearch) {
      this.blzSearchQuery = 0;
    }
    if (!this.blockSearch) {
      this.blockSearchQuery = '';
    }
    if (!this.nodeSearch) {
      this.nodeSearchQuery = '';
    }
    if (!this.customerNameSearch) {
      this.customerNameSearchQuery = '';
    }
    if (!this.bankGroupSearch) {
      this.bankGroupSearchQuery = '';
    }
    if (!this.clusterSearch) {
      this.clusterSearchQuery = '';
    }
    this.filter();
  }

  async pushObject(data: CustomerInfo) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    this.dataSource.data.push(data);
    this.filteredDataSource.data = this.dataSource.data;
    await this.filteredDataSource._updatePaginator(this.dataSource.data.length);
    this.filteredDataSource.paginator.lastPage();
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

  private isFieldChanged() {
    if (this.cbInputs.blz === this.dataSource.data[this.selectedRowToEdit - 1].blz  &&
      this.cbInputs.block === this.dataSource.data[this.selectedRowToEdit - 1].block &&
      this.cbInputs.node === this.dataSource.data[this.selectedRowToEdit - 1].node &&
      this.cbInputs.customerName === this.dataSource.data[this.selectedRowToEdit - 1].customerName &&
      this.cbInputs.bankGroup === this.dataSource.data[this.selectedRowToEdit - 1].bankGroup &&
      this.cbInputs.cluster === this.dataSource.data[this.selectedRowToEdit - 1].cluster) {
        return false;
    }
  }

  private confirmEdit() {
    if (this.cbForm.valid) {
      this.dataSource.data[this.selectedRowToEdit - 1].blz = this.cbInputs.blz;
      this.dataSource.data[this.selectedRowToEdit - 1].block = this.cbInputs.block;
      this.dataSource.data[this.selectedRowToEdit - 1].node = this.cbInputs.node;
      this.dataSource.data[this.selectedRowToEdit - 1].customerName = this.cbInputs.customerName;
      this.dataSource.data[this.selectedRowToEdit - 1].bankGroup = this.cbInputs.bankGroup;
      this.dataSource.data[this.selectedRowToEdit - 1].cluster = this.cbInputs.cluster;
      this.customerInfoService.updateCustomerInfo(this.dataSource.data[this.selectedRowToEdit - 1]);
      this.selectedRowToEdit = -1;
    }
  }
  private setEditValues(rowNumber) {
    this.cbInputs.blz = this.dataSource.data[rowNumber - 1].blz;
    this.cbInputs.block = this.dataSource.data[rowNumber - 1].block;
    this.cbInputs.node = this.dataSource.data[rowNumber - 1].node;
    this.cbInputs.customerName = this.dataSource.data[rowNumber - 1].customerName;
    this.cbInputs.bankGroup = this.dataSource.data[rowNumber - 1].bankGroup;
    this.cbInputs.cluster = this.dataSource.data[rowNumber - 1].cluster;
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
