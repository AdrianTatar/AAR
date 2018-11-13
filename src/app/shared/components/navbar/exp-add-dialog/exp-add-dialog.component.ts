import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Scenario } from 'src/app/shared/models/scenario';
import { ExportService } from 'src/app/pages/export/services/export.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-exp-add-dialog',
    templateUrl: './exp-add-dialog.component.html',
    styleUrls: ['./exp-add-dialog.component.css']
})
export class ExpAddDialogComponent {
    location;
    page;
    scenarios: Scenario[];
    private exportProjectUrl = '/export';

    constructor(
        private dialogRef: MatDialogRef<ExpAddDialogComponent>,
        private exportService: ExportService,
        public snackBar: MatSnackBar,
        private cookieService: CookieService
    ) {
    }

    async changeScenarios(year) {
        await this.exportService.getScenarios(year).subscribe(data => {
            this.scenarios = data;
        });
    }

    exportXML(year, scenario) {
        if (year != null && scenario != null) {
            this.location = this.exportProjectUrl + year + '/' + scenario + '/' + this.cookieService.get('username');
            window.open(this.location);
        } else {
            this.openSnackBar('Select Year and Scenario before exporting!', '');
        }
    }

    private openSnackBar(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 1300,
            panelClass: ['blue-snackbar']
        });
    }
}
