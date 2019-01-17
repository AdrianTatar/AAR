import { Component, AfterViewInit, HostListener } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { languageChange } from '../../animations';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { ExpAddDialogComponent } from './exp-add-dialog/exp-add-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [languageChange]
})
export class NavbarComponent implements AfterViewInit {

  userName;
  windowWidth: number = window.innerWidth;
  language = 'DE';
  selected = 'DE';
  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    public snackBar: MatSnackBar,
    public router: Router,
    public cookieService: CookieService
  ) {
    translate.setDefaultLang('de');
    this.language = 'DE';
    this.userName = this.cookieService.get('username');
  }
  ngAfterViewInit() {

    document.addEventListener('click', function (event) {
      if (document.getElementById('mat-select-0')) {
        document.getElementById('mat-select-0').blur();
      }
    });
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.windowWidth = window.innerWidth;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExpAddDialogComponent, {
      width: '500px',
      disableClose: true
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.language = language.toUpperCase();

    if (this.language === 'EN') {
      this.openSnackBar('English language.', '');
    } else {
      this.openSnackBar('Deutsch Sprache.', '');
    }
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 1300,
      panelClass: ['snackbar-panelclass']
    });
  }

  private logout() {
    this.translate.use('de');
    this.cookieService.delete('username');
    this.router.navigate(['']);
  }
}

