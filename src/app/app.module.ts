import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDateFormats } from '@angular/material/core';
import { EffectsModule } from '@ngrx/effects';
import { PPAL_PROVIDERS } from './providers-ppal';
import { PPAL_MODULES_WITH_LOADER_I18N_ROOT } from './modules-ppal';
import { JwtModule } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';

export const MOMENT_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'D/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM Y',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM Y',
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...PPAL_MODULES_WITH_LOADER_I18N_ROOT,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage?.getItem('authToken'),
      },
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [...PPAL_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
