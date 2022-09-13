import connection from '../models/connection';
import ProductModel from '../models/products.model';
import Product from '../interfaces/product.interface';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.model.getAll();
    return result;
  }

  public async create(product: Product): Promise<Product> {
    const result = await this.model.create(product);
    return result;
  }
}

export default ProductService;
