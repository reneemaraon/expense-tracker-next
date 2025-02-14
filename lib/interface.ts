export interface Transaction {
  id: number;
  user_id: string;
  title: string;
  amount: number;
  category: string;
  note: string;
  date: Date;
}
