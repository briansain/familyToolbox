export class Budget {
  _id: string;
  title: string;
  paychecks: Paycheck[];
  month: Date;
  sections: BudgetSection[];
}

export class Paycheck {
  _id: string;
  source: string;
  amount: number;
  startDate: Date;
  endDate: Date;
}

export class BudgetSection {
  _id: string;
  sectionHeader: string;
  budgetItems: BudgetItem[];
}

export class BudgetItem {
  _id: string;
  itemHeader: string;
  notes: string;
  budgetAmounts: BudgetAmount[];
}

export class BudgetAmount {
  _id: string;
  amount: number;
  isPaid: boolean;
  isCash: boolean;
  isAutoPay: boolean;
}