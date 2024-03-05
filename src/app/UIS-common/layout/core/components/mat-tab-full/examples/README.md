## MAT TAB FULL COMPONENT

Componente para crear pestañas con un estilo particular, y pueden ser estaticas o variables, lo que implica que se pueden tener una 
cantidad fija o agregar y eliminar.

```html
<app-mat-tab-full
  [preserveContent]="true"
  [showCloseTab]="true"
  [showModalCreate]="true"
  [showCloseTab]="true"
  [preventCloseTab]="true"
  (addTab)="agregarTab($event)"
  (closeTab)="closetab($event)"
  (matTabGroup)="elementTabGroup($event)"
  (selectedTabChange)="tabChange($event)"
  (selectedIndexChange)="indexChange($event)"
>
  <ng-template
    *ngFor="let item of tabs"
    tabFullContent
    [label]="item.label"
    [disabled]="item.disabled"
    [icon]="item.icon"
  >
    {{ item.content }}
  </ng-template>
</app-mat-tab-full>
```

```ts
export class ExampleTabComponent {
  tabs: any[] = [
    {
      label: 'primera tab',
      icon: undefined,
      disabled: false,
      content: 'pruebas del componente para crear pestañas',
    },
    {
      label: 'segunda tab',
      icon: undefined,
      disabled: true,
      content: 'cuando una pestaña esta desactivada',
    },
    {
      label: 'tercera tab',
      icon: 'campaign',
      disabled: false,
      content:
        'cuando la pestaña tiene icono y un nombre largo, aparece un tooltip que muestra el nombre completo',
    },
  ];

  agregarTab(res?: DataCreateTab) {
    this.tabs.push({
      label: res.label,
      content: 'nueva creada (mensaje predeterminado para la prueba)',
    });
  }

  closetab(index) {
    console.log(index);
    //elimina la tab
    this.tabs.splice(index, 1);
  }

  elementTabGroup(value) {
    console.log('mat-tab-group', value);
  }
  tabChange(value) {
    console.log('change tab', value);
  }
  indexChange(value) {
    console.log('index tab', value);
  }
}
```
<hr>
