import { CbAddDialogComponent } from './cb-add-dialog/cb-add-dialog.component';
import { CustomerBase } from './../../shared/models/customerbase';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, AfterContentInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CustomerBaseService } from './services/customer-base.service';

@Component({
  selector: 'app-customerbase',
  templateUrl: './customerbase.component.html',
  styleUrls: ['./customerbase.component.css']
})
export class CustomerBaseComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['blz', 'block', 'node', 'customername', 'bankgroup', 'cluster', 'menu'];

  dataSource = new MatTableDataSource<CustomerBase>();
  filteredDataSource = new MatTableDataSource<CustomerBase>();
  customerBase: CustomerBase[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  blzSearch = false;
  blockSearch = false;
  nodeSearch = false;
  customernameSearch = false;
  bankgroupSearch = false;
  clusterSearch = false;

  blzSearchQuery = 0;
  blockSearchQuery = '';
  nodeSearchQuery = '';
  customernameSearchQuery = '';
  bankgroupSearchQuery = '';
  clusterSearchQuery = '';

  addNewElement = false;

  cbForm;
  cbInputs: CustomerBase = {
    id: null,
    blz: 0,
    block: '',
    node: '',
    customername: '',
    bankgroup: '',
    cluster: ''
  };

  async ngOnInit() {
    this.selectedRow = 0;

    this.cbForm = new FormGroup({
      blz: new FormControl('', Validators.required),
      block: new FormControl('', Validators.required),
      node: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      bankgroup: new FormControl('', Validators.required),
      cluster: new FormControl('', Validators.required)
    });

    await this.customerBaseService.getCustomerBase().subscribe(data => {
      this.customerBase = data;
      this.dataSource.data = this.customerBase;
      this.filteredDataSource.data = this.customerBase;
    });
  }

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator;
  }

  // ngAfterContentInit() {
  //   document.addEventListener('click', function (event) {
  //     document.getElementById('mat-select-0').blur();
  //   });
  // }

  constructor(
    public dialog: MatDialog, private customerBaseService: CustomerBaseService
  ) { }

  filter() {
    this.filteredDataSource.data = this.dataSource.data;

    // console.log(this.blzSearchQuery);

    this.filteredDataSource.data = (this.blockSearchQuery) ?
      // tslint:disable-next-line:max-line-length
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

    this.filteredDataSource.data = (this.customernameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customername.toLocaleLowerCase()
        .includes(this.customernameSearchQuery.trim().toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.bankgroupSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.bankgroup.toLocaleLowerCase()
        .includes(this.bankgroupSearchQuery.trim().toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.clusterSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.cluster.toLocaleLowerCase()
        .includes(this.clusterSearchQuery.trim().toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.blzSearchQuery) ?
      this.filteredDataSource.data
      .sort(function(a: CustomerBase, b: CustomerBase) { return a.blz - b.blz; })
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

  get formcustomername() {
    return this.cbForm.get('customername');
  }

  get formbankgroup() {
    return this.cbForm.get('bankgroup');
  }

  get formcluster() {
    return this.cbForm.get('cluster');
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CbAddDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.customerBaseService.createCustomerBase(data);
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
    if (!this.customernameSearch) {
      this.customernameSearchQuery = '';
    }
    if (!this.bankgroupSearch) {
      this.bankgroupSearchQuery = '';
    }
    if (!this.clusterSearch) {
      this.clusterSearchQuery = '';
    }
    this.filter();
  }

  private pushObject(data: CustomerBase) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    this.dataSource.data.push(data);
    this.filteredDataSource.data = this.dataSource.data;
    this.paginator._changePageSize(this.paginator.pageSize);
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

  private confirmEdit() {
    if (this.cbForm.valid) {
      this.dataSource.data[this.selectedRowToEdit - 1].blz = this.cbInputs.blz;
      this.dataSource.data[this.selectedRowToEdit - 1].block = this.cbInputs.block;
      this.dataSource.data[this.selectedRowToEdit - 1].node = this.cbInputs.node;
      this.dataSource.data[this.selectedRowToEdit - 1].customername = this.cbInputs.customername;
      this.dataSource.data[this.selectedRowToEdit - 1].bankgroup = this.cbInputs.bankgroup;
      this.dataSource.data[this.selectedRowToEdit - 1].cluster = this.cbInputs.cluster;
      this.customerBaseService.updateCustomerBase(this.dataSource.data[this.selectedRowToEdit - 1]);
      this.selectedRowToEdit = -1;
    }
  }
  private setEditValues(rowNumber) {
    this.cbInputs.blz = this.dataSource.data[rowNumber - 1].blz;
    this.cbInputs.block = this.dataSource.data[rowNumber - 1].block;
    this.cbInputs.node = this.dataSource.data[rowNumber - 1].node;
    this.cbInputs.customername = this.dataSource.data[rowNumber - 1].customername;
    this.cbInputs.bankgroup = this.dataSource.data[rowNumber - 1].bankgroup;
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
