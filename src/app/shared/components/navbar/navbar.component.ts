import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { languageChange } from '../../animations';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [languageChange]
})
export class NavbarComponent {

  language = 'EN';

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    public snackBar: MatSnackBar,
    public router: Router,
    public cookieService: CookieService
  ) {
    translate.setDefaultLang('en');
    this.language = 'EN';
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
      panelClass: ['blue-snackbar']
    });
  }

  private logout() {
    this.cookieService.delete('username');
    this.router.navigate(['']);
  }
}
