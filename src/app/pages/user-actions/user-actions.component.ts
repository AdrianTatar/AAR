import { Component, OnInit, ViewChild, HostListener, AfterContentInit, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { UserAction } from '../../shared/models/user.actions';
import { UserActionsService } from './services/user-actions.service';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.css']
})
export class UserActionsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'timestamp', 'uid', 'action'];
  dataSource = new MatTableDataSource<UserAction>();
  filteredDataSource = new MatTableDataSource<UserAction>();
  userActions: UserAction[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRow = -1;

  logIdSearch = false;
  timestampSearch = false;
  userIdSearch = false;
  actionSearch = false;

  logIdSearchQuery = 0;
  timestampSearchQuery = '';
  userIdSearchQuery = '';
  actionSearchQuery = '';

  async ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;

    await this.userActionsService.getUsers().subscribe(data => {
      this.userActions = data;
      this.dataSource.data = this.userActions;
      this.filteredDataSource.data = this.userActions;
    });
  }

  ngAfterViewInit() {
    this.filteredDataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    private userActionsService: UserActionsService) {
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

    this.filteredDataSource.data = (this.actionSearchQuery) ?
      this.dataSource.data.filter(p => p.action.toLocaleLowerCase()
        .includes(this.actionSearchQuery.trim().toLocaleLowerCase()))
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
    if (!this.actionSearch) {
      this.actionSearchQuery = '';
    }
    this.filter();
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

  private selectRow(rowNumber) {
    this.selectedRow = rowNumber;
  }
}
