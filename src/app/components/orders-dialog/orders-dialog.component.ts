import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CustomerService } from '../../services/customer.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-orders-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTableModule],
  templateUrl: './orders-dialog.component.html',
  styleUrls: ['./orders-dialog.component.scss']
})
export class OrdersDialogComponent implements OnInit {
  customerName: string;
  orders: Order[] = [];
  displayedColumns = ['orderId','requiredDate','shippedDate','shipName','shipAddress','shipCity'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OrdersDialogComponent>,
    private svc: CustomerService) {
    this.customerName = data.customerName;
  }

  ngOnInit(){
    this.svc.getOrdersByCustomerName(this.customerName).subscribe(o => this.orders = o);
  }

  close(){ this.dialogRef.close(); }
}
