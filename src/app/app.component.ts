import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HelloComponent } from './hello.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HelloComponent, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <div style="padding: 8px">
      <h1>Teste técnico</h1>
      <app-hello></app-hello>
    </div>

    <mat-toolbar class="custom-toolbar" color="primary">
      <mat-toolbar-row>
        <span>E-Commerce</span>
        <span class="spacer"></span>
        <nav>
          <a mat-button routerLink="/products">Products</a>
          <a mat-button routerLink="/cart">Cart</a>
          <a mat-button routerLink="/checkout">Checkout</a>
          <a mat-button routerLink="/orders">Orders</a>
        </nav>
      </mat-toolbar-row>
    </mat-toolbar>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
   .custom-toolbar {
      background-color: #1E88E5;
      color: white;
      margin-top: 16px;
    }
     
  .spacer {
    flex: 1 1 auto;
  }

  .content {
    padding: 24px;
  }

  nav a {
    color: white;
    text-decoration: none;
  }
`,
  ],
})
export class AppComponent {
  constructor() {}
}
