import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product = <Product>{};
  products: Product[] = [];
  quantity: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.product.id = data['id'];
    });
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.products = this.products.filter((x) => x.id == this.product.id);

      this.product.name = this.products[0].name;
      this.product.url = this.products[0].url;
      this.product.price = this.products[0].price;
      this.product.description = this.products[0].description;
    });
    this.quantity = 1;
  }

  onSubmit(): void {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      url: this.product.url,
      description: this.product.description,
      price: this.product.price,
      quantity: this.quantity
    });
  }
}
