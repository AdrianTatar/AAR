import { ExpAddDialogComponent } from './../../shared/components/navbar/exp-add-dialog/exp-add-dialog.component';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ExportAction } from 'src/app/shared/models/export.actions';
import { ExportActionsService } from './services/export-actions.service';

@Component({
  selector: 'app-export-actions',
  templateUrl: './export-actions.component.html',
  styleUrls: ['./export-actions.component.css'],
})
export class ExportActionsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'timestamp', 'uid'];
  dataSource = new MatTableDataSource<ExportAction>();
  filteredDataSource = new MatTableDataSource<ExportAction>();
  exportActions: ExportAction[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRow = -1;

  logIdSearch = false;
  timestampSearch = false;
  userIdSearch = false;

  logIdSearchQuery = 0;
  timestampSearchQuery = '';
  userIdSearchQuery = '';

  async ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;
  }

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator;

    document.addEventListener('click', function (event) {
      if (document.getElementById('mat-select-0')) {
        document.getElementById('mat-select-0').blur();
      }
    });
  }

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExpAddDialogComponent, {
      width: '500px',
      disableClose: true
    });
  }

  private convertDateForFilter(date) {
    return date.year.toString() + '.'
      + (date.monthValue < 10 ? '0' + date.monthValue.toString() : date.monthValue.toString()) + '.'
      + (date.dayOfMonth < 10 ? '0' + date.dayOfMonth.toString() : date.dayOfMonth.toString()) + ' '
      + (date.hour < 10 ? '0' + date.hour.toString() : date.hour.toString()) + ':'
      + (date.minute < 10 ? '0' + date.minute.toString() : date.minute.toString()) + ':'
      + (date.second < 10 ? '0' + date.second.toString() : date.second.toString());
  }

  filter() {
    this.paginator.firstPage();
    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.logIdSearchQuery) ?
      this.dataSource.data.filter(p => p.id.toString().toLocaleLowerCase()
        .includes(this.logIdSearchQuery.toString().trim().toLocaleLowerCase()))
      : this.dataSource.data;

    this.filteredDataSource.data = (this.timestampSearchQuery) ?
      this.filteredDataSource.data.filter(p => this.convertDateForFilter(p.time)
        .includes(this.timestampSearchQuery.trim().toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.userIdSearchQuery) ?
      this.dataSource.data.filter(p => p.userId.toLocaleLowerCase()
        .includes(this.userIdSearchQuery.trim().toLocaleLowerCase()))
      : this.filteredDataSource.data;
  }

  clearSearchInputBox() {
    if (!this.logIdSearch) {
      this.logIdSearchQuery = 0;
    }
    if (!this.timestampSearch) {
      this.timestampSearchQuery = '';
    }
    if (!this.userIdSearch) {
      this.userIdSearchQuery = '';
    }
    this.filter();
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

  private selectRow(rowNumber) {
    this.selectedRow = rowNumber;
  }
}
