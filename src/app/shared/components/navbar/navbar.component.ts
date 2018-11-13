import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { languageChange } from '../../animations';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [languageChange]
})
export class NavbarComponent {
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
    this.cookieService.delete('username');
    this.router.navigate(['']);
  }
}

