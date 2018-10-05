import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { languageChange } from '../../animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [languageChange]
})
export class NavbarComponent implements OnInit {
  language = 'EN';
  image = '';

  constructor(
    private translate: TranslateService,
    public snackBar: MatSnackBar
  ) {
    translate.setDefaultLang('en');
    this.language = 'EN';
    this.image = '../../assets/resources/united-kingdom.png';
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.language = language.toUpperCase();

    if (this.language === 'EN') {
      this.image = '../../assets/resources/united-kingdom.png';
      this.openSnackBar('English language.', '');
    } else {
      this.image = '../../assets/resources/germany.png';
      this.openSnackBar('Deutsch Sprache.', '');
    }
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 1300,
      panelClass: ['blue-snackbar']
    });
  }

  ngOnInit() {}
}
