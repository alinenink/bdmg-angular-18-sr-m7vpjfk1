import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an order', () => {
    const order = { id: 1, items: [{ name: 'Product 1', quantity: 2, price: 10 }] };

    service.adicionarPedido(order);

    service.orders$.subscribe((orders) => {
      expect(orders.length).toBe(1);
      expect(orders[0]).toEqual(order);
    });
  });

  it('should retrieve all orders', () => {
    const order1 = { id: 1, items: [{ name: 'Product 1', quantity: 2, price: 10 }] };
    const order2 = { id: 2, items: [{ name: 'Product 2', quantity: 1, price: 15 }] };

    service.adicionarPedido(order1);
    service.adicionarPedido(order2);

    const orders = service.getPedidos();
    expect(orders.length).toBe(2);
    expect(orders).toEqual([order1, order2]);
  });

  it('should return an empty array if no orders are added', () => {
    const orders = service.getPedidos();
    expect(orders.length).toBe(0);
  });
});
