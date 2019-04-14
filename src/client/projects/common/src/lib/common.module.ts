import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent]
})
export class CommonModule { }
