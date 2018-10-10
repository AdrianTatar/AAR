import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FppAddDialogComponent } from './fpp-add-dialog/fpp-add-dialog.component';
import { FixedPriceProject } from '../../shared/models/fixed.price.project';
import { FixedPriceProjectService } from './services/fixed-price-project.service';
@Component({
  selector: 'app-fixed-price-projects',
  templateUrl: './fixed-price-projects.component.html',
  styleUrls: ['./fixed-price-projects.component.css']
})

export class FixedPriceProjectsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['projectnumberplanmill', 'projectidtagetik', 'projectdescription', 'customernumber', 'price', 'menu'];
  dataSource = new MatTableDataSource<FixedPriceProject>();
  filteredDataSource = new MatTableDataSource<FixedPriceProject>();

  fixedPriceProjects: FixedPriceProject[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;

  projectnumberplanmillSearch = false;
  projectidtagetikSearch = false;
  projectdescriptionSearch = false;
  customernumberSearch = false;
  priceSearch = false;

  projectnumberplanmillSearchQuery = '';
  projectidtagetikSearchQuery = '';
  projectdescriptionSearchQuery = '';
  customernumberSearchQuery = 0;
  priceSearchQuery = 0;

  addNewElement = false;

  fppForm;
  fppInputs: FixedPriceProject = {
    id: null,
    projectnumberplanmill: '',
    projectidtagetik: '',
    projectdescription: '',
    customernumber: 0,
    price: 0
  };

  constructor(
    public dialog: MatDialog, private fixedPriceProjectService: FixedPriceProjectService
  ) { }

  filter() {
    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.projectnumberplanmillSearchQuery) ?
      // tslint:disable-next-line:max-line-length
      this.dataSource.data.filter(p => p.projectnumberplanmill.toLocaleLowerCase().includes(this.projectnumberplanmillSearchQuery.toLocaleLowerCase()))
      : this.dataSource.data;

    this.filteredDataSource.data = (this.projectidtagetikSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.projectidtagetik.toLocaleLowerCase()
        .includes(this.projectidtagetikSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.projectdescriptionSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.projectdescription.toLocaleLowerCase()
        .includes(this.projectdescriptionSearchQuery.toLocaleLowerCase()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.customernumberSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.customernumber === this.customernumberSearchQuery)
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.priceSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.price === this.priceSearchQuery)
      : this.filteredDataSource.data;
  }

  async ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selectedRow = 0;

    this.fppForm = new FormGroup({
      projectnumberplanmill: new FormControl('', Validators.required),
      projectidtagetik: new FormControl('', Validators.required),
      projectdescription: new FormControl('', Validators.required),
      customernumber: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });

    await this.fixedPriceProjectService.getFixedPriceProjects().subscribe(data => {
      this.fixedPriceProjects = data;
      this.dataSource.data = this.fixedPriceProjects;
      this.filteredDataSource.data = this.fixedPriceProjects;
    });
  }

  get formProjectnumberplanmill() {
    return this.fppForm.get('projectnumberplanmill');
  }

  get formProjectidtagetik() {
    return this.fppForm.get('projectidtagetik');
  }

  get formProjectdescription() {
    return this.fppForm.get('projectdescription');
  }

  get formCustomernumber() {
    return this.fppForm.get('customernumber');
  }

  get formPrice() {
    return this.fppForm.get('price');
  }

  ngAfterViewInit() {
    // document.addEventListener('click', function (event) {
    //   document.getElementById('mat-select-0').blur();
    // });
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

  openDialog(): void {
    const dialogRef = this.dialog.open(FppAddDialogComponent, {
      width: '600px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.pushObject(data);
      }
    });
  }

  clearSearchInputBox() {
    if (!this.projectnumberplanmillSearch) {
      this.projectnumberplanmillSearchQuery = '';
    }
    if (!this.priceSearch) {
      this.priceSearchQuery = 0;
    }
    if (!this.projectidtagetikSearch) {
      this.projectidtagetikSearchQuery = '';
    }
    if (!this.projectdescriptionSearch) {
      this.projectdescriptionSearchQuery = '';
    }
    if (!this.customernumberSearch) {
      this.customernumberSearchQuery = 0;
    }
    this.filter();
  }

  private pushObject(data: FixedPriceProject) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    this.dataSource.data.push(data);
    this.filteredDataSource.data = this.dataSource.data;
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  private selectRow(rowNumber) {
    this.selectedRow = rowNumber;
  }

  private editRow(rowNumber) {
    this.selectedRowToEdit = this.mapToDataSource(rowNumber);
    this.setEditValues(this.selectedRowToEdit);
  }

  private cancelEdit() {
    this.selectedRowToEdit = -1;
  }

  private confirmEdit() {
    if (this.fppForm.valid) {
      this.dataSource.data[this.selectedRowToEdit - 1].projectnumberplanmill = this.fppInputs.projectnumberplanmill;
      this.dataSource.data[this.selectedRowToEdit - 1].projectidtagetik = this.fppInputs.projectidtagetik;
      this.dataSource.data[this.selectedRowToEdit - 1].projectdescription = this.fppInputs.projectdescription;
      this.dataSource.data[this.selectedRowToEdit - 1].customernumber = this.fppInputs.customernumber;
      this.dataSource.data[this.selectedRowToEdit - 1].price = this.fppInputs.price;
      this.selectedRowToEdit = -1;
    }
  }

  private setEditValues(rowNumber) {
    this.fppInputs.projectnumberplanmill = this.dataSource.data[rowNumber - 1].projectnumberplanmill;
    this.fppInputs.projectidtagetik = this.dataSource.data[rowNumber - 1].projectidtagetik;
    this.fppInputs.projectdescription = this.dataSource.data[rowNumber - 1].projectdescription;
    this.fppInputs.customernumber = this.dataSource.data[rowNumber - 1].customernumber;
    this.fppInputs.price = this.dataSource.data[rowNumber - 1].price;
  }

  private mapToDataSource(elementId) {
    let pos = 0;
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (this.dataSource.data[i].id === elementId) {
        pos = i;
      }
    }
    return pos + 1;
  }
}
