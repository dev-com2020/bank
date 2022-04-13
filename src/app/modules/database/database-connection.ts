import { ITransactionEntity } from '.';
import * as transactionsTable from './mock/transactions.json';

export interface IDatabaseConnetion {
    get(): ITransactionEntity[];
    create(transaction: ITransactionEntity);
}

export class DatabaseConnetion implements IDatabaseConnetion{
    public get(): ITransactionEntity[] {
        return transactionsTable.data;
    }

    public create(transaction: ITransactionEntity): boolean {
        // This is only a mock, so I'm not implementing this part. It depends on
        // the database layer architecture.
        return true;
    }
}