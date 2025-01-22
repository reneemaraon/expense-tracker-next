import { AddIcon, Cog } from "@/assets/Icons";

import ExpenseSummary from "@/components/Expense/ExpenseSummary";
import TransactionList from "@/components/Expense/TransactionList";
import TopMenu from "@/components/Home/TopMenu";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
    data,
  } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect("/login");
  }

  return (
    <div className="w-full center-col gap-8 relative">
      <div className="fixed object-center bottom-10">
        <Link
          href="/transactions/add"
          className="cursor-pointer  w-[60px] h-[60px] rounded-full main-gradient flex items-center justify-center"
        >
          <div className="w-10 h-10 stroke-[1.5px] text-white stroke-white fill-white">
            <AddIcon />
          </div>
        </Link>
      </div>
      <div className="w-full flex">
        <div className="w-full gap-3 flex items-center">
          <div className="bg-yellow-500 w-10 h-10 rounded-full overflow-hidden">
            <img
              src={user?.user_metadata.avatar_url || ""}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="text-xs leading-[100%] text-light-gray-text font-bold">
              Welcome!
            </p>
            <p className="text-base leading-[100%] text-dark-text font-bold">
              {user?.user_metadata.full_name}
            </p>
          </div>
        </div>
        <TopMenu />
      </div>
      <ExpenseSummary />
      <TransactionList />
    </div>
  );
}
