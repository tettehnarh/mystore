import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  userName: string = '';
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.userName = this.cartService.getUserName();
    this.totalPrice = this.cartService.calculateTotal();
    this.cartService.emptyCart();
  }
}
