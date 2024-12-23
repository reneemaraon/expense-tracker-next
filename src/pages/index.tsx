import { Cog } from "@/assets/Icons";
import "../app/globals.css";
import ExpenseSummary from "@/components/Expense/ExpenseSummary";
import TransactionList from "@/components/Expense/TransactionList";

const Home = () => {
  return (
    <div className="w-full min-h-screen font-inter center-col bg-darker-bg leading-[100%]">
      <div className="gap-8 px-7 py-7 max-w-[800px] h-screen w-full bg-white-bg center-col">
        <div className="w-full flex">
          <div className="w-full gap-3 flex items-center">
            <div className="bg-yellow-500 w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <p className="text-xs leading-[100%] text-light-gray-text font-bold">
                Welcome!
              </p>
              <p className="text-base leading-[100%] text-dark-text font-bold">
                John Smith
              </p>
            </div>
          </div>
          <div className="w-9 h-9 center-col justify-center rounded-lg bg-white">
            <div className="w-5 h-5 text-light-gray-text icon">
              <Cog />
            </div>
          </div>
        </div>
        <ExpenseSummary />
        <TransactionList />
      </div>
    </div>
  );
};

export default Home;
