import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart[] = [];
  userName: string = '';
  totalPrice: number = 0;

  constructor() {}

  getCart() {
    return this.cart;
  }

  addToCart(product: Cart) {
    const existingProduct = this.cart.find((item) => item.id === product.id);
    if (!existingProduct) {
      this.cart.push(product);
      alert(product.name + ' added to cart');
      return this.cart;
    } else {
      this.totalPrice = existingProduct.quantity += product.quantity;
      alert(product.name + ' quantity updated in cart');
      return this.cart;
    }
  }

  removeProduct(id: number) {
    this.cart = this.cart.filter((x) => x.id != id);
    alert('Product removed from cart');
    return this.cart;
  }

  updateQuantity(id: number, updatedQuantity: number) {
    const index = this.cart.findIndex((x) => x.id == id);
    this.cart[index].quantity = updatedQuantity;
    return this.cart;
  }

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
  }

  calculateTotal() {
    this.cart.forEach((product) => {
      this.totalPrice += product.price * product.quantity;
    });
    return this.totalPrice;
  }

  emptyCart() {
    this.cart = [];
  }
}
