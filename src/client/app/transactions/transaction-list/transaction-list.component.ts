import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'ft-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  chartData = [];
  transactions: Transaction[] = [];
  columnsToDisplay = ['postedDate', 'description', 'debit', 'budgetCategory', 'rowActions'];
  finishedCalculatingChart = false;
  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    var dateRange = new Date(2020, 0, 13);//new Date(Date.now());
    this.transactionService.getTransactions(dateRange).subscribe(result => {
      this.transactions = result;
      this.calculateChartValues()
    });
  }

  calculateChartValues() {
    var descriptionsToSkip = ['ACH DISCOVER', 'chase', 'BANKCARD', 'COMENITY', 'CARDMEMBER SERV'];
    this.transactions.forEach(transaction => {
      let found = false;
      descriptionsToSkip.forEach(element => {
        if (!found && transaction.originalDescription.toLowerCase().includes(element.toLowerCase())){
          found = true;
        }
      });
      if (!found) {
        var name = transaction.budgetCategory ? transaction.budgetCategory : "Other";
        var index = this.chartData.findIndex(value => {
          return value.name == name;
        });
        if (index == -1) {
          this.chartData.push({
            name: name,
            value: transaction.debit
          });
        } else {
          this.chartData[index].value += transaction.debit;
        }
      }
    });
    console.log(this.chartData);
    this.finishedCalculatingChart = true;
  }

  logCategory(input: any){
    console.log(input);
    var nameToMatch = input.name === "Other" ? null : input.name;
    var descriptionsToSkip = ['ACH DISCOVER', 'chase', 'BANKCARD', 'COMENITY', 'CARDMEMBER SERV'];
    
    this.transactions.forEach(transaction => {
      if(transaction.budgetCategory == nameToMatch) {
        let found = false;
        descriptionsToSkip.forEach(element => {
          if (!found && transaction.originalDescription.toLowerCase().includes(element.toLowerCase())){
            found = true;
          }
        });
        if (!found) {
          console.log(transaction);
        }
      }
    });
  }
}

export interface Transaction {
  calculatedValue: String,
  accountNumber: String,
  postedDate: Date,
  originalDescription: String,
  debit: Number,
  credit: Number,
  status: String,
  balance: Number,
  budgetCategory: String,
  description: String,
}
