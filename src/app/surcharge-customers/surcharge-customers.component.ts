import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from './../shared/models/PeriodicElement';

@Component({
  selector: 'app-surcharge-customers',
  templateUrl: './surcharge-customers.component.html',
  styleUrls: ['./surcharge-customers.component.css']
})
export class SurchargeCustomersComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'select'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
      });
    }
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
  { position: 58, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
