import { Scenario } from './../../shared/models/scenario';
import { ExportService } from './services/export.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.css']
})
export class ExportComponent {
    location;
    page;
    scenarios: Scenario[];
    private exportProjectUrl = '/export';

    constructor(
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
            panelClass: ['snackbar-panelclass']
        });
    }
}
