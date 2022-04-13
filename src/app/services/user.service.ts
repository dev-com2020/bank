import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public saldo = 5824.76;

  public updateSaldo(amount: number): void {
    this.saldo -= amount;
  }

  public validateSaldo(amount: number): boolean {
      return this.saldo - amount > -500;
  }
}
