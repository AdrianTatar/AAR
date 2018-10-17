import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SurchargeCustomersRateService } from './services/surcharge-customers-rates.service';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { SurchargeCustomerRate } from '../../../shared/models/surcharge.customer.rate';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';

@Component({
    selector: 'app-surcharge-customers-rates',
    templateUrl: './surchargecustomersrate.component.html',
    styleUrls: ['./surchargecustomersrate.component.css']
})
export class SurchargeCustomersRateComponent implements OnInit {

    displayedColumns: string[] = ['surchargecustomer_id', 'year', 'dailyrate'];
    dataSource = new MatTableDataSource<SurchargeCustomerRate>();
    filteredDataSource = new MatTableDataSource<SurchargeCustomerRate>();
    surchargeCustomerRate: SurchargeCustomerRate[];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    selectedRowToEdit = -1;
    selectedRow = -1;

    surchargecustomer_idSearch = false;
    yearSearch = false;
    dailyrateSearch = false;

    surchargecustomer_idSearchQuery = 0;
    yearSearchQuery = 0;
    dailyrateSearchQuery = 0;

    addNewElement = false;

    scrForm;
    scrInputs: SurchargeCustomerRate = {
        rates: [{
            id: null,
            surchargecustomer_id: null,
            year: null,
            dailyrate: null
        }]
    };

    constructor(
        public dialog: MatDialog, private surchargeCustomersRateService: SurchargeCustomersRateService
    ) { }

    async ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.selectedRow = 0;

        this.scrForm = new FormGroup({
            surchargecustomer_id: new FormControl('', Validators.required),
            year: new FormControl('', Validators.required),
            dailyrate: new FormControl('', Validators.required)
        });

        await this.surchargeCustomersRateService.getSurchargeCustomersRates().subscribe(data => {
            this.surchargeCustomerRate = data;
            this.dataSource.data = this.surchargeCustomerRate;
            this.filteredDataSource.data = this.surchargeCustomerRate;
        });
    }

    get formCustomerId() {
        return this.scrForm.get('surchargecustomer_id');
    }

    get formYear() {
        return this.scrForm.get('year');
    }

    get formDailyRate() {
        return this.scrForm.get('dailyrate');
    }

    private selectRow(rowNumber) {
        this.selectedRow = rowNumber;
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

    clearSearchInputBox() {
        if (!this.surchargecustomer_idSearch) {
            this.surchargecustomer_idSearchQuery = 0;
        }
        if (!this.yearSearch) {
            this.yearSearchQuery = 0;
        }
        if (!this.dailyrateSearch) {
            this.dailyrateSearchQuery = 0;
        }
    }

    private editRow(rowNumber) {
        /*this.selectedRowToEdit = this.mapToDataSource(rowNumber);*/
        this.setEditValues(this.selectedRowToEdit);
    }

    private cancelEdit() {
        this.selectedRowToEdit = -1;
    }

    private setEditValues(rowNumber) {
    }

    private confirmEdit() {
    }

    /*private pushObject(data: SurchargeCustomerRate) {
        data.id = this.dataSource.data[this.dataSource.data.length - 1].id + 1;
        this.dataSource.data.push(data);
        this.filteredDataSource.data = this.dataSource.data;
        this.paginator._changePageSize(this.paginator.pageSize);
    }

    private mapToDataSource(elementId) {
        let pos = 0;
        for (let i = 0; i < this.dataSource.data.length; i++) {
            if (this.dataSource.data[i].id === elementId) {
                pos = i;
            }
        }
        return pos + 1;
    }*/
}
