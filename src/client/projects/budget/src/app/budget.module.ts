import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BudgetAllComponent } from './components/budget-all/budget-all.component';
import { Routes, RouterModule } from '@angular/router';
import { BudgetSectionComponent } from './components/budget-section/budget-section.component';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MatMenuModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DeepCopyService, ConfirmDialogComponent } from 'common';

const routes: Routes = [
  { path: '', component: BudgetAllComponent },
  { path: 'budget', component: BudgetAllComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BudgetAllComponent,
    BudgetSectionComponent
  ],
  imports: [
    
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule, // TODO: change to a better supported provider
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [DeepCopyService],
  entryComponents: [ConfirmDialogComponent]
})
export class BudgetModule { }
