import {
  NgxMatDateAdapter,
  NgxMatDateFormats,
  NGX_MAT_DATE_FORMATS,
} from '@angular-material-components/datetime-picker';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomNgxDatetimeAdapter } from '@UIS-common/utils/ngx-datetime-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'yyyy',
    dateA11yLabel: 'dd',
    monthYearA11yLabel: 'mm',
  },
};

export const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS',
  },
  display: {
    dateInput: 'DD/MM/YYYY HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/**
 * Providers comunmente usados en material.
 */
export const MATERIAL_PROVIDERS = [
  {
    provide: MatDialogRef,
    useValue: {},
  },
  { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  {
    provide: NgxMatDateAdapter,
    useClass: CustomNgxDatetimeAdapter,
    deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
];
