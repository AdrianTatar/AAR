import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { UserAction } from '../shared/models/user.actions';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'timestamp', 'uid', 'action'];
  dataSource = new MatTableDataSource<UserAction>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRow = -1;
  userActions: UserAction[];

  constructor(private userService: UserService) {
  }

  testCreate() {
    this.userService.createUser(USER_ACTIONS[0]);
  }

  async ngOnInit() {
    this.dataSource.paginator = this.paginator;
    await this.userService.getUsers().subscribe( data => {
      this.userActions = data;
      // console.log("data: "+data);
      this.dataSource.data = this.userActions;
    });
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
  { id: null, timestamp: new Date(), userid: 'vosi312', action: 'delete chestie' },
  // { position: 2, timestamp: new Date(), uid: 'luis312', action: 'review chestie' },
  // { position: 3, timestamp: new Date(), uid: 'ieto312', action: 'update chestie' },
  // { position: 4, timestamp: new Date(), uid: 'toie312', action: 'add chestie' }
];
