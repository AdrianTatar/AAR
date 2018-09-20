import { Component, OnInit, Input } from '@angular/core';
import { PeriodicElement } from './../models/PeriodicElement';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Input('dataSource') dataSource: MatTableDataSource<PeriodicElement>;
  @Input('displayedColumns') displayedColumns: string[];
  @Input('title') title: string;

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '600px',
      data: { columns: this.displayedColumns, title: this.title },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log(data + ' ');

      if (data) {

        if (this.title === 'Fixed Priced Projects') {
          this.addFixedPricedProjectsRow(data);
        } else {
          this.addSurchargeCustomersRow(data);
        }
        this.openSnackBar();

      }
    });
  }

  openSnackBar() {
    this.snackBar.open('Row added.', '', {
      duration: 1300,
      panelClass: ['blue-snackbar']
    });
  }


  private addFixedPricedProjectsRow(data) {
    console.log('Add Fixed Priced Projects Row.');

    const periodicElement: PeriodicElement = {
      position: this.dataSource.data[this.dataSource.data.length - 1].position + 1,
      name: data.name,
      weight: data.weight,
      symbol: data.symbol
    };

    this.dataSource.data.push(periodicElement);
  }

  private addSurchargeCustomersRow(data) {
    console.log('Add Surcharge Customer Row.');

    const periodicElement: PeriodicElement = {
      position: this.dataSource.data[this.dataSource.data.length - 1].position + 1,
      name: data.name,
      weight: data.weight,
      symbol: data.symbol
    };

    this.dataSource.data.push(periodicElement);
  }
}
