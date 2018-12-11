import { UserActionsCreateService } from 'src/app/shared/services/user-actions-create.service';
import { ExpAddDialogComponent } from './../../shared/components/navbar/exp-add-dialog/exp-add-dialog.component';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, PipeTransform, Pipe } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ExportAction } from 'src/app/shared/models/export.actions';
import { ExportActionsService } from './services/export-actions.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-export-actions',
  templateUrl: './export-actions.component.html',
  styleUrls: ['./export-actions.component.css'],
})


export class ExportActionsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['timestamp', 'userId', 'menu'];
  private exportProjectUrl = 'http://localhost:8080/aarREST/rest/export/getExport/';
  location;
  exportDate;
  day;
  month;
  user;
  hour;
  minute;
  second;

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
    this.user = this.cookieService.get('username');

    if (this.user === 'admin') {
      await this.exportService.getallExports().subscribe(data => {
        this.exportActions = data;
        this.dataSource.data = this.exportActions;
        this.filteredDataSource.data = this.exportActions;
        console.log(this.dataSource.data);
      });
    } else {
      await this.exportService.getallUserExports().subscribe(data => {
        this.exportActions = data;
        this.dataSource.data = this.exportActions;
        this.filteredDataSource.data = this.exportActions;
        console.log(this.dataSource.data);
      });
    }

  }

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator;

    document.addEventListener('click', function (event) {
      if (document.getElementById('mat-select-0')) {
        document.getElementById('mat-select-0').blur();
      }
    });
  }

  constructor(public dialog: MatDialog,
    private exportService: ExportActionsService,
    private cookieService: CookieService,
    private userActionsCreateService: UserActionsCreateService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExpAddDialogComponent, {
      width: '500px',
      disableClose: true
    });
  }


  exportXML(value) {
    this.userActionsCreateService.createUserAction('ExcelRe');
    if (this.dataSource.data[value][1].dayOfMonth < 10) {
      this.day = '0' + this.dataSource.data[value][1].dayOfMonth;
    } else {
      this.day = this.dataSource.data[value][1].dayOfMonth;
    }
    if (this.dataSource.data[value][1].monthValue < 10) {
      this.month = '0' + this.dataSource.data[value][1].monthValue;
    } else {
      this.month = this.dataSource.data[value][1].monthValue;
    }
    if (this.dataSource.data[value][1].hour < 10) {
      this.hour = '0' + this.dataSource.data[value][1].hour;
    } else {
      this.hour = this.dataSource.data[value][1].hour;
    }
    if (this.dataSource.data[value][1].minute < 10) {
      this.minute = '0' + this.dataSource.data[value][1].minute;
    } else {
      this.minute = this.dataSource.data[value][1].minute;
    }
    if (this.dataSource.data[value][1].second < 10) {
      this.second = '0' + this.dataSource.data[value][1].second;
    } else {
      this.second = this.dataSource.data[value][1].second;
    }

    this.exportDate = this.dataSource.data[value][1].year + '-'
      + this.month + '-'
      + this.day + 'T'
      + this.hour + ':'
      + this.minute + ':'
      + this.second;

    this.location = this.exportProjectUrl + this.cookieService.get('username') + '/' + this.exportDate;
    window.open(this.location);
    this.selectedRow = value;
    console.log(this.location);
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
  }

  clearSearchInputBox() {
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
