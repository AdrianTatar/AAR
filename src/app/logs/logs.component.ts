import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
<<<<<<< HEAD
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserAction } from '../shared/models/user.actions';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
=======
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { UserAction } from '../shared/models/UserActions';
>>>>>>> 679affa8340a35c0d5507d0cd1a89e05c4af6ff8

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'timestamp', 'uid', 'action'];
<<<<<<< HEAD
  dataSource = new MatTableDataSource<UserAction>();
=======
  dataSource = new MatTableDataSource<UserAction>(USER_ACTIONS);
  filteredDataSource = new MatTableDataSource<UserAction>(USER_ACTIONS);

>>>>>>> 679affa8340a35c0d5507d0cd1a89e05c4af6ff8
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRow = -1;
  userActions: UserAction[];

<<<<<<< HEAD
  constructor(private userService: UserService) {
=======
  logIdSearch = false;
  timestampSearch = false;
  userIdSearch = false;
  actionSearch = false;

  logIdSearchQuery = 0;
  timestampSearchQuery = '';
  userIdSearchQuery = '';
  actionSearchQuery = '';

  constructor(
    public dialog: MatDialog
  ) { }

  filter() {
    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.logIdSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.position === this.logIdSearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.timestampSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.timestamp.toDateString()
        .includes(this.timestampSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.userIdSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.uid.toLocaleLowerCase()
        .includes(this.userIdSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.actionSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.action.toLocaleLowerCase()
        .includes(this.actionSearchQuery.toLocaleLowerCase()))
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
>>>>>>> 679affa8340a35c0d5507d0cd1a89e05c4af6ff8
  }

  testCreate() {
    this.userService.createUser(USER_ACTIONS[0]);
  }

  async ngOnInit() {
    this.dataSource.paginator = this.paginator;
<<<<<<< HEAD
    await this.userService.getUsers().subscribe( data => {
      this.userActions = data;
      // console.log("data: "+data);
      this.dataSource.data = this.userActions;
    });
=======
    this.selectedRow = 0;
>>>>>>> 679affa8340a35c0d5507d0cd1a89e05c4af6ff8
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

const USER_ACTIONS: UserAction[] = [
<<<<<<< HEAD
  { id: null, timestamp: new Date(), userid: 'vosi312', action: 'delete chestie' },
  // { position: 2, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  // { position: 3, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  // { position: 4, timestamp: new Date(), uid: 'toie312', action: 'add chestie' }
=======
  { position: 1, timestamp: new Date(), uid: 'vosi312', action: 'delete chestie' },
  { position: 2, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  { position: 3, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 4, timestamp: new Date(), uid: 'toie312', action: 'add chestie' },
  { position: 5, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 6, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 7, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 8, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 9, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 1, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 2, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 3, timestamp: new Date(), uid: 'vosi312', action: 'delete chestie' },
  { position: 4, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  { position: 5, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 6, timestamp: new Date(), uid: 'toie312', action: 'add chestie' },
  { position: 7, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 8, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 9, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 1, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 2, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 3, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 4, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 5, timestamp: new Date(), uid: 'vosi312', action: 'delete chestie' },
  { position: 6, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  { position: 7, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 8, timestamp: new Date(), uid: 'toie312', action: 'add chestie' },
  { position: 9, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 1, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 2, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 3, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 4, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 5, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 6, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 7, timestamp: new Date(), uid: 'vosi312', action: 'delete chestie' },
  { position: 8, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  { position: 9, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 1, timestamp: new Date(), uid: 'toie312', action: 'add chestie' },
  { position: 2, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 3, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 4, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 5, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 6, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 7, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 8, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 9, timestamp: new Date(), uid: 'vosi312', action: 'delete chestie' },
  { position: 1, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  { position: 2, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 3, timestamp: new Date(), uid: 'toie312', action: 'add chestie' },
  { position: 4, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 5, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 6, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 7, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 8, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 9, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 1, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 2, timestamp: new Date(), uid: 'vosi312', action: 'delete chestie' },
  { position: 3, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  { position: 4, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 5, timestamp: new Date(), uid: 'toie312', action: 'add chestie' },
  { position: 6, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 7, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 8, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 9, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 1, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 2, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 3, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 4, timestamp: new Date(), uid: 'vosi312', action: 'delete chestie' },
  { position: 5, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  { position: 6, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 7, timestamp: new Date(), uid: 'toie312', action: 'add chestie' },
  { position: 8, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 9, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 1, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 2, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 3, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 4, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 5, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 6, timestamp: new Date(), uid: 'vosi312', action: 'delete chestie' },
  { position: 7, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  { position: 8, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 9, timestamp: new Date(), uid: 'toie312', action: 'add chestie' },
  { position: 1, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 2, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 3, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 4, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 5, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 6, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  { position: 7, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' }
>>>>>>> 679affa8340a35c0d5507d0cd1a89e05c4af6ff8
];
