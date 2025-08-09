export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  product_type: 'coffee' | 'pastry';
  image?: string; 
}
