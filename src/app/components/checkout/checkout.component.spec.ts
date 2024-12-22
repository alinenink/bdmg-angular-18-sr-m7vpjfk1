import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartService: jasmine.SpyObj<CartService>;
  let orderService: jasmine.SpyObj<OrderService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    TestBed.resetTestingModule();
  
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['limparCarrinho'], { itensCarrinho$: of([]) });
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['adicionarPedido']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  
    await TestBed.configureTestingModule({
      imports: [
        CheckoutComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: CartService, useValue: cartServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  
    component.ngOnInit(); 
  });
  

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the checkout form on ngOnInit', () => {
    expect(component.checkoutForm).toBeDefined();
    expect(component.checkoutForm.controls['name']).toBeDefined();
    expect(component.checkoutForm.controls['email']).toBeDefined();
  });

  it('should format phone number correctly', () => {
    component.checkoutForm.controls['phone'].setValue('11987654321');
    component.formataTelefone();
    expect(component.checkoutForm.controls['phone'].value).toEqual('(11) 98765-4321');
  });

  it('should fetch address data based on CEP', () => {
    const mockResponse = {
      logradouro: 'Rua Teste',
      localidade: 'Cidade Teste',
      uf: 'SP',
    };
    spyOn(component['http'], 'get').and.returnValue(of(mockResponse));

    component.checkoutForm.controls['cep'].setValue('12345-678');
    component.buscaCep();

    expect(component.checkoutForm.controls['address'].value).toEqual('Rua Teste');
    expect(component.checkoutForm.controls['city'].value).toEqual('Cidade Teste');
    expect(component.checkoutForm.controls['state'].value).toEqual('SP');
  });


  it('should validate form and call services on valid submit', () => {
    component.checkoutForm.setValue({
      name: 'Test User',
      email: 'test@example.com',
      phone: '(11) 98765-4321',
      cep: '12345-678',
      address: 'Rua Teste',
      number: '123',
      complement: '',
      city: 'Cidade Teste',
      state: 'SP',
    });

    component.itensCarrinho = [
      { name: 'Produto 1', price: 10, quantity: 2 },
    ];
    component.valorTotal = 20;

    component.onSubmit();

    expect(orderService.adicionarPedido).toHaveBeenCalledWith({
      customer: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '(11) 98765-4321',
        cep: '12345-678',
        address: 'Rua Teste',
        number: '123',
        complement: '',
        city: 'Cidade Teste',
        state: 'SP',
      },
      items: [
        { name: 'Produto 1', price: 10, quantity: 2 },
      ],
      total: 20,
    });

    expect(snackBar.open).toHaveBeenCalledWith(
      'Pedido finalizado com sucesso!',
      '',
      jasmine.any(Object)
    );
  });

  it('should show an error when the form is invalid on submit', () => {
    component.checkoutForm.controls['name'].setValue('');
    component.onSubmit();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Por favor, preencha todos os campos obrigatórios.',
      '',
      jasmine.any(Object)
    );
  });
});
