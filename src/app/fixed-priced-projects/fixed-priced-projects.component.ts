import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PeriodicElement } from './../shared/models/PeriodicElement';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FppAddDialogComponent } from './fpp-add-dialog/fpp-add-dialog.component';
import { FixedPricedProjects } from '../shared/models/FixedPricedProjects';
@Component({
  selector: 'app-fixed-priced-projects',
  templateUrl: './fixed-priced-projects.component.html',
  styleUrls: ['./fixed-priced-projects.component.css']
})

export class FixedPricedProjectsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['planmill_pnr', 'tagetik_projektID', 'projbez', 'kundennr', 'fixpreis', 'menu'];
  dataSource = new MatTableDataSource<FixedPricedProjects>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  addNewElement = false;

  fppForm;
  fppInputs: FixedPricedProjects = {
    position: null,
    planmill_pnr: '',
    tagetik_projektID: '',
    projbez: '',
    kundennr: 0,
    fixpreis: 0
  };

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;

    this.fppForm = new FormGroup({
      planmill_pnr: new FormControl('', Validators.required),
      tagetik_projektID: new FormControl('', Validators.required),
      projbez: new FormControl('', Validators.required),
      kundennr: new FormControl('', Validators.required),
      fixpreis: new FormControl('', Validators.required)
    });
  }

  get formPlanmill_pnr() {
    return this.fppForm.get('planmill_pnr');
  }

  get formTagetik_ProjektID() {
    return this.fppForm.get('tagetik_projektID');
  }

  get formProjbez() {
    return this.fppForm.get('projbez');
  }

  get formKundennr() {
    return this.fppForm.get('kundennr');
  }

  get formFixpreis() {
    return this.fppForm.get('fixpreis');
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

  private pushObject(data: FixedPricedProjects) {
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
    this.dataSource.data[this.selectedRowToEdit - 1].planmill_pnr = this.fppInputs.planmill_pnr;
    this.dataSource.data[this.selectedRowToEdit - 1].tagetik_projektID = this.fppInputs.tagetik_projektID;
    this.dataSource.data[this.selectedRowToEdit - 1].projbez = this.fppInputs.projbez;
    this.dataSource.data[this.selectedRowToEdit - 1].kundennr = this.fppInputs.kundennr;
    this.dataSource.data[this.selectedRowToEdit - 1].fixpreis = this.fppInputs.fixpreis;
    this.selectedRowToEdit = -1;
  }

  private setEditValues(rowNumber) {
    this.fppInputs.planmill_pnr = this.dataSource.data[rowNumber - 1].planmill_pnr;
    this.fppInputs.tagetik_projektID = this.dataSource.data[rowNumber - 1].tagetik_projektID;
    this.fppInputs.projbez = this.dataSource.data[rowNumber - 1].projbez;
    this.fppInputs.kundennr = this.dataSource.data[rowNumber - 1].kundennr;
    this.fppInputs.fixpreis = this.dataSource.data[rowNumber - 1].fixpreis;
  }
}

const ELEMENT_DATA: FixedPricedProjects[] = [
  {
    position: 1,
    planmill_pnr: 'R000004760',
    tagetik_projektID: 'B12010_22_26',
    projbez: 'Wartung ELBA Business Client',
    kundennr: 80020,
    fixpreis: 477830
  },
];
