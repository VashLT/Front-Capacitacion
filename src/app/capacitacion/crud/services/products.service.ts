import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }

  getAllCategories() {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }

  addNewProduct(body: {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }) {
    return this.http.post('https://fakestoreapi.com/products', JSON.stringify(body));
  }

  editProduct(idProduct, body: {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
  }) {
    return this.http.put(`https://fakestoreapi.com/products/${idProduct}`, JSON.stringify(body));
  }
}
