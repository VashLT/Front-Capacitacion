import { Component } from '@angular/core';
import { NavigationService } from '@UIS-common/layout/shared/services/navigation/navigation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'UIS';
  constructor(_navigationButtonService: NavigationService) {
    // Do nothing
  }
}
