import { DownArrow, UpArrow } from "@/assets/Icons";

interface ExpenseDetails {
  value: number;
  text: string;
}

const ExpenseItem = ({ value, text }: ExpenseDetails) => (
  <div className="flex gap-3 items-center text-white">
    <div className="bg-white/20 flex items-center justify-center stroke-[1.5px] w-7 h-7 rounded-full">
      {value <= 0 ? (
        <div className=" stroke-[#FA3C41] w-3 h-3">
          <DownArrow />
        </div>
      ) : (
        <div className="stroke-[#60E45E] w-3 h-3">
          <UpArrow />
        </div>
      )}
    </div>
    <div className="flex-col flex gap-1.5">
      <p className="text-xs leading-[100%]">{text}</p>
      <p className="text-base font-bold leading-[100%]">{value.toFixed(2)}</p>
    </div>
  </div>
);

const ExpenseSummary = () => {
  return (
    <div className="w-full max-w-[400px] center-col gap-7 px-5 py-8 rounded-[30px] bg-gradient-to-br from-[#2DABE4] via-[#C966FE] to-[#FE8F5F]">
      <div className="text-white center-col gap-2.5">
        <p className="text-base">Total Balance</p>
        <p className="w-full text-nowrap text-[40px] leading-[100%] text-white font-bold">
          $ 4800.00
        </p>
      </div>
      <div className="w-full flex flex-wrap justify-between">
        <ExpenseItem value={2500} text="Income" />
        <ExpenseItem value={-800} text="Expense" />
      </div>
    </div>
  );
};

export default ExpenseSummary;
