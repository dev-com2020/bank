import { GetTransactions } from '../actions/getTransactions';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { TransactionRepositoryService } from '../../database';
import { AddTransaction } from '../actions/addTransaction';
import { FilterTransactions } from '../actions/filterTransactions';
import { MatTableDataSource } from '@angular/material/table';

export class TransactionStateModel {
    Transactions: Transaction[];
}

@Injectable()
@State<TransactionStateModel>({
    name: 'Transactions',
    defaults: {
        Transactions: [],
    }
})
export class TransactionStateService {

    constructor(private readonly transactionRepositoryService: TransactionRepositoryService) {
    }

    @Selector()
    static getTransactionList(state: TransactionStateModel): Transaction[] {
        return state.Transactions;
    }

    @Action(GetTransactions)
    // tslint:disable-next-line:typedef
    getTransactions({ getState, setState }: StateContext<TransactionStateModel>) {
        const state = getState();
        const transactions = this.transactionRepositoryService.fetchTransactions();
        return setState({
            ...state,
            Transactions: transactions,
        });
    }

    @Action(AddTransaction)
    // tslint:disable-next-line:typedef
    addTransaction({ getState, patchState }: StateContext<TransactionStateModel>, { payload }: AddTransaction) {
        const newTransaction = this.transactionRepositoryService.addTransaction(payload);
        const state = getState();
        // Should emit filter transaction after adding new one (corner case)
        return patchState({
            Transactions: [...state.Transactions, newTransaction]
        });
    }

    @Action(FilterTransactions)
    // tslint:disable-next-line:typedef
    filterTransaction({ getState, setState }: StateContext<TransactionStateModel>, { payload }: FilterTransactions) {
        const state = getState();
        const transactions = this.transactionRepositoryService.fetchTransactions();
        const dataSource = new MatTableDataSource(transactions);
        dataSource.filter = payload.trim().toLowerCase();
        return setState({
            ...state,
            Transactions: dataSource.filteredData,
        });
    }
}

