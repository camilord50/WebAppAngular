import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../services/customer.service';
import { Employee } from '../../models/employee';
import { Product } from '../../models/product';
import { Shipper } from '../../models/shipper';
import { switchMap, of } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-order-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule  
  ],
  templateUrl: './new-order-dialog.component.html',
  styleUrls: ['./new-order-dialog.component.scss']
})
export class NewOrderDialogComponent implements OnInit {
  customerName: string;
  custId: number;
  employees: Employee[] = [];
  products: Product[] = [];
  shippers: Shipper[] = [];

  form = this.fb.group({
    empId: [null, Validators.required],
    shipperId: [null, Validators.required],
    shipName: ['', Validators.required],
    shipAddress: ['', Validators.required],
    shipCity: ['', Validators.required],
    orderDate: [new Date(), Validators.required],
    requiredDate: [null, Validators.required],
    shippedDate: [null],
    freight: [0, [Validators.required, Validators.min(0)]],
    shipCountry: ['', Validators.required],
    productId: [null, Validators.required],
    unitPrice: [0, [Validators.required, Validators.min(0)]],
    qty: [1, [Validators.required, Validators.min(1)]],
    discount: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewOrderDialogComponent>,
    private svc: CustomerService,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.customerName = data.customerName;
    this.custId = data.custId;
  }

  ngOnInit(){
    this.svc.getEmployees().subscribe(e => this.employees = e);
    this.svc.getProducts().subscribe(p => this.products = p);
    this.svc.getShippers().subscribe(s => this.shippers = s);
  }

  save(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    const finalCustId = this.custId;
    if (!finalCustId) {
      alert('No se pudo resolver custId para el cliente.');
      return;
    }

    const payload = {
      custId: finalCustId,
      empId: this.form.value.empId,
      shipperId: this.form.value.shipperId,
      shipName: this.form.value.shipName,
      shipAddress: this.form.value.shipAddress,
      shipCity: this.form.value.shipCity,
      orderDate: this.toIso(this.form.value.orderDate),
      requiredDate: this.toIso(this.form.value.requiredDate),
      shippedDate: this.form.value.shippedDate ? this.toIso(this.form.value.shippedDate) : null,
      freight: +(this.form.value.freight ?? 0),
      shipCountry: this.form.value.shipCountry,
      productId: this.form.value.productId,
      unitPrice: +(this.form.value.unitPrice ?? 0),
      qty: +(this.form.value.qty ?? 0),
      discount: +(this.form.value.discount ?? 0)
    };

    this.svc.postOrder(payload).subscribe({
      next: (res: any) => {
        this.snack.open(`Orden creada exitosamente. ID: ${res.orderId}`, 'Cerrar', {
          duration: 4000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.dialogRef.close('saved');
      },
      error: err => {
        console.error(err);
        alert('Error creando orden');
      }
    });
  }


  toIso(d: any) {
    if (!d) return null;
    const dt = (d instanceof Date) ? d : new Date(d);
    return dt.toISOString();
  }

  close(){ this.dialogRef.close(); }
}
