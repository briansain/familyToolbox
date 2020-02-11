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
  colorScheme = {domain:[
    /* https://coolors.co/ee6352-59cd90-3fa7d6-c1cad6-d4adcf 
    '#EE6352',
    '#59CD90',
    '#3FA7D6',
    '#424B54',
    '#D4ADCF'
    */

    /* https://coolors.co/1b4079-9d8df1-ff8cc6-547aa5-2cf6b3
     '#9D8DF1',
   '#1B4079',
   '#FF8CC6',
   '#547AA5',
   '#2CF6B3'
    */


    /*https://www.design-seeds.com/spring-issue-no-2/rock-candy/
  '#A1CEAB',
  '#D2E5C5',
  '#4A8391',
  '#E5E5E3',
  '#ED908C'
*/

/*Liked https://www.design-seeds.com/edible-hues/culinary-color/fresh-hues-47/
    '#E87F4D',
    '#2F4A57',
    '#7BA6B4',
    '#3A5E48',
    //'#A5BFC5',
    //'#4F788D' */

    /* https://www.design-seeds.com/wander/wanderlust/a-door-hues-53/ 
    '#D9BD7D',
    '#2D83AC',
    '#323B40',
    '#73CDE3'*/

    /* REALLY LIKE https://www.design-seeds.com/seasons/summer/summer-sea/ */
    '#3B6271',
    '#3A76AE',
    '#5BB7DC',
    '#A0E9F2',
    '#D9F8F6'


    /* https://www.design-seeds.com/in-nature/creatures/feathered-hues-3/ 
    '#415771',
    '#40698E',
    '#6DB1C8',
    '#85C8CD',
*/




  ]};

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

    if (!found) {
      found = transaction.description.toLowerCase().includes('paypal') &&
        transaction.debit == 1000;
    }
    return found;
  }

  //TODO: order by max value so that colors are applied better
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
    this.chartData.sort((a, b) => {
      if (a.value < b.value) {
        return -1;
      }

      if (a.value > b.value) {
        return 1;
      }

      return 0;
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
