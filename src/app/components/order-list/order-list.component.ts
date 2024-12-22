import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-orders',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class OrdersComponent implements OnInit {
  pedidos: any[] = []; 
  orderPaginacao: any[] = [];
  paginaAtual: number = 1; 
  totalPaginas: number = 0; 
  itensPorPagina: number = 3; 

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.pedidos = this.orderService.getPedidos();
    this.totalPaginas = Math.ceil(this.pedidos.length / this.itensPorPagina);
    this.atualizaPaginacao();
  }

  atualizaPaginacao(): void {
    const startIndex = (this.paginaAtual - 1) * this.itensPorPagina;
    const endIndex = startIndex + this.itensPorPagina;
    this.orderPaginacao = this.pedidos.slice(startIndex, endIndex);
  }
  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizaPaginacao();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizaPaginacao();
    }
  }
}
