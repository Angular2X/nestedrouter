import { Component, OnInit, EventEmitter } from '@angular/core';

/**
 * 定义产品类型
 */
class Product {
  // Ts 中默认修饰符为 public （不同于其它强类型语言）
  sku :         string;
  name :        string;
  imageUrl :    string;
  department :  string[];
  price :       number;

  constructor(msku : string, mname : string, mimageUrl : string, mdepartment : string[],
              mprice : number){
    this.sku        = msku;
    this.name       = mname;
    this.imageUrl   = mimageUrl;
    this.department = mdepartment;
    this.price      = mprice;
  }
}


@Component({
  selector : 'product-image',
  host :     {class: 'ui small image'},
  inputs :   ['product'],
  template : `
    <img class="product-image" [src]="product.imageUrl">
  `
})
export class ProductImage implements OnInit {
  product : Product;

  constructor() {}

  ngOnInit() : void {
    console.log('ProductImage :: ngOnInit > Initialize component');
  }
}


/**
 * 商品类型组件
 */
@Component({
  selector  : 'product-department',
  inputs    : ['product'],
  template  : `
    <div class="product-department">
      <span *ngFor="let name of product.department; let i = index">
        <!--<a href="#">{{ name }}</a>-->
        <a [routerLink]="[i == 0 ? './community' : (i == 1 ? './feature' : './style')]">{{ name }}</a>
        <span>{{ i < (product.department.length - 1) ? '>' : '' }}</span>
      </span>
    </div>
  `
})
export class ProductDepartment implements OnInit {
  product : Product;

  constructor() {}

  ngOnInit() : void {
    console.log('ProductDepartment :: ngOInit > Initialize component');
  }
}

@Component({
  selector : 'price-display',
  inputs : ['price'],
  template : `
    <div class="price-display">\${{ price }}</div>
  `
})
export class PriceDisplay implements OnInit {
  price : number;

  constructor() {}

  ngOnInit() : void {
    console.log('PriceDisplay :: ngOnInit > Initialize component')
  }
}


@Component({
  selector : 'product-row',
  inputs : ['product'],
  host : {'class' : 'item'},
  template : `
    <product-image [product] = "product"></product-image>
    <div class="content">
      <div class="header">{{ product.name }}</div>
      <div class="meta">
        <div class="product-sku">SKU #{{ product.sku }}</div>
      </div>
      <div class="description">
        <product-department [product] = "product"></product-department>
      </div>
    </div>
    <price-display [price] = "product.price"></price-display>
  `
})
export class ProductRow implements OnInit {
  product : Product;

  constructor() {}

  ngOnInit() :void {
    console.log('ProductRow :: ngOnInit > Initialize component');
  }
}


@Component({
  selector : 'product-list',
  inputs: ['productList'],
  outputs : ['onProductSelected'],
  template : `
    <div class="ui items">
      <product-row
        *ngFor = "let mProduct of productList"
        [product] = "mProduct"
        (click) = 'clicked(mProduct)'
        [class.selected] = "isSelected(mProduct)"
      >
      </product-row>
    </div>
  `
})
export class ProductList implements OnInit {
  productList : Product[];

  onProductSelected : EventEmitter<Product>;

  private currentProduct : Product;

  constructor(){
    this.onProductSelected = new EventEmitter();
  }

  ngOnInit() : void {
    console.log('ProductList :: ngOnInit > Initialize component');
  }

  clicked(product : Product) : void {
    this.currentProduct = product;
    this.onProductSelected.emit(product);
  }

  isSelected(product : Product) : boolean {
    if(!product || !this.currentProduct){
      return false;
    }
    return product.sku === this.currentProduct.sku;
  }

}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[];

  constructor() {

    this.products = [
      new Product(
        'MYSHOES',
        'Black Running Shoes',
        'resources/images/products/black-shoes.jpg',
        ['Men', 'Shoes', 'Running Shoes'],
        109.99
      ),
      new Product(
        'NEATOJACKET',
        'Blue Jacket',
        'resources/images/products/blue-jacket.jpg',
        ['Women', 'Apparel', 'Jackets & Vests'],
        238.99
      ),
      new Product(
        'NICEHAT',
        'A Nice Black Hat',
        'resources/images/products/black-hat.jpg',
        ['Men', 'Accessories', 'Hats'],
        29.99
      )];
  }

  ngOnInit() : void {
    console.log('ListComponent :: ngOnInit > Initialize component');
  }

  productWasSelected(product: Product): void {
    console.log('Product clicked: ' + product);
  }

}
