import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SurchargeCustomer } from '../../shared/models/surcharge.customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScAddDialogComponent } from './sc-add-dialog/sc-add-dialog.component';

@Component({
  selector: 'app-surcharge-customers',
  templateUrl: './surcharge-customers.component.html',
  styleUrls: ['./surcharge-customers.component.css']
})
export class SurchargeCustomersComponent implements OnInit {

  displayedColumns: string[] = ['debitornumber', 'debitorname',
    'type', 'customernumber', 'customername', 'n2015',
    'n2016', 'n2017', 'n2018', 'aufschlag_2018',
    'menu'];
  dataSource = new MatTableDataSource<SurchargeCustomer>(ELEMENT_DATA);
  filteredDataSource = new MatTableDataSource<SurchargeCustomer>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  debitornumberSearch = false;
  debitornameSearch = false;
  typeSearch = false;
  customernumberSearch = false;
  customernameSearch = false;
  n2015Search = false;
  n2016Search = false;
  n2017Search = false;
  n2018Search = false;
  aufschlag_2018Search = false;

  debitornumberSearchQuery = 0;
  debitornameSearchQuery = '';
  typeSearchQuery = '';
  customernumberSearchQuery = 0;
  customernameSearchQuery = '';
  n2015SearchQuery = 0;
  n2016SearchQuery = 0;
  n2017SearchQuery = 0;
  n2018SearchQuery = 0;
  aufschlag_2018SearchQuery = 0;

  addNewElement = false;

  scForm;
  scInputs: SurchargeCustomer = {
    id: null,
    debitornumber: null,
    debitorname: '',
    type: '',
    customernumber: null,
    customername: '',
    n2015: 0,
    n2016: 0,
    n2017: 0,
    n2018: 0,
    aufschlag_2018: 0
  };

  constructor(
    public dialog: MatDialog
  ) { }

  filter() {
    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.debitornumberSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.debitornumber === this.debitornumberSearchQuery)
      : this.dataSource.data;

    this.filteredDataSource.data = (this.debitornameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.debitorname.toLocaleLowerCase()
        .includes(this.debitornameSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.typeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.type.toLocaleLowerCase()
        .includes(this.typeSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.customernumberSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customernumber === this.customernumberSearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.customernameSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customername.toLocaleLowerCase()
        .includes(this.customernameSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.n2015SearchQuery) ?
      this.filteredDataSource.data.filter(p => p.n2015 === this.n2015SearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.n2016SearchQuery) ?
      this.filteredDataSource.data.filter(p => p.n2016 === this.n2016SearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.n2017SearchQuery) ?
      this.filteredDataSource.data.filter(p => p.n2017 === this.n2017SearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.n2018SearchQuery) ?
      this.filteredDataSource.data.filter(p => p.n2018 === this.n2018SearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.aufschlag_2018SearchQuery) ?
      this.filteredDataSource.data.filter(p => p.aufschlag_2018 === this.aufschlag_2018SearchQuery)
      : this.filteredDataSource.data;
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

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;

    this.scForm = new FormGroup({
      debitornumber: new FormControl('', Validators.required),
      debitorname: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      customername: new FormControl('', Validators.required),
      n2015: new FormControl('', Validators.required),
      n2016: new FormControl('', Validators.required),
      n2017: new FormControl('', Validators.required),
      n2018: new FormControl('', Validators.required),
      aufschlag_2018: new FormControl('', Validators.required),
    });
  }

  get formDebitornumber() {
    return this.scForm.get('debitornumber');
  }

  get formDebitorname() {
    return this.scForm.get('debitorname');
  }

  get formType() {
    return this.scForm.get('type');
  }

  get formCustomernumber() {
    return this.scForm.get('customernumber');
  }

  get formCustomername() {
    return this.scForm.get('customername');
  }

  get formN2015() {
    return this.scForm.get('n2015');
  }

  get formN2016() {
    return this.scForm.get('n2016');
  }

  get formN2017() {
    return this.scForm.get('n2017');
  }

  get formN2018() {
    return this.scForm.get('n2018');
  }

  get formAufschlag_2018() {
    return this.scForm.get('aufschlag_2018');
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ScAddDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.pushObject(data);
      }
    });
  }

  private pushObject(data: SurchargeCustomer) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    this.dataSource.data.push(data);
    this.filteredDataSource.data = this.dataSource.data;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  clearSearchInputBox() {
    if (!this.debitornumberSearch) {
      this.debitornumberSearchQuery = 0;
    }
    if (!this.debitornameSearch) {
      this.debitornameSearchQuery = '';
    }
    if (!this.typeSearch) {
      this.typeSearchQuery = '';
    }
    if (!this.customernumberSearch) {
      this.customernumberSearchQuery = 0;
    }
    if (!this.customernameSearch) {
      this.customernameSearchQuery = '';
    }
    if (!this.n2015Search) {
      this.n2015SearchQuery = 0;
    }
    if (!this.n2016Search) {
      this.n2016SearchQuery = 0;
    }
    if (!this.n2017Search) {
      this.n2017SearchQuery = 0;
    }
    if (!this.n2018Search) {
      this.n2018SearchQuery = 0;
    }
    if (!this.aufschlag_2018Search) {
      this.aufschlag_2018SearchQuery = 0;
    }
    this.filter();
  }

  private confirmEdit() {
    if (this.scForm.valid) {
      this.dataSource.data[this.selectedRowToEdit - 1].debitornumber = this.scInputs.debitornumber;
      this.dataSource.data[this.selectedRowToEdit - 1].debitorname = this.scInputs.debitorname;
      this.dataSource.data[this.selectedRowToEdit - 1].type = this.scInputs.type;
      this.dataSource.data[this.selectedRowToEdit - 1].customernumber = this.scInputs.customernumber;
      this.dataSource.data[this.selectedRowToEdit - 1].customername = this.scInputs.customername;
      this.dataSource.data[this.selectedRowToEdit - 1].customername = this.scInputs.customername;
      this.dataSource.data[this.selectedRowToEdit - 1].n2015 = this.scInputs.n2015;
      this.dataSource.data[this.selectedRowToEdit - 1].n2015 = this.scInputs.n2015;
      this.dataSource.data[this.selectedRowToEdit - 1].n2016 = this.scInputs.n2016;
      this.dataSource.data[this.selectedRowToEdit - 1].n2016 = this.scInputs.n2016;
      this.dataSource.data[this.selectedRowToEdit - 1].n2017 = this.scInputs.n2017;
      this.dataSource.data[this.selectedRowToEdit - 1].n2017 = this.scInputs.n2017;
      this.dataSource.data[this.selectedRowToEdit - 1].n2018 = this.scInputs.n2018;
      this.dataSource.data[this.selectedRowToEdit - 1].n2018 = this.scInputs.n2018;
      this.dataSource.data[this.selectedRowToEdit - 1].aufschlag_2018 = this.scInputs.aufschlag_2018;
      this.selectedRowToEdit = -1;
    }
  }

  private setEditValues(rowNumber) {
    this.scInputs.debitornumber = this.dataSource.data[rowNumber - 1].debitornumber;
    this.scInputs.debitorname = this.dataSource.data[rowNumber - 1].debitorname;
    this.scInputs.type = this.dataSource.data[rowNumber - 1].type;
    this.scInputs.customernumber = this.dataSource.data[rowNumber - 1].customernumber;
    this.scInputs.customername = this.dataSource.data[rowNumber - 1].customername;
    this.scInputs.customername = this.dataSource.data[rowNumber - 1].customername;
    this.scInputs.n2015 = this.dataSource.data[rowNumber - 1].n2015;
    this.scInputs.n2015 = this.dataSource.data[rowNumber - 1].n2015;
    this.scInputs.n2016 = this.dataSource.data[rowNumber - 1].n2016;
    this.scInputs.n2016 = this.dataSource.data[rowNumber - 1].n2016;
    this.scInputs.n2017 = this.dataSource.data[rowNumber - 1].n2017;
    this.scInputs.n2017 = this.dataSource.data[rowNumber - 1].n2017;
    this.scInputs.n2018 = this.dataSource.data[rowNumber - 1].n2018;
    this.scInputs.n2018 = this.dataSource.data[rowNumber - 1].n2018;
    this.scInputs.aufschlag_2018 = this.dataSource.data[rowNumber - 1].aufschlag_2018;
  }

}

const ELEMENT_DATA: SurchargeCustomer[] = [
  {
    id: 1, debitornumber: 80020, debitorname: 'Raiffeisen e-force',
    type: 'Fremdbanken', customernumber: 19690, customername: 'ERSTE Bank',
    n2015: 991, n2016: 1005, n2017: 1018, n2018: 1038, aufschlag_2018: 233
  },
  {
    id: 2, debitornumber: 19690, debitorname: 'Vakif',
    type: 'Fremdbanken', customernumber: 19685, customername: 'Vakif',
    n2015: 872, n2016: 872, n2017: 872, n2018: 872, aufschlag_2018: 67
  },
  {
    id: 3, debitornumber: 31100, debitorname: 'Raiffeisen Factor Bank AG',
    type: 'Sektorbanken', customernumber: 31100, customername: 'Raiffeisen Factor Bank AG',
    n2015: 833, n2016: 864, n2017: 845, n2018: 845, aufschlag_2018: 40
  },
];
