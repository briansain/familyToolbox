import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DeepCopyService } from './services/deep-copy.service';

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [
    ConfirmDialogComponent
  ]
})
export class CommonModule { }
