import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FppAddDialogComponent } from './fpp-add-dialog/fpp-add-dialog.component';
import { FixedPriceProject } from '../../shared/models/fixed-price-project';
import { FixedPriceProjectService } from './services/fixed-price-project.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fixed-price-projects',
  templateUrl: './fixed-price-projects.component.html',
  styleUrls: ['./fixed-price-projects.component.css']
})

export class FixedPriceProjectsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['projectPlanmillNumber', 'projectIdTagetik', 'projectDescription', 'customerNumber', 'price', 'menu'];
  dataSource = new MatTableDataSource<FixedPriceProject>();
  filteredDataSource = new MatTableDataSource<FixedPriceProject>();
  fixedPriceProjects: FixedPriceProject[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedRowToEdit = -1;
  selectedRow = -1;
  projectPlanmillNumberSearch = false;
  projectIdTagetikSearch = false;
  projectDescriptionSearch = false;
  customerNumberSearch = false;
  priceSearch = false;

  projectPlanmillNumberSearchQuery = '';
  tagetikSearchQuery = '';
  projectDescriptionSearchQuery = '';
  customerNumberSearchQuery = 0;
  priceSearchQuery = 0;

  addNewElement = false;

  fppForm;
  fppInputs: FixedPriceProject = {
    id: null,
    projectPlanmillNumber: '',
    projectIdTagetik: '',
    projectDescription: '',
    customerNumber: 0,
    price: 0
  };

  async ngOnInit() {
    this.selectedRow = 0;

    this.fppForm = new FormGroup({
      projectPlanmillNumber: new FormControl('', Validators.required),
      projectIdTagetik: new FormControl('', Validators.required),
      projectDescription: new FormControl('', Validators.required),
      customerNumber: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });

    await this.fixedPriceProjectService.getFixedPriceProjects().subscribe(data => {
      this.fixedPriceProjects = data;
      this.dataSource.data = this.fixedPriceProjects;
      this.filteredDataSource.data = this.fixedPriceProjects;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.filteredDataSource.paginator = this.paginator;

    document.addEventListener('click', function (event) {
      if (document.getElementById('mat-select-0')) {
        document.getElementById('mat-select-0').blur();
      }
    });
  }

  constructor(
    public dialog: MatDialog,
    private fixedPriceProjectService: FixedPriceProjectService
  ) {
  }

  filter() {
    this.filteredDataSource.data = this.dataSource.data;

    this.filteredDataSource.data = (this.projectPlanmillNumberSearchQuery) ?
      this.dataSource.data.filter(p => p.projectPlanmillNumber
        .toLocaleLowerCase()
        .trim()
        .includes(this.projectPlanmillNumberSearchQuery.toLocaleLowerCase().trim()))
      : this.dataSource.data;

    this.filteredDataSource.data = (this.tagetikSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.projectIdTagetik
        .toLocaleLowerCase()
        .trim()
        .includes(this.tagetikSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.projectDescriptionSearchQuery) ?
      this.filteredDataSource.data.filter(p => p.projectDescription
        .toLocaleLowerCase()
        .trim()
        .includes(this.projectDescriptionSearchQuery.toLocaleLowerCase().trim()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.customerNumberSearchQuery) ?
      this.filteredDataSource.data
        .sort(function (a: FixedPriceProject, b: FixedPriceProject) { return a.customerNumber - b.customerNumber; })
        .filter(p => p.customerNumber
          .toString()
          .includes(this.customerNumberSearchQuery.toString()))
      : this.filteredDataSource.data;

    this.filteredDataSource.data = (this.priceSearchQuery) ?
      this.filteredDataSource.data
        .sort(function (a: FixedPriceProject, b: FixedPriceProject) { return a.price - b.price; })
        .filter(p => p.price
          .toString()
          .includes(this.priceSearchQuery.toString()))
      : this.filteredDataSource.data;
  }

  get formprojectPlanmillNumber() {
    return this.fppForm.get('projectPlanmillNumber');
  }

  get formprojectIdTagetik() {
    return this.fppForm.get('projectIdTagetik');
  }

  get formprojectDescription() {
    return this.fppForm.get('projectDescription');
  }

  get formcustomerNumber() {
    return this.fppForm.get('customerNumber');
  }

  get formPrice() {
    return this.fppForm.get('price');
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

  openDialog(): void {
    const dialogRef = this.dialog.open(FppAddDialogComponent, {
      width: '33%',
      height: '55%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.fixedPriceProjectService.createFixedPriceProject(data);
        this.pushObject(data);
      }
    });
  }

  clearSearchInputBox() {
    if (!this.projectPlanmillNumberSearch) {
      this.projectPlanmillNumberSearchQuery = '';
    }
    if (!this.priceSearch) {
      this.priceSearchQuery = 0;
    }
    if (!this.projectIdTagetikSearch) {
      this.tagetikSearchQuery = '';
    }
    if (!this.projectDescriptionSearch) {
      this.projectDescriptionSearchQuery = '';
    }
    if (!this.customerNumberSearch) {
      this.customerNumberSearchQuery = 0;
    }
    this.filter();
  }

  async pushObject(data: FixedPriceProject) {
    data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
    this.dataSource.data.push(data);
    this.filteredDataSource.data = this.dataSource.data;
    await this.filteredDataSource._updatePaginator(this.dataSource.data.length);
    this.filteredDataSource.paginator.lastPage();
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

  private isFieldChanged() {
    if (this.fppInputs.projectPlanmillNumber === this.dataSource.data[this.selectedRowToEdit - 1].projectPlanmillNumber &&
      this.fppInputs.projectIdTagetik === this.dataSource.data[this.selectedRowToEdit - 1].projectIdTagetik &&
      this.fppInputs.projectDescription === this.dataSource.data[this.selectedRowToEdit - 1].projectDescription &&
      this.fppInputs.customerNumber === this.dataSource.data[this.selectedRowToEdit - 1].customerNumber &&
      this.fppInputs.price === this.dataSource.data[this.selectedRowToEdit - 1].price) {
      return false;
    }
  }

  private confirmEdit() {
    if (this.fppForm.valid) {
      this.dataSource.data[this.selectedRowToEdit - 1].projectPlanmillNumber = this.fppInputs.projectPlanmillNumber;
      this.dataSource.data[this.selectedRowToEdit - 1].projectIdTagetik = this.fppInputs.projectIdTagetik;
      this.dataSource.data[this.selectedRowToEdit - 1].projectDescription = this.fppInputs.projectDescription;
      this.dataSource.data[this.selectedRowToEdit - 1].customerNumber = this.fppInputs.customerNumber;
      this.dataSource.data[this.selectedRowToEdit - 1].price = this.fppInputs.price;
      this.fixedPriceProjectService.updateFixedPriceProject(this.dataSource.data[this.selectedRowToEdit - 1]);
      this.selectedRowToEdit = -1;
    }
  }

  private setEditValues(rowNumber) {
    this.fppInputs.projectPlanmillNumber = this.dataSource.data[rowNumber - 1].projectPlanmillNumber;
    this.fppInputs.projectIdTagetik = this.dataSource.data[rowNumber - 1].projectIdTagetik;
    this.fppInputs.projectDescription = this.dataSource.data[rowNumber - 1].projectDescription;
    this.fppInputs.customerNumber = this.dataSource.data[rowNumber - 1].customerNumber;
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
