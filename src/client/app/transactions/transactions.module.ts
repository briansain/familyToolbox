import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UploadComponent } from './upload/upload.component'
import {
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component'
import { UploadService } from './upload.service'
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [
  { path: 'transactions', component: UploadComponent }
]

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadComponent, DialogComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent],
  providers: [UploadService]
})
export class TransactionsModule { }
