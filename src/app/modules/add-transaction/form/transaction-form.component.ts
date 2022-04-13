import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChildActivationStart } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/model/transaction';
import { AccountFactoryService } from 'src/app/services/account-factory.service';
import { UserService } from 'src/app/services/user.service';
import { AddTransaction } from '../../state-resolver';
import { ConfirmationDialogComponent } from '../confirmation/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {
  public transactionForm: FormGroup;
  private formSubscription: Subscription = new Subscription();

  // To consider if AccountFactoryService should be in component service. I don't
  // do it for simplicity.
  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public userService: UserService,
    private readonly accountFactory: AccountFactoryService) {
    this.createForm();
  }

  public createForm(): void {
    this.transactionForm = this.fb.group({
      fromAccount: [this.userService.saldo],
      toAccount: ['', Validators.required],
      amount: [undefined, Validators.required]
    });
  }

  public onSubmit(): void {
    const currentDate = 25554;
    const account = this.accountFactory.getFriendlyAccount(this.transactionForm.value.toAccount);
    const transaction = new Transaction(account, this.transactionForm.value.amount, currentDate);
    // TODO: check memory leak
    this.formSubscription.add(
      this.openDialog(transaction)
    );
  }

  private clearForm(): void {
    this.transactionForm.controls.toAccount.reset();
    this.transactionForm.controls.amount.reset();
  }

  private openDialog(transaction: Transaction): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: transaction });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clearForm();
      }
    });
  }

}
