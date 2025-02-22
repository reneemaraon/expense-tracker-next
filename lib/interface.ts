export interface Transaction {
  id: number;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  note: string;
  date: Date;
}

export interface AddTransactionData {
  note: string;
  category: string;
  date: Date;
  amount: number;
}
