import { UserActionsCreateService } from './../../../services/user-actions-create.service';
import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Scenario } from 'src/app/shared/models/scenario';
import { ExportService } from 'src/app/pages/export/services/export.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
    selector: 'app-exp-add-dialog',
    templateUrl: './exp-add-dialog.component.html',
    styleUrls: ['./exp-add-dialog.component.css']
})

@Injectable({
    providedIn: 'root'
})

export class ExpAddDialogComponent {
    location;
    page;
    scenarios: Scenario[];


    constructor(
        private http: HttpClient,
        private exportService: ExportService,
        public snackBar: MatSnackBar,
        private cookieService: CookieService,
        private userActionsCreateService: UserActionsCreateService
    ) {
    }

    private exportProjectUrl = '/export';

    async changeScenarios(year) {
        await this.exportService.getScenarios(year).subscribe(data => {
            this.scenarios = data;
        });
    }

    exportXML(year, scenario) {
        // if (year != null && scenario != null) {
        //     this.location = this.exportProjectUrl + '/' + year + '/' + scenario + '/' + this.cookieService.get('username');
        //     console.log(this.location);
        // } else {
        //     this.openSnackBar('Select Year and Scenario before exporting!', '');
        // }
        this.exportService.getXML(year, scenario).subscribe();
        this.userActionsCreateService.createUserAction('ExcelGenerate');
    }


    private openSnackBar(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 1300,
            panelClass: ['snackbar-panelclass']
        });
    }
}
