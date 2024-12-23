import TransactionItem from "../TransactionItem";

const transactions = [
  {
    id: 1,
    description: "Grocery Shopping",
    category: "Food",
    amount: 75.5,
    date: "2024-12-21",
    type: "Expense",
  },
  {
    id: 2,
    description: "Salary",
    category: "Income",
    amount: 2500.0,
    date: "2024-12-20",
    type: "Income",
  },
  {
    id: 3,
    description: "Electricity Bill",
    category: "Utilities",
    amount: 120.0,
    date: "2024-12-18",
    type: "Expense",
  },
];

const TransactionList = () => {
  return (
    <div className="max-w-[540px] flex flex-col w-full gap-6">
      <div className="w-full flex">
        <p className="w-full text-lg font-medium leading-[100%]">
          Transactions
        </p>
        <p className="text-sm leading-[100%] text-light-gray-text">Today</p>
      </div>
      <div className="w-full flex-col flex gap-5">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
