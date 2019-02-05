import { PayerNodeService } from './services/payernode.service';
import { PnAddDialogComponent } from './pn-add-dialog/pn-add-dialog.component';
import { PayerNode } from '../../shared/models/payernode';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, AfterContentInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-payernodes',
  templateUrl: './payernodes.component.html',
  styleUrls: ['./payernodes.component.css']
})
export class PayerNodesComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['customerNumber', 'customerName', 'hierarchy', 'payerNodeNumber', 'payerNodeDescription', 'payerNodeCode', 'menu'];

  dataSource = new MatTableDataSource<PayerNode>();
  filteredDataSource = new MatTableDataSource<PayerNode>();
  payerNodes: PayerNode[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  customerNumberSearch = false;
  customerNameSearch = false;
  hierarchySearch = false;
  payerNodeNumberSearch = false;
  payerNodeDescriptionSearch = false;
  payerNodeCodeSearch = false;

  customerNumberSearchQuery = 0;
  customerNameSearchQuery = '';
  hierarchySearchQuery = '';
  payerNodeNumberSearchQuery = 0;
  payerNodeDescriptionSearchQuery = '';
  payerNodeCodeSearchQuery = '';

  addNewElement = false;

  pnForm;
  pnInputs: PayerNode = {
    id: null,
    customerNumber: '',
    customerName: '',
    hierarchy: '',
    payerNodeNumber: 0,
    payerNodeDescription: '',
    payerNodeCode: ''
  };

  async ngOnInit() {
    this.selectedRow = 0;

    this.pnForm = new FormGroup({
      customerNumber: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      hierarchy: new FormControl('', Validators.required),
      payerNodeNumber: new FormControl('', Validators.required),
      payerNodeDescription: new FormControl('', Validators.required),
      payerNodeCode: new FormControl('', Validators.required)
    });

    await this.payerNode.getPayerNodes().subscribe(data => {
      this.payerNodes = data;
      this.dataSource.data = this.payerNodes;
      this.filteredDataSource.data = this.payerNodes;
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
    public dialog: MatDialog, private payerNode: PayerNodeService
  ) { }

  filter() {
    /* In cazul in care Customer Number din baza de date se va transforma din STRING in INT aici o sa avem o eroare in cod.*/
    this.filteredDataSource.data = (this.customerNumberSearchQuery) ?
      this.filteredDataSource.data
        .sort(function (a: PayerNode, b: PayerNode) { return parseInt(a.customerNumber, 10) - parseInt(b.customerNumber, 10); })
        .filter(p => p.customerNumber
          .toString()
          .toLocaleLowerCase()
          .includes(this.customerNumberSearchQuery.toString().toLocaleLowerCase()))
      : this.dataSource.data;

    this.filteredDataSource.data = (this.customerNameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customerName
        .toLocaleLowerCase()
        .trim()
        .includes(this.customerNameSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.hierarchySearchQuery) ?
      this.filteredDataSource.data.filter(p => p.hierarchy.toLocaleLowerCase()
        .includes(this.hierarchySearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.payerNodeNumberSearchQuery) ?
      this.filteredDataSource.data
        .sort(function (a: PayerNode, b: PayerNode) { return a.payerNodeNumber - b.payerNodeNumber; })
        .filter(p => p.payerNodeNumber
          .toString()
          .includes(this.payerNodeNumberSearchQuery.toString()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.payerNodeDescriptionSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.payerNodeDescription.toLocaleLowerCase()
        .includes(this.payerNodeDescriptionSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.payerNodeCodeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.payerNodeCode.toString().toLocaleLowerCase()
        .includes(this.payerNodeCodeSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;
  }

  get formcustomerNumber() {
    return this.pnForm.get('customerNumber');
  }

  get formcustomerName() {
    return this.pnForm.get('customerName');
  }

  get formhierarchy() {
    return this.pnForm.get('hierarchy');
  }

  get formpayerNodeNumber() {
    return this.pnForm.get('payerNodeNumber');
  }

  get formpayerNodeDescription() {
    return this.pnForm.get('payerNodeDescription');
  }

  get formpayerNodeCode() {
    return this.pnForm.get('payerNodeCode');
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
    const dialogRef = this.dialog.open(PnAddDialogComponent, {
      width: '33%',
      height: '58%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log(data);
        this.payerNode.createPayerNode(data);
        this.pushObject(data);
      }
    });
  }

  clearSearchInputBox() {
    if (!this.customerNameSearch) {
      this.customerNameSearchQuery = '';
    }
    if (!this.customerNumberSearch) {
      this.customerNumberSearchQuery = 0;
    }
    if (!this.hierarchySearch) {
      this.hierarchySearchQuery = '';
    }
    if (!this.payerNodeDescriptionSearch) {
      this.payerNodeDescriptionSearchQuery = '';
    }
    if (!this.payerNodeCodeSearch) {
      this.payerNodeCodeSearchQuery = '';
    }
    if (!this.payerNodeNumberSearch) {
      this.payerNodeNumberSearchQuery = 0;
    }
    this.filter();
  }

  async pushObject(data: PayerNode) {
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
    if (this.pnInputs.customerNumber === this.dataSource.data[this.selectedRowToEdit - 1].customerNumber &&
      this.pnInputs.customerName === this.dataSource.data[this.selectedRowToEdit - 1].customerName &&
      this.pnInputs.hierarchy === this.dataSource.data[this.selectedRowToEdit - 1].hierarchy &&
      this.pnInputs.payerNodeNumber === this.dataSource.data[this.selectedRowToEdit - 1].payerNodeNumber &&
      this.pnInputs.payerNodeDescription === this.dataSource.data[this.selectedRowToEdit - 1].payerNodeDescription &&
      this.pnInputs.payerNodeCode === this.dataSource.data[this.selectedRowToEdit - 1].payerNodeCode) {
      return false;
    }
  }

  private confirmEdit() {
    if (this.pnForm.valid) {
      this.dataSource.data[this.selectedRowToEdit - 1].customerNumber = this.pnInputs.customerNumber;
      this.dataSource.data[this.selectedRowToEdit - 1].customerName = this.pnInputs.customerName;
      this.dataSource.data[this.selectedRowToEdit - 1].hierarchy = this.pnInputs.hierarchy;
      this.dataSource.data[this.selectedRowToEdit - 1].payerNodeNumber = this.pnInputs.payerNodeNumber;
      this.dataSource.data[this.selectedRowToEdit - 1].payerNodeDescription = this.pnInputs.payerNodeDescription;
      this.dataSource.data[this.selectedRowToEdit - 1].payerNodeCode = this.pnInputs.payerNodeCode;
      this.payerNode.updatePayerNode(this.dataSource.data[this.selectedRowToEdit - 1]);
      this.selectedRowToEdit = -1;
    }
  }

  private setEditValues(rowNumber) {
    this.pnInputs.customerNumber = this.dataSource.data[rowNumber - 1].customerNumber;
    this.pnInputs.customerName = this.dataSource.data[rowNumber - 1].customerName;
    this.pnInputs.hierarchy = this.dataSource.data[rowNumber - 1].hierarchy;
    this.pnInputs.payerNodeNumber = this.dataSource.data[rowNumber - 1].payerNodeNumber;
    this.pnInputs.payerNodeDescription = this.dataSource.data[rowNumber - 1].payerNodeDescription;
    this.pnInputs.payerNodeCode = this.dataSource.data[rowNumber - 1].payerNodeCode;
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
