import { Component } from '@angular/core';
import { fadeInOut } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeInOut]
})

export class AppComponent {
  getPage(outlet) {
    return outlet.activatedRouteData['page'] || 'two';
  }
}
