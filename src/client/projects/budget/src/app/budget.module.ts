import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BudgetRoutingModule } from './budget-routing.module';
import { AppComponent } from './app.component';
import { BudgetAllComponent } from './budget-all/budget-all.component';

@NgModule({
  declarations: [
    AppComponent,
    BudgetAllComponent
  ],
  imports: [
    BrowserModule,
    BudgetRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BudgetAllComponent]
})
export class BudgetModule { }
