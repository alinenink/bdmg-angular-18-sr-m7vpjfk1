import { ComponentFixture, TestBed } from '@angular/core/testing';
import { removerItemDialogComponent } from './remove-item-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('removerItemDialogComponent', () => {
  let component: removerItemDialogComponent;
  let fixture: ComponentFixture<removerItemDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<removerItemDialogComponent>>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['removerTodosItens']);

    await TestBed.configureTestingModule({
      imports: [removerItemDialogComponent, MatDialogModule, MatButtonModule, CommonModule, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { item: { id: 1, name: 'Test Item' } } },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(removerItemDialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<removerItemDialogComponent>>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog without action on cancel', () => {
    component.onCancel();
    expect(dialogRef.close).toHaveBeenCalledWith();
  });

  it('should remove item and close dialog with true on confirm', () => {
    component.onRemove();
    expect(cartService.removerTodosItens).toHaveBeenCalledWith(1);
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should receive the correct item data from MAT_DIALOG_DATA', () => {
    expect(component.data).toEqual({ item: { id: 1, name: 'Test Item' } });
  });
});
