import { Transaction } from 'src/app/model/transaction';


export class AddTransaction {
    static readonly type = '[Todo] Add';

    public constructor(public payload: Transaction) {}
}

