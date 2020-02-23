import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BudgetAllComponent } from './components/budget-all/budget-all.component';
import { Routes, RouterModule } from '@angular/router';
import { BudgetSectionComponent } from './components/budget-section/budget-section.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [DeepCopyService],
  entryComponents: [ConfirmDialogComponent]
})
export class BudgetModule { }
