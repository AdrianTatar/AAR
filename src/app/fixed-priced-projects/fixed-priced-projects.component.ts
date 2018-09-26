import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PeriodicElement } from './../shared/models/PeriodicElement';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fixed-priced-projects',
  templateUrl: './fixed-priced-projects.component.html',
  styleUrls: ['./fixed-priced-projects.component.css']
})

export class FixedPricedProjectsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'menu'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRow = -1;
  selectedRowToEdit = -1;

  nameFormControl;
  weightFormControl;
  symbolFormControl;

  // Values to Edit
  name = '';
  weight = 0;
  symbol = '';

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;

    this.nameFormControl = new FormControl('', [Validators.required]);
    this.weightFormControl = new FormControl('', [Validators.required]);
    this.symbolFormControl = new FormControl('', [Validators.required]);
  }

  ngAfterViewInit() {
    document.addEventListener('click', function (event) {
      document.getElementById('mat-select-0').blur();
    });
  }

  @HostListener('document:keydown', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.selectedRow -= (this.selectedRow === 0 ? 0 : 1);
    } else if (event.key === 'ArrowDown' && ((this.selectedRow + 1) / this.paginator.pageSize < 1)) {
      // Formula in the if statement is used to not let the selected row go to another page -it keeps it on the current page
      this.selectedRow += (this.selectedRow === this.dataSource.data.length ? 0 : 1);
    }
  }

  private selectRow(rowNumber) {
    this.selectedRow = rowNumber;
  }

  private editRow(rowNumber) {
    this.name = this.dataSource.data[rowNumber - 1].name;
    this.weight = this.dataSource.data[rowNumber - 1].weight;
    this.symbol = this.dataSource.data[rowNumber - 1].symbol;
    this.selectedRowToEdit = rowNumber;
  }

  private cancelEdit() {
    this.selectedRowToEdit = -1;
  }

  private confirmEdit() {
    this.dataSource.data[this.selectedRowToEdit - 1].name = this.name;
    this.dataSource.data[this.selectedRowToEdit - 1].weight = this.weight;
    this.dataSource.data[this.selectedRowToEdit - 1].symbol = this.symbol;
    this.selectedRowToEdit = -1;
  }
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  { position: 21, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 22, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 23, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 24, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 25, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 26, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 27, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 28, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 29, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 30, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 31, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 32, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 33, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 34, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 35, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 36, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 37, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 38, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 39, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  { position: 40, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 41, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 42, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 43, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 44, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 45, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 46, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 47, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 48, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 49, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 50, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 51, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 52, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 53, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 54, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 55, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 56, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 57, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 58, name: 'Calcium', weight: 40.078, symbol: 'Ca' }
];
