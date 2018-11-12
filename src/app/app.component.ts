import { Component } from '@angular/core';
import { fadeAnimation } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ fadeAnimation ]
})

export class AppComponent {
  getPage(outlet) {
    return outlet.activatedRouteData['page'] || 'one';
  }

  getNavBar(outlet) {
    return outlet.activatedRouteData['noNavBar'] || 'false';
  }
}
