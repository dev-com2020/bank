import { BankAccount } from './bank-account';
import { TransactionSort } from './transaction-sort.enum';
import { TransactionType } from './transaction-type.enum';

export class Transaction {
    public constructor(
        private readonly _account: BankAccount,
        private readonly _amount: number,
        private readonly _date: number,
        private readonly _type = TransactionType.OnlineTransfer,
        private readonly _sort = TransactionSort.Outcoming
    ) {}
    
    public get account(): BankAccount {
        return this._account;
    }
    
    public get amount(): number {
        let amount = this._amount;
        if (this.sort === TransactionSort.Outcoming) {
            amount = 0 - this._amount;
        }
        return amount;
    }
    
    public get date(): number {
        return this._date;
    }
    
    public get type(): TransactionType {
        return this._type;
    }

    public get sort(): TransactionSort {
        return this._sort;
    }
}