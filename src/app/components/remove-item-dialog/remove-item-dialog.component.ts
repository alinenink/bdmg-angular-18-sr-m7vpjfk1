import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-remove-item-dialog',
  templateUrl: './remove-item-dialog.component.html',
  styleUrls: ['./remove-item-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    CommonModule
  ],
})
export class removerItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<removerItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onRemove(): void {
    this.cartService.removerTodosItens(this.data.item.id);
    this.dialogRef.close(true);
  }
}
