import { Component, OnInit } from '@angular/core';
import { Section } from '../budget-section/budget-section.component';

@Component({
  selector: 'ft-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.css']
})
export class BudgetTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export interface Budget {
  title: string;
  paychecks: Paycheck[];
  month: Date;
  sections: Section[];
}

export interface Paycheck {
  source: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

/*
{
  "title": "Budget For May 2019",
  "paychecks": [
    {
      "source": "Job 1",
      "amount": 1800,
      "startDate": "2019-05-01T00:00:00.000",
      "endDate": "2019-05-14T00:00:00.000"
    },
    {
      "source": "Job 2",
      "amount": 1800,
      "startDate": "2019-05-15T00:00:00.000",
      "endDate": "2019-05-31T00:00:00.000"
    }
  ],
  "month": "2019-05-01T00:00:00.000Z",
}
*/