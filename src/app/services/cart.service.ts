import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itensCarrinhoSubject = new BehaviorSubject<any[]>([]);
  itensCarrinho$ = this.itensCarrinhoSubject.asObservable();

  constructor() {}

  adicionarItem(item: any): void {
    const currentItems = this.itensCarrinhoSubject.value;
    const existingItem = currentItems.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ ...item, quantity: 1 });
    }

    this.itensCarrinhoSubject.next([...currentItems]);
  }

  removerItem(item: any): void {
    const currentItems = this.itensCarrinhoSubject.value;
    const existingItem = currentItems.find((i) => i.id === item.id);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        this.itensCarrinhoSubject.next(
          currentItems.filter((i) => i.id !== item.id)
        );
        return;
      }
    }

    this.itensCarrinhoSubject.next([...currentItems]);
  }

  quantidadeCarrinho(): number {
    const currentItems = this.itensCarrinhoSubject.value;
    return currentItems.reduce((count, item) => count + item.quantity, 0);
  }

  quantidadeItensFinal(itemId: number): number {
    const currentItems = this.itensCarrinhoSubject.value;
    const item = currentItems.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  }

  limparCarrinho(): void {
    this.itensCarrinhoSubject.next([]);
  }

  calculaValorTotal(): number {
    const currentItems = this.itensCarrinhoSubject.value;
    return currentItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  removerTodosItens(itemId: number): void {
    const currentItems = this.itensCarrinhoSubject.value;
    const updatedItems = currentItems.filter((item) => item.id !== itemId);
    this.itensCarrinhoSubject.next(updatedItems);
  }
  
}
