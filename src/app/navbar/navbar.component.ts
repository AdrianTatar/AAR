import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  language = '';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.language = 'EN';
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.language = language.toUpperCase();
  }

  ngOnInit() { }
}
