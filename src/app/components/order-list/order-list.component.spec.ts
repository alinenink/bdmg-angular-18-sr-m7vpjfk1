import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersComponent } from './order-list.component';
import { OrderService } from '../../services/order.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let orderService: jasmine.SpyObj<OrderService>;

  beforeEach(async () => {
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['getPedidos']);

    await TestBed.configureTestingModule({
      imports: [OrdersComponent, MatCardModule, MatButtonModule, CommonModule],
      providers: [
        { provide: OrderService, useValue: orderServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize orders and pagination on ngOnInit', () => {
    const mockOrders = [
      { id: 1, item: 'Item 1' },
      { id: 2, item: 'Item 2' },
      { id: 3, item: 'Item 3' },
      { id: 4, item: 'Item 4' },
    ];
    orderService.getPedidos.and.returnValue(mockOrders);

    component.ngOnInit();

    expect(component.pedidos).toEqual(mockOrders);
    expect(component.totalPaginas).toBe(2);
    expect(component.orderPaginacao.length).toBe(3);
    expect(component.orderPaginacao).toEqual(mockOrders.slice(0, 3));
  });

  it('should update orderPaginacao when paginaAtual changes', () => {
    const mockOrders = [
      { id: 1, item: 'Item 1' },
      { id: 2, item: 'Item 2' },
      { id: 3, item: 'Item 3' },
      { id: 4, item: 'Item 4' },
    ];
    orderService.getPedidos.and.returnValue(mockOrders);

    component.ngOnInit();
    component.paginaAtual = 2;
    component.atualizaPaginacao();

    expect(component.orderPaginacao).toEqual(mockOrders.slice(3, 4));
  });

  it('should navigate to the previous page', () => {
    component.paginaAtual = 2;
    spyOn(component, 'atualizaPaginacao');

    component.paginaAnterior();

    expect(component.paginaAtual).toBe(1);
    expect(component.atualizaPaginacao).toHaveBeenCalled();
  });

  it('should not navigate to the previous page if already on the first page', () => {
    component.paginaAtual = 1;
    spyOn(component, 'atualizaPaginacao');

    component.paginaAnterior();

    expect(component.paginaAtual).toBe(1);
    expect(component.atualizaPaginacao).not.toHaveBeenCalled();
  });

  it('should navigate to the next page', () => {
    component.paginaAtual = 1;
    component.totalPaginas = 2;
    spyOn(component, 'atualizaPaginacao');

    component.proximaPagina();

    expect(component.paginaAtual).toBe(2);
    expect(component.atualizaPaginacao).toHaveBeenCalled();
  });

  it('should not navigate to the next page if already on the last page', () => {
    component.paginaAtual = 2;
    component.totalPaginas = 2;
    spyOn(component, 'atualizaPaginacao');

    component.proximaPagina();

    expect(component.paginaAtual).toBe(2);
    expect(component.atualizaPaginacao).not.toHaveBeenCalled();
  });
});
