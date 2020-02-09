import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { MatTableDataSource, MatTab, MatSort } from '@angular/material';

@Component({
  selector: 'ft-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  chartData = [];
  transactions: Transaction[] = [];
  columnsToDisplay = ['postedDate', 'description', 'debit', 'budgetCategory'];
  finishedCalculatingChart = false;
  dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    var dateRange = new Date(2020, 0, 13);//new Date(Date.now());
    this.transactionService.getTransactions(dateRange).subscribe(result => {
      this.transactions = result;
      this.dataSource = new MatTableDataSource(this.transactions);
      this.dataSource.sort = this.sort;
      this.calculateChartValues()
    });
  }

  //only here because of loan payoffs
  shouldSkipTransaction(transaction: Transaction): boolean {
    var descriptionsToSkip = ['ACH DISCOVER', 'chase', 'BANKCARD', 'COMENITY', 'CARDMEMBER SERV'];
    var found = false;
    descriptionsToSkip.forEach(element => {
      if (!found && transaction.originalDescription.toLowerCase().includes(element.toLowerCase())){
        found = true;
      }
    });

    return found;
  }

  calculateChartValues() {
    this.transactions.forEach(transaction => {
      let skip = this.shouldSkipTransaction(transaction);
      if (!skip) {
        var index = this.chartData.findIndex(value => {
          return value.name == transaction.budgetCategory;
        });
        if (index == -1) {
          this.chartData.push({
            name: transaction.budgetCategory,
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
    this.dataSource.filter = input.name;
    
    this.transactions.forEach(transaction => {
      if(transaction.budgetCategory == input.name) {
        if (!this.shouldSkipTransaction(transaction)) {
          console.log(transaction);
        }
      }
    });
  }

  clearFilter() {
    this.dataSource.filter = null;
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
