import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() id: number = 0;
  @Input() url: string = '';
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() quantity: number = 0;
  @Output() removeProduct: EventEmitter<number> = new EventEmitter();
  @Output() calcTotal = new EventEmitter();

  constructor(private cartService: CartService) {}
  ngOnInit(): void {}

  checkRemove() {
    if (this.quantity <= 0) {
      this.removeProduct.emit(this.id);
    } else {
      this.cartService.updateQuantity(this.id, this.quantity);
      this.calcTotal.emit(this.quantity);
    }
  }
}
