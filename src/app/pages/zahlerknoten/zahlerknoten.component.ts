import { ZahAddDialogComponent } from './zah-add-dialog/zah-add-dialog.component';
import { PayerNode } from '../../shared/models/payernode';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-zahlerknoten',
  templateUrl: './zahlerknoten.component.html',
  styleUrls: ['./zahlerknoten.component.css']
})
export class ZahlerknotenComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['customernumber', 'customername', 'hierarchy', 'payernodenumber', 'payernodedescription', 'payernodecode', 'menu'];

  dataSource = new MatTableDataSource<PayerNode>(ELEMENT_DATA);
  filteredDataSource = new MatTableDataSource<PayerNode>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  customernumberSearch = false;
  customernameSearch = false;
  hierarchySearch = false;
  payernodenumberSearch = false;
  payernodedescriptionSearch = false;
  payernodecodeSearch = false;

  customernumberSearchQuery = '';
  customernameSearchQuery = '';
  hierarchySearchQuery = '';
  payernodenumberSearchQuery = 0;
  payernodedescriptionSearchQuery = '';
  payernodecodeSearchQuery = '';

  addNewElement = false;

  fppForm;
  fppInputs: PayerNode = {
    id: null,
    customernumber : '',
    customername : '',
    hierarchy : '',
    payernodenumber : 0,
    payernodedescription : '',
    payernodecode : ''
  };

  constructor(
    public dialog: MatDialog
  ) { }

  filter() {
    this.filteredDataSource.data = (this.customernumberSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customernumber.toLocaleLowerCase()
      .includes(this.customernumberSearchQuery.toLocaleLowerCase()))
      : this.dataSource.data;

    this.filteredDataSource.data = (this.customernameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customername.toLocaleLowerCase()
        .includes(this.customernameSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.hierarchySearchQuery) ?
      this.filteredDataSource.data.filter(p => p.hierarchy.toLocaleLowerCase()
        .includes(this.hierarchySearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.payernodenumberSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.payernodenumber === this.payernodenumberSearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.payernodedescriptionSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.payernodedescription.toLocaleLowerCase()
        .includes(this.payernodedescriptionSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.payernodecodeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.payernodecode.toLocaleLowerCase()
        .includes(this.payernodecodeSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;

    this.fppForm = new FormGroup({
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      hierarchy: new FormControl('', Validators.required),
      payernodenumber: new FormControl('', Validators.required),
      payernodedescription: new FormControl('', Validators.required),
      payernodecode: new FormControl('', Validators.required)
    });
  }

  get formcustomernumber() {
    return this.fppForm.get('customernumber');
  }

  get formcustomername() {
    return this.fppForm.get('customername');
  }

  get formhierarchy() {
    return this.fppForm.get('hierarchy');
  }

  get formpayernodenumber() {
    return this.fppForm.get('payernodenumber');
  }

  get formpayernodedescription() {
    return this.fppForm.get('payernodedescription');
  }

  get formpayernodecode() {
    return this.fppForm.get('payernodecode');
  }

  ngAfterViewInit() {
    // document.addEventListener('click', function (event) {
    //   document.getElementById('mat-select-0').blur();
    // });
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
    const dialogRef = this.dialog.open(ZahAddDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.pushObject(data);
      }
    });
  }

  private pushObject(data: PayerNode) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    this.dataSource.data.push(data);
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  private selectRow(rowNumber) {
    this.selectedRow = rowNumber;
  }

  private editRow(rowNumber) {
    this.setEditValues(rowNumber);
    this.selectedRowToEdit = rowNumber;
  }

  private cancelEdit() {
    this.selectedRowToEdit = -1;
  }

  private confirmEdit() {
    this.dataSource.data[this.selectedRowToEdit - 1].customernumber = this.fppInputs.customernumber;
    this.dataSource.data[this.selectedRowToEdit - 1].customername = this.fppInputs.customername;
    this.dataSource.data[this.selectedRowToEdit - 1].hierarchy = this.fppInputs.hierarchy;
    this.dataSource.data[this.selectedRowToEdit - 1].payernodenumber = this.fppInputs.payernodenumber;
    this.dataSource.data[this.selectedRowToEdit - 1].payernodedescription = this.fppInputs.payernodedescription;
    this.dataSource.data[this.selectedRowToEdit - 1].payernodecode = this.fppInputs.payernodecode;
    this.selectedRowToEdit = -1;
  }

  private setEditValues(rowNumber) {
    this.fppInputs.customernumber = this.dataSource.data[rowNumber - 1].customernumber;
    this.fppInputs.customername = this.dataSource.data[rowNumber - 1].customername;
    this.fppInputs.hierarchy = this.dataSource.data[rowNumber - 1].hierarchy;
    this.fppInputs.payernodenumber = this.dataSource.data[rowNumber - 1].payernodenumber;
    this.fppInputs.payernodedescription = this.dataSource.data[rowNumber - 1].payernodedescription;
    this.fppInputs.payernodecode = this.dataSource.data[rowNumber - 1].payernodecode;
  }
}

// Mock-Up
const ELEMENT_DATA: PayerNode[] = [
  {
    id: 1,
    customernumber: '34738',
    customername: 'TOKIO',
    hierarchy: 'Tirol',
    payernodenumber: 21,
    payernodedescription: 'RBG TIR',
    payernodecode: 'Primärebene'
  },
  {
    id: 2,
    customernumber: '36215',
    customername: 'SIENA',
    hierarchy: 'NÖW',
    payernodenumber: 22,
    payernodedescription: 'RBG TIR',
    payernodecode: 'Primärebene'
  },
  {
    id: 3,
    customernumber: '36215',
    customername: 'SBG',
    hierarchy: 'Tirol',
    payernodenumber: 23,
    payernodedescription: 'RBG TIR',
    payernodecode: 'Primärebene'
  }
];
