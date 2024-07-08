import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableFullComponent } from '@uis/uis-lib/components/mat-table-full';
import { MatTableFullOptions } from '@uis/uis-lib/models';
import { Product } from "./types/product.type";
import { CurrencyNewPipe } from "@uis/uis-lib/pipes/currencyNew";
import { ProductsService } from "./services/products.service";
import { CrudService } from "@uis/uis-lib/services/crud";
import { ViewProductComponent } from "./components/view-product/view-product.component";
import { CrudProductComponent } from "./components/crud-product/crud-product.component";
import { SnackbarService } from "@uis/uis-lib/services/snackbar";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
  providers: [CurrencyNewPipe],
})
export class CrudComponent { 
  /**
   * Referencia a la tabla
   */
  @ViewChild('tabla') table: MatTableFullComponent;

  optionsTable: MatTableFullOptions = {
    defaultData: [],
    hasActions: true,
    hideButtons: {
      delete: true,
    },
    hasFilter: true,
    keys: ['title', 'price', 'description', 'category'],
    mappers: [
      null,
      (value) => this.currencyPipe.transform(value * 4000, 'COP', '$', '1.0-100'),
      null,
      null,
    ],
    labelColumns: ['Titulo', 'Precio (COP)', 'Descripción', 'Categoria'],
    alignmentColumns: ['left', 'center', 'left', 'left'],
    widthColumns: [null, '200px', null, null],
    //https://fakestoreapi.com/docs
    urlData: 'https://fakestoreapi.com/products',
  };

  constructor(
    private currencyPipe: CurrencyNewPipe,
    private crudService: CrudService,
    private prodService: ProductsService,
    private snackbar: SnackbarService
  ) { }
  
  viewProduct(product: Product) {
    this.crudService.show({
      title: 'Ver producto',
      dataComponent: {
        producto: product,
        viewMode: true,
      },
      component: ViewProductComponent,
    }).subscribe((res) => {
      console.log({ res });
    })
  }

  addNewProduct() {
    console.log('add new product');
    this.crudService.show({
      title: 'Añadir producto',
      dataComponent: {},
      component: CrudProductComponent,
    }).subscribe((dialogRes) => {
      if (!dialogRes.estado) return;

      const body = {
        ...dialogRes.data,
        image: 'https://futgod90.com/cdn/shop/files/Disenosintitulo_10.png?v=1717195339'
      }
      this.prodService.addNewProduct(body).subscribe({
        next: (res: any) => {
          console.log({ res });
          // {id: 21, updated: false}
          if (!res) return;

          this.crudService.close(dialogRes.dialogRef);
          this.table.unshiftRow({
            id: res.id,
            ...body
          });
          this.snackbar.show({
            mensaje: 'Se ha agregado el producto correctamente',
            tipo: 'success'
          });
        },
        error: (_err) => this.snackbar.show({
          mensaje: 'No ha sido posible crear el producto',
          tipo: 'error'
        })
      })
    })
  }

  editProduct(product: Product) {
    this.crudService.show({
      title: 'Editar producto',
      dataComponent: {
        product,
        editMode: true
      },
      component: CrudProductComponent,
    }).subscribe((dialogRes) => {
      if (!dialogRes.estado) return;

      const data = dialogRes.data;

      console.log({ data });
      const dataDidNotChange =
        data.title === product.title &&
        data.description === product.description &&
        data.price === product.price &&
        data.category === product.category;
      
      if (dataDidNotChange) {
        this.snackbar.show({
          mensaje: 'No se ha modificado ningún valor',
          tipo: 'warning'
        });
        return;
      }

      const body = {
        ...data,
        image: product.image
      }

      this.prodService.editProduct(product.id, body).subscribe({
        next: (res: any) => {
          if (!res) return;

          this.crudService.close(dialogRes.dialogRef);
          this.table.updateRow({
            id: product.id,
            ...body
          }, 'id');
          this.snackbar.show({
            mensaje: 'Se ha editado el producto correctamente',
            tipo: 'success'
          });
        },
        error: (_err) => this.snackbar.show({
          mensaje: 'No ha sido posible editar el producto',
          tipo: 'error'
        })
      })

    })
  }
}
