export interface Order {
  id: number;
  table_id: number;
  customer_name?: string;
  order_time: Date;
  status: 'pending' | 'served' | 'cancelled';
}