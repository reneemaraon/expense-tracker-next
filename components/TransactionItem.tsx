import formatDateTime from "@/utils/formatDate";
import {
  Utensils,
  Store,
  PlaneTakeoff,
  ReceiptText,
  Banknote,
  HandCoins,
  Receipt,
  ChartCandlestick,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";
import { redirect } from "next/navigation";
import Link from "next/link";

type CategoryType =
  | "food"
  | "shopping"
  | "travel"
  | "bills"
  | "other"
  | "salary"
  | "allowance"
  | "investment";

const CATEGORY_ICONS: Record<CategoryType, JSX.Element> = {
  food: <Utensils />,
  shopping: <Store />,
  travel: <PlaneTakeoff />,
  bills: <ReceiptText />,
  salary: <HandCoins />,
  allowance: <Receipt />,
  investment: <ChartCandlestick />,
  other: <Banknote />,
};

const CATEGORY_GRADIENTS: Record<CategoryType, string> = {
  food: "from-[#EE2395] to-[#6206B7]",
  shopping: "from-[#FADD5B] to-[#F5AB20]",
  travel: "from-[#CA9EF9] to-[#4222C5]",
  bills: "from-[#72F46B] to-[#189B31]",
  salary: "from-[#1A5899] to-[#091D33]",
  allowance: "from-[#8B1643] to-[#330919]",
  investment: "from-[#60E45E] to-[#0F690E]",
  other: "from-[#19EAF9] to-[#1A5899]",
};

const defaultIcon = <Banknote />;

interface TransactionItemProps {
  category: CategoryType;
  amount: number;
  date: Date;
  id: string;
}

const TransactionItem = ({
  category,
  amount,
  date,
  id,
}: TransactionItemProps) => {
  const validDate =
    date instanceof Date && !isNaN(date.getTime()) ? date : new Date();

  const redirectToDetail = () => {
    redirect(`/transactions/${id}`);
  };

  return (
    <Link
      href={`/transactions/${id}`}
      className="cursor-pointer w-full bg-white rounded-lg px-5 py-4 flex justify-between"
    >
      <div className="w-full gap-3 flex items-center">
        <div
          className={`w-[50px] h-[50px] rounded-full bg-gradient-to-b ${CATEGORY_GRADIENTS[category]} flex items-center text-white fill-white justify-center`}
        >
          {CATEGORY_ICONS[category] || defaultIcon}
        </div>
        <p className="text-base leading-[100%]">
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str: string) => str.toUpperCase())}
        </p>
      </div>
      <div className="flex text-nowrap flex-col gap-1.5 items-end">
        <p>
          {amount < 0 ? "-" : ""}${Math.abs(amount || 0).toFixed(2)}
        </p>
        <p className="text-light-gray-text">{formatDateTime(validDate)}</p>
      </div>
    </Link>
  );
};

export default TransactionItem;
