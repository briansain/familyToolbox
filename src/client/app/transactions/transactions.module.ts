import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UploadComponent } from './upload/upload.component'
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatTableModule,
  MatIconModule,
} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component'
import { UploadService } from './upload.service'
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component'
import { TransactionService } from './transaction.service'
import { NgxChartsModule } from '@swimlane/ngx-charts';
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
    MatIconModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadComponent, DialogComponent, TransactionListComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent],
  providers: [UploadService, TransactionService]
})
export class TransactionsModule { }
