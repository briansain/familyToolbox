import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UploadComponent } from './upload/upload.component'
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatTableModule,
} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component'
import { UploadService } from './upload.service'
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component'
import { TransactionService } from './transaction.service'

const routes: Routes = [
  { path: 'transactions', component: UploadComponent }
]

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatTableModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadComponent, DialogComponent, TransactionListComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent],
  providers: [UploadService, TransactionService]
})
export class TransactionsModule { }
