import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-crud-product',
  templateUrl: './crud-product.component.html',
  styleUrl: './crud-product.component.scss',
})
export class CrudProductComponent implements OnInit { 
  form: FormGroup;
  searchCategory: string;
  categories: {
    name: string;
    displayName: string;
  }[];


  constructor(
    private fb: FormBuilder,
    private prodService: ProductsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getCategories();

    if (this.data.product) {
      this.initializeForm(this.data.product);
    }
  }

  initializeForm(product: Product) {
    this.form.controls.title.setValue(product.title);
    this.form.controls.price.setValue(product.price);
    this.form.controls.description.setValue(product.description);
    this.searchCategory = product.category;
    this.form.controls.category.setValue(product.category);
  }

  getCategories() {
    this.prodService.getAllCategories().subscribe({
      next: (res) => {
        if (!res) return;

        this.categories = res.map((cat) => {
          const formatedName = cat.charAt(0).toUpperCase() + cat.substring(1).toLowerCase()
          return {
            name: cat,
            displayName: formatedName
          }
        })
      }
    })
  }

  limpiarFormulario() {
    this.form.reset();
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: [null, Validators.required],
      description: ['', Validators.required],
      category: [null, Validators.required]
    });
  }
}
