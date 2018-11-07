import { Scenario } from './../../shared/models/scenario';
import { ExportService } from './services/export.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.css']
})
export class ExportComponent {
    location;
    scenarios: Scenario[];

    constructor(
        private exportService: ExportService,
        public snackBar: MatSnackBar
    ) {
    }

    async changeScenarios(year) {
        await this.exportService.getScenarios(year).subscribe(data => {
            this.scenarios = data;
        });
    }

    async exportXML(year, scenario) {
        if (year != null && scenario != null) {
            this.location = 'http://localhost:8080/aarREST/rest/export/' + year + '/' + scenario;
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

