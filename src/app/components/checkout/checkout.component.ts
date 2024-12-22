import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { NgxMaskDirective, provideNgxMask  } from 'ngx-mask';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    MatCardModule, 
    MatIconModule,  
    CommonModule, 
    ReactiveFormsModule,
    NgxMaskDirective,
    
  ],
  providers: [
    provideNgxMask()
  ]

})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  itensCarrinho: any[] = [];
  valorTotal: number = 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ), 
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\(\d{2}\)\s9\d{4}-\d{4})$/), 
        ],
      ],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-?\d{3}$/)]],
      address: ['', Validators.required],
      number: ['', Validators.required],
      complement: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });

    this.cartService.itensCarrinho$.subscribe((items) => {
      this.itensCarrinho = items;
      this.valorTotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });
  }

  formataTelefone(): void {
    const phone = this.checkoutForm.get('phone')?.value;
    if (phone && phone.length === 11) {
      const formatted = `(${phone.substring(0, 2)}) ${phone.substring(
        2,
        7
      )}-${phone.substring(7)}`;
      this.checkoutForm.get('phone')?.setValue(formatted);
    }
  }

  buscaCep(): void {
    const cep = this.checkoutForm.get('cep')?.value;
    if (cep && /^\d{5}-?\d{3}$/.test(cep)) {
      this.http
        .get<any>(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`)
        .subscribe(
          (data) => {
            if (data.erro) {
              this.snackBar.open('CEP não encontrado.', '', {
                duration: 3000,
                panelClass: 'snack-bar-error',
              });
            } else {
              this.checkoutForm.patchValue({
                address: data.logradouro,
                city: data.localidade,
                state: data.uf,
              });
              this.checkoutForm.get('cep')?.setErrors(null);
            }
          },
          () => {
            this.snackBar.open('Erro ao buscar CEP.', '', {
              duration: 3000,
              panelClass: 'snack-bar-error',
            });
          }
        );
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', '', {
        duration: 3000, 
        horizontalPosition: 'center', 
        verticalPosition: 'top', 
        panelClass: ['snack-bar-error'], 
      });
      this.checkoutForm.markAllAsTouched();
      return;
    }
  
    const orderDetails = {
      customer: this.checkoutForm.value,
      items: this.itensCarrinho,
      total: this.valorTotal,
    };
  
    this.orderService.adicionarPedido(orderDetails);
  
    this.snackBar.open('Pedido finalizado com sucesso!', '', {
      duration: 3000,
      panelClass: 'snack-bar-success',
    });
  
    this.checkoutForm.reset();
    this.cartService.limparCarrinho();
  }
  
}
