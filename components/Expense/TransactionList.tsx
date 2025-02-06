import { createClient } from "@/utils/supabase/server";
import TransactionItem from "../TransactionItem";

const TransactionList = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user?.id)
    .order("date", { ascending: false });

  return (
    <div className="max-w-[540px] flex flex-col w-full gap-6">
      <div className="w-full flex">
        <p className="w-full text-lg font-medium leading-[100%]">
          Transactions
        </p>
        <p className="text-sm leading-[100%] text-light-gray-text">Today</p>
      </div>
      <div className="w-full flex-col flex gap-5">
        {transactions?.map((transaction) => (
          <TransactionItem
            category={transaction.category}
            key={transaction.id}
            amount={transaction.amount}
            date={transaction.date}
            id={transaction.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
