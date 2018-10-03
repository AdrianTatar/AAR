import { Zahlerknoten } from './../shared/models/Zahlerknoten';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FppAddDialogComponent } from './fpp-add-dialog/fpp-add-dialog.component';

@Component({
  selector: 'app-zahlerknoten',
  templateUrl: './zahlerknoten.component.html',
  styleUrls: ['./zahlerknoten.component.css']
})
export class ZahlerknotenComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['kunde', 'bez_kunde', 'hierarchie', 'zahlerknoten_nr', 'zahlerknoten_bez', 'hierarchie'];

  dataSource = new MatTableDataSource<Zahlerknoten>(ELEMENT_DATA);
  filteredDataSource = new MatTableDataSource<Zahlerknoten>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  kundeSearch = false;
  bez_kundeSearch = false;
  hierarchieSearch = false;
  zahlerknoten_nrSearch = false;
  zahlerknoten_bezSearch = false;
  knotenSearch = false;

  kundeSearchQuery = 0;
  bez_kundeSearchQuery = '';
  hierarchieSearchQuery = '';
  zahlerknoten_nrSearchQuery = 0;
  zahlerknoten_bezSearchQuery = '';
  knotenSearchQuery = '';

  addNewElement = false;

  fppForm;
  fppInputs: Zahlerknoten = {
    position: null,
    kunde : 0,
    bez_kunde: '',
    hierarchie : '',
    zahlerknoten_nr : 0,
    zahlerknoten_bez : '',
    knoten : ''
  };

  constructor(
    public dialog: MatDialog
  ) { }

  filter() {
    this.filteredDataSource.data = (this.kundeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.kunde === this.kundeSearchQuery)
      : this.dataSource.data;

    this.filteredDataSource.data = (this.bez_kundeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.bez_kunde.toLocaleLowerCase()
        .includes(this.bez_kundeSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.hierarchieSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.hierarchie.toLocaleLowerCase()
        .includes(this.hierarchieSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.zahlerknoten_nrSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.zahlerknoten_nr === this.zahlerknoten_nrSearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.zahlerknoten_bezSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.zahlerknoten_bez.toLocaleLowerCase()
        .includes(this.zahlerknoten_bezSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.knotenSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.knoten.toLocaleLowerCase()
        .includes(this.knotenSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;

    this.fppForm = new FormGroup({
      kunde: new FormControl('', Validators.required),
      bez_kunde: new FormControl('', Validators.required),
      hierarchie: new FormControl('', Validators.required),
      zahlerknoten_nr: new FormControl('', Validators.required),
      zahlerknoten_bez: new FormControl('', Validators.required),
      knoten: new FormControl('', Validators.required)
    });
  }

  get formkunde() {
    return this.fppForm.get('kunde');
  }

  get formbez_kunde() {
    return this.fppForm.get('bez_kunde');
  }

  get formhierarchie() {
    return this.fppForm.get('hierarchie');
  }

  get formzahlerknoten_nr() {
    return this.fppForm.get('zahlerknoten_nr');
  }

  get formzahlerknoten_bez() {
    return this.fppForm.get('zahlerknoten_bez');
  }

  get formknoten() {
    return this.fppForm.get('knoten');
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
    const dialogRef = this.dialog.open(FppAddDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.pushObject(data);
      }
    });
  }

  private pushObject(data: Zahlerknoten) {
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
    this.dataSource.data[this.selectedRowToEdit - 1].kunde = this.fppInputs.kunde;
    this.dataSource.data[this.selectedRowToEdit - 1].bez_kunde = this.fppInputs.bez_kunde;
    this.dataSource.data[this.selectedRowToEdit - 1].hierarchie = this.fppInputs.hierarchie;
    this.dataSource.data[this.selectedRowToEdit - 1].zahlerknoten_nr = this.fppInputs.zahlerknoten_nr;
    this.dataSource.data[this.selectedRowToEdit - 1].zahlerknoten_bez = this.fppInputs.zahlerknoten_bez;
    this.dataSource.data[this.selectedRowToEdit - 1].knoten = this.fppInputs.knoten;
    this.selectedRowToEdit = -1;
  }

  private setEditValues(rowNumber) {
    this.fppInputs.kunde = this.dataSource.data[rowNumber - 1].kunde;
    this.fppInputs.bez_kunde = this.dataSource.data[rowNumber - 1].bez_kunde;
    this.fppInputs.hierarchie = this.dataSource.data[rowNumber - 1].hierarchie;
    this.fppInputs.zahlerknoten_nr = this.dataSource.data[rowNumber - 1].zahlerknoten_nr;
    this.fppInputs.zahlerknoten_bez = this.dataSource.data[rowNumber - 1].zahlerknoten_bez;
    this.fppInputs.knoten = this.dataSource.data[rowNumber - 1].knoten;
  }
}

// Mock-Up
const ELEMENT_DATA: Zahlerknoten[] = [
  {
    position: 1,
    kunde: 34738,
    bez_kunde: 'TOKIO',
    hierarchie: 'Tirol',
    zahlerknoten_nr: 21,
    zahlerknoten_bez: 'RBG TIR',
    knoten: 'Primärebene'
  },
  {
    position: 2,
    kunde: 36215,
    bez_kunde: 'SIENA',
    hierarchie: 'NÖW',
    zahlerknoten_nr: 22,
    zahlerknoten_bez: 'RBG TIR',
    knoten: 'Primärebene'
  },
  {
    position: 3,
    kunde: 36215,
    bez_kunde: 'SBG',
    hierarchie: 'Tirol',
    zahlerknoten_nr: 23,
    zahlerknoten_bez: 'RBG TIR',
    knoten: 'Primärebene'
  }
];
