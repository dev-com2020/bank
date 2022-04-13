import { Inject, Injectable } from '@angular/core';
import { BankAccount } from '../model/bank-account';
import { IDatabaseConnetion, ITransactionEntity } from '../modules/database';

@Injectable({
  providedIn: 'root'
})
export class AccountFactoryService {
  private friendlyAccounts = new Map<string, BankAccount>();

  public getFriendlyAccount(name: string, accountNumber?: string, img?: string): BankAccount {
    if (!this.friendlyAccounts.has(name)) {
      const account = new BankAccount(name, accountNumber, img);
      this.friendlyAccounts.set(account.name, account);
    }
    return this.friendlyAccounts.get(name);
  }

}
