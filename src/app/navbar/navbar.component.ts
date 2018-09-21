import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  language = '';
  image = '';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    this.language = 'EN';
    this.image = '../../assets/resources/united-kingdom.png';
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.language = language.toUpperCase();

    if (this.language === 'EN') {
      this.image = '../../assets/resources/united-kingdom.png';
    } else {
      this.image = '../../assets/resources/germany.png';
    }
  }

  ngOnInit() {}
}
