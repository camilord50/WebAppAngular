import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerService } from '../../services/customer.service';
import { Prediction } from '../../models/prediction';
import { debounceTime } from 'rxjs/operators';
import { OrdersDialogComponent } from '../orders-dialog/orders-dialog.component';
import { NewOrderDialogComponent } from '../new-order-dialog/new-order-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-predictions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.scss']
})
export class PredictionsComponent implements OnInit {
  displayedColumns = ['customerName','lastOrderDate','nextPredictedOrder','actions'];
  dataSource = new MatTableDataSource<Prediction>([]);
  total = 0;

  page = 1;
  pageSize = 10;

  search = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;

  constructor(private svc: CustomerService, private dialog: MatDialog) {}

  ngOnInit(){
    this.search.valueChanges.pipe(debounceTime(400)).subscribe(() => {
      this.page = 1;
      this.loadData();
    });
    this.loadData();
  }

  loadData(){
    this.loading = true;
    this.svc.getPredictions(
        this.page,
        this.pageSize,
        undefined,  
        undefined, 
        this.search.value || ''
      )
      .subscribe(res => {
        this.dataSource.data = res.items;
        this.total = res.total;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }, err => { console.error(err); this.loading = false; });
  }

  onPage(e: PageEvent){
    this.page = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.loadData();
  }

  viewOrders(customerName: string){
    this.dialog.open(OrdersDialogComponent, { 
      width: '900px', 
      data: { customerName } 
    });
  }

  newOrder(row: Prediction){
    const ref = this.dialog.open(NewOrderDialogComponent, { 
      width: '800px', 
      data: { 
        customerName: row.customerName, 
        custId: row.custId 
      } 
    });
    ref.afterClosed().subscribe(result => { if (result === 'saved') this.loadData(); });
  }
}
