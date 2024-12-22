import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { removerItemDialogComponent } from '../remove-item-dialog/remove-item-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [ MatCardModule, 
    MatIconModule,  
    CommonModule,],
})
export class CartComponent implements OnInit {
  itensCarrinho: any[] = [];
  valorTotal = 0;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onLoad();
  }

  /** Carrega os itens do carrinho */
  onLoad() {
    this.cartService.itensCarrinho$.subscribe((items) => {
      this.itensCarrinho = items;
      this.atualizaValorTotal();
    });
  }

  /** Possibilita aumentar a quantidade de itens diretamente no carrinho */
  aumentaQuantidade(item: any): void {
    this.cartService.adicionarItem(item);
    this.snackBar.open('Quantidade aumentada!', '', {
      duration: 2000,
      panelClass: ['snack-bar-success'],
    });
  }

  /** Possibilita diminuir a quantidade de itens diretamente no carrinho */
  diminueQuantidade(item: any): void {
    this.cartService.removerItem(item);
    this.snackBar.open('Quantidade diminuída!', '', {
      duration: 2000,
      panelClass: ['snack-bar-success'],
    });
  }

  /** Modal de confirmação de exclusão de todos os itens da linha */
  confirmacaoExclusao(item: any): void {
    const dialogRef = this.dialog.open(removerItemDialogComponent, {
      data: { item },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.cartService.removerItem(item);
        this.snackBar.open('Item removido!', '', {
          duration: 2000,
          panelClass: ['snack-bar-success'],
        });
      }
    });
  }

  /** atualiza o valor total conforme for diminuindo ou aumentando a quantidade de itens do carrinho */
  atualizaValorTotal(): void {
    this.valorTotal = this.itensCarrinho.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  /** Botão redirecionar para o checkout */

  redirecionarCheckout(): void {
    this.router.navigate(['/checkout']); 
  }
}
