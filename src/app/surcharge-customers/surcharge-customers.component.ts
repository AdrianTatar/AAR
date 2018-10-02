import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { SurchargeCustomers } from '../shared/models/SurchargeCustomers';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-surcharge-customers',
  templateUrl: './surcharge-customers.component.html',
  styleUrls: ['./surcharge-customers.component.css']
})
export class SurchargeCustomersComponent implements OnInit {

  displayedColumns: string[] = ['debitorennr', 'debitor',
    'typ', 'kundennr', 'kunde', 'n2015',
    'n2016', 'n2017', 'n2018', 'aufschlag_2018',
    'menu'];
  dataSource = new MatTableDataSource<SurchargeCustomers>(ELEMENT_DATA);
  filteredDataSource = new MatTableDataSource<SurchargeCustomers>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  debitorennrSearch = false;
  debitorSearch = false;
  typSearch = false;
  kundennrSearch = false;
  kundeSearch = false;
  n2015Search = false;
  n2016Search = false;
  n2017Search = false;
  n2018Search = false;
  aufschlag_2018Search = false;

  debitorennrSearchQuery = 0;
  debitorSearchQuery = '';
  typSearchQuery = '';
  kundennrSearchQuery = 0;
  kundeSearchQuery = '';
  n2015SearchQuery = 0;
  n2016SearchQuery = 0;
  n2017SearchQuery = 0;
  n2018SearchQuery = 0;
  aufschlag_2018SearchQuery = 0;

  addNewElement = false;

  scForm;
  scInputs: SurchargeCustomers = {
    position: null,
    debitorennr: null,
    debitor: '',
    typ: '',
    kundennr: null,
    kunde: '',
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

    console.log('da');

    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.debitorennrSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.debitorennr === this.debitorennrSearchQuery)
      : this.dataSource.data;

    this.filteredDataSource.data = (this.debitorSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.debitor.toLocaleLowerCase()
        .includes(this.debitorSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.typSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.typ.toLocaleLowerCase()
        .includes(this.typSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.kundennrSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.kundennr === this.kundennrSearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.kundeSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.kunde.toLocaleLowerCase()
        .includes(this.kundeSearchQuery.toLocaleLowerCase()))
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
      debitorennr: new FormControl('', Validators.required),
      debitor: new FormControl('', Validators.required),
      typ: new FormControl('', Validators.required),
      kundennr: new FormControl('', Validators.required),
      kunde: new FormControl('', Validators.required),
      n2015: new FormControl('', Validators.required),
      n2016: new FormControl('', Validators.required),
      n2017: new FormControl('', Validators.required),
      n2018: new FormControl('', Validators.required),
      aufschlag_2018: new FormControl('', Validators.required),
    });
  }

  get formDebitorennr() {
    return this.scForm.get('debitorennr');
  }

  get formDebitor() {
    return this.scForm.get('debitor');
  }

  get formTyp() {
    return this.scForm.get('typ');
  }

  get formKundennr() {
    return this.scForm.get('kundennr');
  }

  get formKunde() {
    return this.scForm.get('kunde');
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

  clearSearchInputBox() {
    if (!this.debitorennrSearch) {
      this.debitorennrSearchQuery = 0;
    }
    if (!this.debitorSearch) {
      this.debitorSearchQuery = '';
    }
    if (!this.typSearch) {
      this.typSearchQuery = '';
    }
    if (!this.kundennrSearch) {
      this.kundennrSearchQuery = 0;
    }
    if (!this.kundeSearch) {
      this.kundeSearchQuery = '';
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
      this.dataSource.data[this.selectedRowToEdit - 1].debitorennr = this.scInputs.debitorennr;
      this.dataSource.data[this.selectedRowToEdit - 1].debitor = this.scInputs.debitor;
      this.dataSource.data[this.selectedRowToEdit - 1].typ = this.scInputs.typ;
      this.dataSource.data[this.selectedRowToEdit - 1].kundennr = this.scInputs.kundennr;
      this.dataSource.data[this.selectedRowToEdit - 1].kunde = this.scInputs.kunde;
      this.dataSource.data[this.selectedRowToEdit - 1].kunde = this.scInputs.kunde;
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
    this.scInputs.debitorennr = this.dataSource.data[rowNumber - 1].debitorennr;
    this.scInputs.debitor = this.dataSource.data[rowNumber - 1].debitor;
    this.scInputs.typ = this.dataSource.data[rowNumber - 1].typ;
    this.scInputs.kundennr = this.dataSource.data[rowNumber - 1].kundennr;
    this.scInputs.kunde = this.dataSource.data[rowNumber - 1].kunde;
    this.scInputs.kunde = this.dataSource.data[rowNumber - 1].kunde;
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

const ELEMENT_DATA: SurchargeCustomers[] = [
  {
    position: 1, debitorennr: 80020, debitor: 'Raiffeisen e-force',
    typ: 'Fremdbanken', kundennr: 19690, kunde: 'ERSTE Bank',
    n2015: 991, n2016: 1005, n2017: 1018, n2018: 1038, aufschlag_2018: 233
  },
  {
    position: 2, debitorennr: 19690, debitor: 'Vakif',
    typ: 'Fremdbanken', kundennr: 19685, kunde: 'Vakif',
    n2015: 872, n2016: 872, n2017: 872, n2018: 872, aufschlag_2018: 67
  },
  {
    position: 3, debitorennr: 31100, debitor: 'Raiffeisen Factor Bank AG',
    typ: 'Sektorbanken', kundennr: 31100, kunde: 'Raiffeisen Factor Bank AG',
    n2015: 833, n2016: 864, n2017: 845, n2018: 845, aufschlag_2018: 40
  },
];
