import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let cartService: jasmine.SpyObj<CartService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProdutos']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['adicionarItem', 'removerItem', 'quantidadeItensFinal']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, MatCardModule, MatButtonModule, CommonModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on ngOnInit', () => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ];
    productService.getProdutos.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getProdutos).toHaveBeenCalled();
    expect(component.produtos).toEqual(mockProducts);
  });

  it('should add product to the cart and show a snackbar', () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 100 };

    component.adicionarCarrinho(mockProduct);

    expect(cartService.adicionarItem).toHaveBeenCalledWith(mockProduct);
    expect(snackBar.open).toHaveBeenCalledWith(
      'Produto adicionado ao carrinho!',
      '',
      jasmine.any(Object)
    );
  });

  it('should remove product from the cart', () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 100 };

    component.removerCarrinho(mockProduct);

    expect(cartService.removerItem).toHaveBeenCalledWith(mockProduct);
  });

  it('should return the quantity of an item in the cart', () => {
    const mockProduct = { id: 1, name: 'Product 1', price: 100 };
    cartService.quantidadeItensFinal.and.returnValue(2);

    const quantity = component.quantidadeItensFinal(mockProduct);

    expect(cartService.quantidadeItensFinal).toHaveBeenCalledWith(mockProduct.id);
    expect(quantity).toBe(2);
  });
});
