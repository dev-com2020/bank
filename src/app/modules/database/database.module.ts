import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseConnetion } from './database-connection';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: 'IDatabaseConnetion', useClass: DatabaseConnetion },
  ]
})
export class DatabaseModule { }
