import { Component } from "@angular/core";
// import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from "../core";

@Component({
  selector: "app-translate",
  template: `
    <button
      mat-icon-button
      class="uis-layout-toolbar-button"
      [matMenuTriggerFor]="menu"
    >
      <mat-icon>translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        *ngFor="let lang of langs | keyvalue"
        (click)="useLanguage(lang.key)"
      >
        <span>{{ lang.value }}</span>
      </button>
    </mat-menu>
  `,
  styles: [],
  providers: [SettingsService],
})
export class TranslateComponent {
  langs = {
    "en-CO": "Español",
    "en-US": "English",
  };

  constructor(
    // private translate: TranslateService,
    private settings: SettingsService
  ) {
    // translate.addLangs(['en-US', 'zh-CN', 'zh-TW']);
  }

  useLanguage(language: string) {
    // this.translate.use(language);
    this.settings.setLanguage(language);
  }
}
