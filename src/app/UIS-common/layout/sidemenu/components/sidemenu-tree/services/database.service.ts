import { Injectable } from "@angular/core";
import { Menu } from "../../../../core/bootstrap/models/menu.model";
import { BehaviorSubject } from "rxjs";

/**
 * Servicio para los nodos del arbol.
 */
@Injectable()
export class DatabaseService {
  /**
   * Observador del cambio de la data.
   */
  dataChange = new BehaviorSubject<any[]>([]);

  /**
   * Observador de la cantidad de nodos del árbol.
   */
  dataChangeCount = new BehaviorSubject<number>(0);

  /**
   * Lista de nodos checkeados.
   */
  checkedList: number[] = [];

  /**
   * Constructor del servicio.
   */
  constructor() {}

  /**
   * Devuelve todos los datos del árbol.
   */
  get data(): any[] {
    return this.dataChange.value;
  }

  /**
   * Método para obtener el
   */
  get itemCount(): number {
    return this.dataChangeCount.value;
  }

  /**
   * Método para inicializar el arbol.
   * @param dataTree - Arbol de datos
   */
  initialize(dataTree: Menu[]) {
    this.dataChange.next(dataTree);
    this.dataChangeCount.next(this.getItemsQuantity());
  }

  /**
   * Obtiene la cantidad de elementos en el árbol.
   *
   * @param data - Arbol de datos
   * @returns - Cantidad items
   */
  private getItemsQuantity(data = this.data): number {
    let quantity: number = 0;
    data.forEach((node) => {
      if (node.children && node.children.length > 0) {
        quantity += this.getItemsQuantity(node.children);
      }
    });
    quantity += data.length;
    return quantity;
  }

  /**
   * Insertar un registro.
   *
   * @param parent - Nodo padre
   * @param value - Nuevo nodo
   */
  insertItem(parent: any, value: any) {
    if (parent.children) {
      parent.children.push(value);
      this.dataChange.next(this.data);
    } else {
      parent.children = [];
      parent.children.push(value);
      this.dataChange.next(this.data);
    }
  }

  /**
   * Método para insertar un padre.
   * @param value - Nodo
   */
  insertItemPadre(value: any) {
    this.data.push(value);
    this.dataChange.next(this.data);
  }

  /**
   * Método para actualizar un nodo padre.
   *
   * @param prevValue - Nodo antes
   * @param newValue - Nodo actualizado
   */
  updateParentItem(prevValue: any, newValue: any) {
    const index = this.data.indexOf(prevValue);
    if (index !== -1) {
      this.data[index] = newValue;
    }
    this.dataChange.next(this.data);
  }

  /**
   * Método para actualizar un nodo.
   *
   * @param parent - Nodo padre
   * @param prevValue - Nodo antes
   * @param newValue - Nodo actualizado
   */
  updateItem(parent: any, prevValue: any, newValue: any) {
    if (parent !== undefined && parent.children) {
      parent.children = parent.children.map((c: any) => {
        if (c.id === prevValue.id) {
          return newValue;
        } else {
          return c;
        }
      });
    } else {
      this.data.forEach((node, index) => {
        if (node.id === prevValue.id) {
          this.data[index] = { ...this.data[index], ...newValue };
        }
      });
    }
    this.dataChange.next(this.data);
  }

  /**
   * Método para borrar un nodo.
   *
   * @param parent - Nodo padre
   * @param id - Id del nodo
   */
  deleteItem(parent: any, id: any): void {
    if (!parent) {
      this.deleteParentItem(id);
    } else if (parent.children) {
      parent.children = parent.children.filter((c: any) => c.id !== id);
      this.dataChange.next(this.data);
    }
  }

  /**
   * Método para eliminar un nodo padre sin hijos.
   *
   * @param id - Id del nodo padre
   */
  deleteParentItem(id: number) {
    this.initialize(this.data.filter((c) => c.id !== id));
  }

  /**
   * Elimina un nodo y su descendencia.
   *
   * @param id - Id del nodo
   */
  deleteNestedItem(id: number) {
    this.initialize(this.deleteDescendence(this.data, id));
  }

  /**
   * Eliminar la descendencia de un nodo.
   *
   * @param hijos - Arreglo de hijos
   * @param id - Id del nodo
   * @returns - Arreglo de hijos
   */
  private deleteDescendence(hijos: any[], id: number) {
    if (hijos && hijos?.length > 0) {
      hijos = hijos.filter((node) => {
        if (node.id === id) return false;
        if (!node.children || node.children?.length === 0) return true;
        node.children = this.deleteDescendence(node.children, id);
        return node.children && node.children?.length !== 0;
      });
      return hijos;
    }
    return [];
  }
}
