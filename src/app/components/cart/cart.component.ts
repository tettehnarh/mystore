import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { userInfo } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Cart[] = [];
  totalPrice: number = 0;

  user: userInfo = <userInfo>{};

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotal();
  }

  calculateTotal(newQuantity?: number) {
    this.totalPrice = 0;
    this.cart.forEach((product) => {
      this.totalPrice += product.price * product.quantity;
    });
  }
  removeProduct(id: number) {
    this.cart = this.cartService.removeProduct(id);
    this.calculateTotal();
  }

  onSubmit() {
    this.cartService.setUserName(this.user.fullName);
    this.router.navigate(['/confirmation']);
  }
}
