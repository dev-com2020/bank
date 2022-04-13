import { Inject, Injectable } from '@angular/core';
import { BankAccount } from 'src/app/model/bank-account';
import { Transaction } from 'src/app/model/transaction';
import { TransactionType } from 'src/app/model/transaction-type.enum';
import { AccountFactoryService } from 'src/app/services/account-factory.service';
import { IDatabaseConnetion } from './database-connection';
import { ITransactionEntity } from './transaction-entity';

@Injectable({
    providedIn: 'root'
})
export class TransactionRepositoryService {
    public constructor(
        @Inject('IDatabaseConnetion') private readonly database: IDatabaseConnetion,
        private readonly accountFactory: AccountFactoryService
    ) {
    }

    public fetchTransactions(): Transaction[] {
        let entities: ITransactionEntity[] = [];

        try {
            entities = this.database.get();
        } catch (e) {
            console.error(e)
            // Handle error with getting the database
        }
        const transactions: Transaction[] = [];
        entities.forEach((entity) => {
            const account = this.accountFactory.getFriendlyAccount(
                entity.merchant.name, entity.merchant.accountNumber, ' LOGO ');

            transactions.push(new Transaction(
                account,
                entity?.transaction?.amountCurrency?.amount,
                entity?.dates?.valueDate,
                entity?.transaction?.type as TransactionType));
        });

        return transactions;
    }

    public addTransaction(payload: Transaction): Transaction {
        const entity = this.convertTransactionToEntity(payload);
        // Simulating success
        this.database.create(entity);
        return payload;
    }

    private convertTransactionToEntity(transaction: Transaction): ITransactionEntity {
        return {
            // This is only a mock. In requirements there is no information about storing new 
            // transactions in the database.
        }
    }
}


