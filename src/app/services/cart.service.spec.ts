import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    const item = { id: 1, name: 'Product 1', price: 10 };

    service.adicionarItem(item);

    service.itensCarrinho$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0]).toEqual({ ...item, quantity: 1 });
    });
  });

  it('should increment quantity if the item already exists', () => {
    const item = { id: 1, name: 'Product 1', price: 10 };

    service.adicionarItem(item);
    service.adicionarItem(item);

    service.itensCarrinho$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(2);
    });
  });

  it('should decrement quantity if the item exists and quantity > 1', () => {
    const item = { id: 1, name: 'Product 1', price: 10 };

    service.adicionarItem(item);
    service.adicionarItem(item);
    service.removerItem(item);

    service.itensCarrinho$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(1);
    });
  });

  it('should remove the item completely if quantity is 1', () => {
    const item = { id: 1, name: 'Product 1', price: 10 };

    service.adicionarItem(item);
    service.removerItem(item);

    service.itensCarrinho$.subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });

  it('should return the correct cart count', () => {
    const item1 = { id: 1, name: 'Product 1', price: 10 };
    const item2 = { id: 2, name: 'Product 2', price: 15 };

    service.adicionarItem(item1);
    service.adicionarItem(item1);
    service.adicionarItem(item2);

    expect(service.quantidadeCarrinho()).toBe(3);
  });

  it('should return the correct quantity of an item', () => {
    const item1 = { id: 1, name: 'Product 1', price: 10 };
    const item2 = { id: 2, name: 'Product 2', price: 15 };

    service.adicionarItem(item1);
    service.adicionarItem(item1);
    service.adicionarItem(item2);

    expect(service.quantidadeItensFinal(1)).toBe(2);
    expect(service.quantidadeItensFinal(2)).toBe(1);
    expect(service.quantidadeItensFinal(3)).toBe(0);
  });

  it('should clear the cart', () => {
    const item = { id: 1, name: 'Product 1', price: 10 };

    service.adicionarItem(item);
    service.limparCarrinho();

    service.itensCarrinho$.subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });

  it('should calculate the total price', () => {
    const item1 = { id: 1, name: 'Product 1', price: 10 };
    const item2 = { id: 2, name: 'Product 2', price: 15 };

    service.adicionarItem(item1);
    service.adicionarItem(item1);
    service.adicionarItem(item2);

    expect(service.calculaValorTotal()).toBe(35);
  });

  it('should remove an item completely by ID', () => {
    const item1 = { id: 1, name: 'Product 1', price: 10 };
    const item2 = { id: 2, name: 'Product 2', price: 15 };

    service.adicionarItem(item1);
    service.adicionarItem(item2);

    service.removerTodosItens(1);

    service.itensCarrinho$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0]).toEqual({ ...item2, quantity: 1 });
    });
  });
});
