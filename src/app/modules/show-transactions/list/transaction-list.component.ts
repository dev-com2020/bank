import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/model/transaction';
import { GetTransactions, TransactionStateService } from 'src/app/modules/state-resolver';
import { FilterTransactions } from '../../state-resolver/actions/filterTransactions';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  @Select(TransactionStateService.getTransactionList) transactions: Observable<Transaction[]>;
  public readonly columnTypes = ColumnType;
  public readonly displayedColumns: ColumnType[] = [ColumnType.Date, ColumnType.Logo,
  ColumnType.Beneficiary, ColumnType.Amount];
  public dataSource: MatTableDataSource<Observable<Transaction[]>>;

  public constructor(private store: Store) { }

  public ngOnInit() {
    this.dataSource = new MatTableDataSource([this.transactions]);
    this.store.dispatch(new GetTransactions());
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.store.dispatch(new FilterTransactions(filterValue));
  }
}

enum ColumnType {
  Date = 'date',
  Logo = 'logo',
  Beneficiary = 'beneficiary',
  Amount = 'amount'
}
