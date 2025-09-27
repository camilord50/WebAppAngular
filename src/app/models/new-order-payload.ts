export interface NewOrderPayload {
  custId: number;
  empId: number;
  shipperId: number;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  orderDate: string;
  requiredDate: string;
  shippedDate?: string | null;
  freight: number;
  shipCountry: string;
  productId: number;
  unitPrice: number;
  qty: number;
  discount: number;
}
