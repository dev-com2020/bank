import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StateResolverModule } from './modules/state-resolver';
import { ShowTransactionsModule } from './modules/show-transactions';
import { AddTransactionModule } from './modules/add-transaction';

@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [
      BrowserModule,
      StateResolverModule,
      AddTransactionModule,
      ShowTransactionsModule,
      ReactiveFormsModule,
      AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
