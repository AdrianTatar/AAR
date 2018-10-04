import { KunAddDialogComponent } from './kun-add-dialog/kun-add-dialog.component';
import { Kundenstamm } from './../shared/models/Kundenstamm';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-kundenstamm',
  templateUrl: './kundenstamm.component.html',
  styleUrls: ['./kundenstamm.component.css']
})
export class KundenstammComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['blz_pnr', 'block_pnr', 'knoten_pnr', 'kundenname_pnr', 'bkgr_pnr', 'cluster_pnr', 'menu'];

  dataSource = new MatTableDataSource<Kundenstamm>(ELEMENT_DATA);
  filteredDataSource = new MatTableDataSource<Kundenstamm>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  blzSearch = false;
  blockSearch = false;
  knotenSearch = false;
  kundennameSearch = false;
  bkgrSearch = false;
  clusterSearch = false;

  blzSearchQuery = 0;
  blockSearchQuery = '';
  knotenSearchQuery = '';
  kundennameSearchQuery = '';
  bkgrSearchQuery = '';
  clusterSearchQuery = '';

  addNewElement = false;

  fppForm;
  fppInputs: Kundenstamm = {
    position: null,
    blz_pnr: 0,
    block_pnr: '',
    knoten_pnr: '',
    kundenname_pnr: '',
    bkgr_pnr: '',
    cluster_pnr: ''
  };

  constructor(
    public dialog: MatDialog
  ) { }

  filter() {
    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.blzSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.blz_pnr === this.blzSearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.blockSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.block_pnr.toLocaleLowerCase()
        .includes(this.blockSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.knotenSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.knoten_pnr.toLocaleLowerCase()
        .includes(this.knotenSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.kundennameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.kundenname_pnr.toLocaleLowerCase()
        .includes(this.kundennameSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.bkgrSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.bkgr_pnr.toLocaleLowerCase()
        .includes(this.bkgrSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.clusterSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.cluster_pnr.toLocaleLowerCase()
        .includes(this.clusterSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;
  }

  clearSearchInputBox() {
    if (!this.blzSearch) {
      this.blzSearchQuery = 0;
    }
    if (!this.blockSearch) {
      this.blockSearchQuery = '';
    }
    if (!this.knotenSearch) {
      this.knotenSearchQuery = '';
    }
    if (!this.kundennameSearch) {
      this.kundennameSearchQuery = '';
    }
    if (!this.bkgrSearch) {
      this.bkgrSearchQuery = '';
    }
    if (!this.clusterSearch) {
      this.clusterSearchQuery = '';
    }
    this.filter();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;

    this.fppForm = new FormGroup({
      blz_pnr: new FormControl('', Validators.required),
      block_pnr: new FormControl('', Validators.required),
      knoten_pnr: new FormControl('', Validators.required),
      kundenname_pnr: new FormControl('', Validators.required),
      bkgr_pnr: new FormControl('', Validators.required),
      cluster_pnr: new FormControl('', Validators.required)
    });
  }

  get formBLZ_pnr() {
    return this.fppForm.get('blz_pnr');
  }

  get formblock() {
    return this.fppForm.get('block_pnr');
  }

  get formKnoten() {
    return this.fppForm.get('knoten_pnr');
  }

  get formKundenname() {
    return this.fppForm.get('kundenname_pnr');
  }

  get formBkGr() {
    return this.fppForm.get('bkgr_pnr');
  }

  get formCluster() {
    return this.fppForm.get('cluster_pnr');
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
    const dialogRef = this.dialog.open(KunAddDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.pushObject(data);
      }
    });
  }

  private pushObject(data: Kundenstamm) {
    data.position = this.dataSource.data[this.dataSource.data.length - 1].position + 1;
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
    this.dataSource.data[this.selectedRowToEdit - 1].blz_pnr = this.fppInputs.blz_pnr;
    this.dataSource.data[this.selectedRowToEdit - 1].block_pnr = this.fppInputs.block_pnr;
    this.dataSource.data[this.selectedRowToEdit - 1].knoten_pnr = this.fppInputs.knoten_pnr;
    this.dataSource.data[this.selectedRowToEdit - 1].kundenname_pnr = this.fppInputs.kundenname_pnr;
    this.dataSource.data[this.selectedRowToEdit - 1].bkgr_pnr = this.fppInputs.bkgr_pnr;
    this.dataSource.data[this.selectedRowToEdit - 1].cluster_pnr = this.fppInputs.cluster_pnr;
    this.selectedRowToEdit = -1;
  }

  private setEditValues(rowNumber) {
    this.fppInputs.blz_pnr = this.dataSource.data[rowNumber - 1].blz_pnr;
    this.fppInputs.block_pnr = this.dataSource.data[rowNumber - 1].block_pnr;
    this.fppInputs.knoten_pnr = this.dataSource.data[rowNumber - 1].knoten_pnr;
    this.fppInputs.kundenname_pnr = this.dataSource.data[rowNumber - 1].kundenname_pnr;
    this.fppInputs.bkgr_pnr = this.dataSource.data[rowNumber - 1].bkgr_pnr;
    this.fppInputs.cluster_pnr = this.dataSource.data[rowNumber - 1].cluster_pnr;
  }
}

// Mock-Up
const ELEMENT_DATA: Kundenstamm[] = [
  {
    position: 1,
    blz_pnr: 36215,
    block_pnr: 'TOKIO',
    knoten_pnr: 'Tirol',
    kundenname_pnr: 'RB Brixen im Thale eGen',
    bkgr_pnr: 'RBG TIR',
    cluster_pnr: 'Primärebene'
  },
  {
    position: 2,
    blz_pnr: 36215,
    block_pnr: 'SIENA',
    knoten_pnr: 'NÖW',
    kundenname_pnr: 'RB Brixen im Thale eGen',
    bkgr_pnr: 'RBG TIR',
    cluster_pnr: 'Primärebene'
  },
  {
    position: 3,
    blz_pnr: 36215,
    block_pnr: 'SBG',
    knoten_pnr: 'Tirol',
    kundenname_pnr: 'RB Brixen im Thale eGen',
    bkgr_pnr: 'RBG TIR',
    cluster_pnr: 'Primärebene'
  }
];
