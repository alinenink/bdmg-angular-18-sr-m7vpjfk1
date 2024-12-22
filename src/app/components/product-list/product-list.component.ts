import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  produtos: any[] = [];

  constructor(private productService: ProductService, private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.onLoad();
  }

  /** Busca os produtos a serem listados */
  onLoad() {
    this.productService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  /** Adiciona os produtos ao carrinho e exibe alerta de sucesso para cada produto adicionado */
  adicionarCarrinho(product: any): void {
    this.cartService.adicionarItem(product);
    this.snackBar.open('Produto adicionado ao carrinho!', '', {
      duration: 3000, 
      horizontalPosition: 'center', 
      verticalPosition: 'top', 
      panelClass: ['snack-bar-success'], 
  });
  }

  /** Remove itens do carrinho quando a quantidade chegar a 1 */
  removerCarrinho(product: any): void {
    this.cartService.removerItem(product);
  }

  /** Atualiza a quantidade de itens adicionados */
  quantidadeItensFinal(product: any): number {
    return this.cartService.quantidadeItensFinal(product.id);
  }
}
