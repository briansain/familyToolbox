import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Upload2Component } from '../upload2/upload2.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'transactions2', component: Upload2Component }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Upload2Component],
  exports: [
    Upload2Component
  ]
})
export class Transactions2Module { }
