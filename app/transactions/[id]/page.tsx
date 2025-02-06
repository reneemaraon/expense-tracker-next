import React, { ReactNode } from "react";
import { LabelIcon, NoteIcon, TimeIcon } from "@/assets/Icons";
import CustomButton from "@/components/common/Button";
// import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import capitalizeString from "@/lib/capitalize";

interface DetailBoxProps {
  children: ReactNode;
}

const DetailBox = ({ children }: DetailBoxProps) => (
  <div className="w-full">
    <div
      className={`
              bg-white w-full relative max-w-[500px] rounded-lg h-14 px-6 py-1.5 items-center gap-5 flex`}
    >
      {children}
    </div>
  </div>
);

const TransactionDetail = async ({ params }) => {
  const supabase = await createClient();

  //   const router = useRouter();
  const id = params.id;

  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  //   console.log(transaction);
  const date = new Date(transaction?.date);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="h-screen w-full center-col gap-24 py-16">
      <div className="center-col gap-10 w-full">
        <div className="center-col gap-8">
          <p className="text-xl leading-[120%] font-bold">Transaction Detail</p>
          <div className="w-full center-col gap-2">
            <div className="w-[280px] px-4 bg-white h-[72px] rounded-full flex items-center">
              <p className="text-lg">$</p>
              <div className="text-[44px] bg-white w-full text-center focus:outline-none focus:placeholder-transparent bg-transparent font-semibold">
                {transaction.amount}
              </div>
            </div>
          </div>
          <div className="w-full max-w-[400px] center-col gap-5">
            <DetailBox>
              <div className="w-5 text-light-gray-text">
                <LabelIcon />
              </div>
              {capitalizeString(transaction.category)}
            </DetailBox>
            <DetailBox>
              <div className="w-5 text-light-gray-text">
                <NoteIcon />
              </div>
              {transaction.note}
            </DetailBox>
            <DetailBox>
              <div className="w-5 text-light-gray-text">
                <TimeIcon />
              </div>
              {date.toLocaleDateString("en-US", options)}
            </DetailBox>
          </div>
        </div>
        <div className="center-col gap-5 w-full">
          <CustomButton>Edit</CustomButton>
          <CustomButton styleSet="dark">Delete</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
