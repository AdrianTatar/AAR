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
  displayedColumns: string[] = ['customernumber', 'customername', 'hierarchy', 'payernodenumber', 'payernodedescription', 'payernodecode', 'menu'];

  dataSource = new MatTableDataSource<PayerNode>();
  filteredDataSource = new MatTableDataSource<PayerNode>();
  payerNodes: PayerNode[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  customernumberSearch = false;
  customernameSearch = false;
  hierarchySearch = false;
  payernodenumberSearch = false;
  payernodedescriptionSearch = false;
  payernodecodeSearch = false;

  customernumberSearchQuery = 0;
  customernameSearchQuery = '';
  hierarchySearchQuery = '';
  payernodenumberSearchQuery = 0;
  payernodedescriptionSearchQuery = '';
  payernodecodeSearchQuery = '';

  addNewElement = false;

  pnForm;
  pnInputs: PayerNode = {
    id: null,
    customernumber: '',
    customername: '',
    hierarchy: '',
    payernodenumber: 0,
    payernodedescription: '',
    payernodecode: ''
  };

  async ngOnInit() {
    this.selectedRow = 0;

    this.pnForm = new FormGroup({
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      hierarchy: new FormControl('', Validators.required),
      payernodenumber: new FormControl('', Validators.required),
      payernodedescription: new FormControl('', Validators.required),
      payernodecode: new FormControl('', Validators.required)
    });

    await this.payerNode.getPayerNodes().subscribe(data => {
      this.payerNodes = data;
      this.dataSource.data = this.payerNodes;
      this.filteredDataSource.data = this.payerNodes;
    });
  }

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog, private payerNode: PayerNodeService
  ) { }

  filter() {
    /* In cazul in care Customer Number din baza de date se va transforma din STRING in INT aici o sa avem o eroare in cod.*/
    this.filteredDataSource.data = (this.customernumberSearchQuery) ?
      this.filteredDataSource.data
      .sort(function(a: PayerNode, b: PayerNode) { return parseInt(a.customernumber, 10) - parseInt(b.customernumber, 10); })
      .filter(p => p.customernumber
        .toString()
        .toLocaleLowerCase()
        .includes(this.customernumberSearchQuery.toString().toLocaleLowerCase()))
      : this.dataSource.data;

    this.filteredDataSource.data = (this.customernameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customername
        .toLocaleLowerCase()
        .trim()
        .includes(this.customernameSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.hierarchySearchQuery) ?
      this.filteredDataSource.data.filter(p => p.hierarchy.toLocaleLowerCase()
        .includes(this.hierarchySearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.payernodenumberSearchQuery) ?
      this.filteredDataSource.data
        .sort(function(a: PayerNode, b: PayerNode) { return a.payernodenumber - b.payernodenumber; })
        .filter(p => p.payernodenumber
          .toString()
          .includes(this.payernodenumberSearchQuery.toString()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.payernodedescriptionSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.payernodedescription.toLocaleLowerCase()
        .includes(this.payernodedescriptionSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.payernodecodeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.payernodecode.toString().toLocaleLowerCase()
        .includes(this.payernodecodeSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;
  }

  get formcustomernumber() {
    return this.pnForm.get('customernumber');
  }

  get formcustomername() {
    return this.pnForm.get('customername');
  }

  get formhierarchy() {
    return this.pnForm.get('hierarchy');
  }

  get formpayernodenumber() {
    return this.pnForm.get('payernodenumber');
  }

  get formpayernodedescription() {
    return this.pnForm.get('payernodedescription');
  }

  get formpayernodecode() {
    return this.pnForm.get('payernodecode');
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
    const dialogRef = this.dialog.open(PnAddDialogComponent, {
      width: '600px',
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
    if (!this.customernameSearch) {
      this.customernameSearchQuery = '';
    }
    if (!this.customernumberSearch) {
      this.customernumberSearchQuery = 0;
    }
    if (!this.hierarchySearch) {
      this.hierarchySearchQuery = '';
    }
    if (!this.payernodedescriptionSearch) {
      this.payernodedescriptionSearchQuery = '';
    }
    if (!this.payernodecodeSearch) {
      this.payernodecodeSearchQuery = '';
    }
    if (!this.payernodenumberSearch) {
      this.payernodenumberSearchQuery = 0;
    }
    this.filter();
  }

  private pushObject(data: PayerNode) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    this.dataSource.data.push(data);
    this.filteredDataSource.data = this.dataSource.data;
    this.dataSource._updatePaginator(this.dataSource.data.length);
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
    if (this.pnForm.valid) {
      this.dataSource.data[this.selectedRowToEdit - 1].customernumber = this.pnInputs.customernumber;
      this.dataSource.data[this.selectedRowToEdit - 1].customername = this.pnInputs.customername;
      this.dataSource.data[this.selectedRowToEdit - 1].hierarchy = this.pnInputs.hierarchy;
      this.dataSource.data[this.selectedRowToEdit - 1].payernodenumber = this.pnInputs.payernodenumber;
      this.dataSource.data[this.selectedRowToEdit - 1].payernodedescription = this.pnInputs.payernodedescription;
      this.dataSource.data[this.selectedRowToEdit - 1].payernodecode = this.pnInputs.payernodecode;
      this.payerNode.updatePayerNode(this.dataSource.data[this.selectedRowToEdit - 1]);
      this.selectedRowToEdit = -1;
    }
  }

  private setEditValues(rowNumber) {
    this.pnInputs.customernumber = this.dataSource.data[rowNumber - 1].customernumber;
    this.pnInputs.customername = this.dataSource.data[rowNumber - 1].customername;
    this.pnInputs.hierarchy = this.dataSource.data[rowNumber - 1].hierarchy;
    this.pnInputs.payernodenumber = this.dataSource.data[rowNumber - 1].payernodenumber;
    this.pnInputs.payernodedescription = this.dataSource.data[rowNumber - 1].payernodedescription;
    this.pnInputs.payernodecode = this.dataSource.data[rowNumber - 1].payernodecode;
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
