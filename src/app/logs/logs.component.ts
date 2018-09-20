import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'class', 'severity', 'type', 'date', 'description'];
  dataSource = new MatTableDataSource<LogElement>(LOG_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface LogElement {
  id: number;
  class: string;
  severity: string;
  type: string;
  date: string;
  description: string;
}

const LOG_DATA: LogElement[] = [
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' },
  { id: 1, class: 'Audit', type: 'Log', severity: 'Minor', date: '01/10/2019', description: 'This is a log.' }
];
