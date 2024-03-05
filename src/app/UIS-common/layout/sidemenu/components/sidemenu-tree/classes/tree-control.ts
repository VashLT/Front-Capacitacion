import { FlatTreeControl } from "@angular/cdk/tree";
import { Nodo } from "../models/nodo.model";

/**
 * Clase que extiende funcionalidades de FlatTreeControl
 * Provee métodos comúnes para el manejo de los nodos
 */
export class TreeControl extends FlatTreeControl<Nodo, Nodo> {
  getSiblings(node: Nodo): Nodo[] {
    /**
     * start index
     */
    let center = this.dataNodes.indexOf(node);
    let i = center + 1;
    let currentNode: Nodo;
    const level = node.level;
    const siblings: Nodo[] = [];
    /**
     * siblings to the right
     */
    if (i < this.dataNodes.length) {
      while (this.dataNodes[i]) {
        currentNode = this.dataNodes[i];
        if (currentNode.level < level) {
          break;
        } else if (currentNode.level === level) {
          siblings.push(currentNode);
        }
        i++;
      }
    }
    i = center - 1;
    /**
     * siblings to the left
     */
    if (i > 0) {
      while (this.dataNodes[i]) {
        currentNode = this.dataNodes[i];
        if (currentNode.level < level) {
          break;
        } else if (currentNode.level === level) {
          siblings.push(currentNode);
        }
        i--;
      }
    }
    return siblings;
  }
  /**
   * Obtiene los hijos de un nodo plano
   * @param node nodo plano padre
   * @returns
   */
  getChilds(node: Nodo): Nodo[] {
    const parentLevel = this.getLevel(node);
    /**
     * start index
     */
    let currentIndex = this.dataNodes.indexOf(node) + 1;
    let currentNode = this.dataNodes[currentIndex - 1] ?? null;

    if (!currentNode) {
      return [];
    }
    const children: Nodo[] = [];
    let currentLevel: number;
    const length = this.dataNodes.length;
    for (let i = currentIndex; i < length; i++) {
      currentNode = this.dataNodes[i];
      currentLevel = this.getLevel(currentNode);
      if (currentLevel <= parentLevel) {
        break;
      } else if (this.getLevel(currentNode) !== parentLevel + 1) {
        continue;
      }

      children.push(currentNode);
    }
    return children;
  }

  /**
   * Aplica 'func' en cada asciendente directo de un nodo
   * @param node nodo base
   * @param func función a aplicar en cada nodo
   * @param minLevel nivel minimo hasta el que se itera
   * @param nodeIds conjunto de id's para evitar iterar los mismos nodos varias veces
   * @returns
   */
  applyDirectAscendants(
    node: Nodo,
    func: (node: Nodo) => void,
    minLevel = 0,
    nodeIds?: Set<number>
  ): void {
    let currentLevel = this.getLevel(node);
    if (currentLevel <= minLevel) {
      func(node);
      nodeIds?.add(node.id);
      return;
    }
    const startIndex = this.dataNodes.indexOf(node) - 1;
    let currentNode: Nodo;

    for (let i = startIndex; i >= 0; i--) {
      currentNode = this.dataNodes[i];
      if (currentLevel > this.getLevel(currentNode)) {
        /**
         * La jerarquia del nodo a expandir ya fue expandida
         */
        if (nodeIds && nodeIds.has(currentNode.id)) {
          break;
        }
        func(currentNode);
        currentLevel = this.getLevel(currentNode);
        nodeIds?.add(currentNode.id);
      }

      if (currentLevel == minLevel) {
        break;
      }
    }
  }

  /**
   * Expande cada uno de los hijos de un nodo
   * @param node nodo padre
   */
  expandChildren(node: Nodo) {
    const children = this.getChilds(node);
    children.forEach((child) => this.expand(child));
  }

  /**
   * Expande hijos hasta que tengan más de un hijo
   * @param node nodo
   */
  expandNode(node: Nodo) {
    /**
     * Expande el nodo seleccionado
     */
    this.expand(node);
    /**
     * Collapsa a los hermanos si estos estan expandidos
     */
    this.getSiblings(node).forEach((n) => {
      if (this.isExpanded(n)) {
        this.collapse(n);
      }
    });

    /**
     * ahora, revisa si tiene hijo único
     * y extiende su descendencia siempre y cuando solo tengan un hijo cada uno
     */
    let children: Nodo[] = this.getChilds(node);
    while (children.length === 1) {
      this.expand(children[0]);
      children = this.getChilds(children[0]);
    }
  }

  collapseNode(node: Nodo) {
    /**
     * Collapsa el nodo seleccionado
     */
    this.collapse(node);
    /**
     * ahora, revisa si el papa del nodo tiene un solo hijo,
     * y collapsa la ascendencia siempre y cuando solo tengan un hijo cada uno
     */
    let currentLevel = node.level;
    const startIndex = this.dataNodes.indexOf(node) - 1;
    let currentNode: Nodo;

    for (let i = startIndex; i >= 0; i--) {
      currentNode = this.dataNodes[i];
      /**
       * Es ascendencia
       */
      if (currentLevel > currentNode.level) {
        let children = this.getChilds(currentNode);
        if (children.length !== 1) {
          break;
        }
        /**
         * Si solo tiene un hijo, lo colapsa
         */
        this.collapse(currentNode);
      }
      if (currentLevel > currentNode.level) {
        currentLevel = currentNode.level;
      }
    }
  }
}
