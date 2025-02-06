import { DownArrow, UpArrow } from "@/assets/Icons";
import { createClient } from "@/utils/supabase/server";

interface ExpenseDetails {
  value: number;
  text: string;
}

const ExpenseItem = ({ value, text }: ExpenseDetails) => {
  if (value == 0) {
    return <></>;
  }

  return (
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
};

const ExpenseSummary = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase.rpc("get_user_transaction_summary", {
    input_user_id: user?.id,
  });

  if (error) {
    console.error("Error fetching transaction summary:", error);
    return null;
  }

  console.log(data[0]);

  return (
    <div className="w-full max-w-[400px] center-col gap-7 px-5 py-8 rounded-[30px] main-gradient">
      <div className="text-white center-col gap-2.5">
        <p className="text-base">Total Balance</p>
        <p className="w-full text-nowrap text-[40px] leading-[100%] text-white font-bold">
          {data[0] &&
            `${data[0].total_balance < 0 ? "-" : ""}$${Math.abs(
              data[0].total_balance || 0
            ).toFixed(2)}`}
        </p>
      </div>
      <div className="w-full flex flex-wrap justify-between">
        <ExpenseItem value={data[0] && data[0].total_income} text="Income" />
        <ExpenseItem value={data[0] && data[0].total_expense} text="Expense" />
      </div>
    </div>
  );
};

export default ExpenseSummary;
