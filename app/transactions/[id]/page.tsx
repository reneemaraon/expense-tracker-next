import React, { ReactNode, Suspense } from "react";
import { LabelIcon, NoteIcon, TimeIcon } from "@/assets/Icons";
import { createClient } from "@/utils/supabase/server";
import capitalizeString from "@/lib/capitalize";
import DeleteTransaction from "@/components/TransactionDetail/DeleteTransaction";
import EditTransactionButton from "@/components/TransactionDetail/EditTransaction";
import GoBackButton from "@/components/common/GoBackButton";

interface DetailBoxProps {
  children: ReactNode;
}

type Params = Promise<{ id: string }>;

interface TransactionDetailProps {
  params: Params;
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

const TransactionDetail = async ({ params }: TransactionDetailProps) => {
  const supabase = await createClient();

  const id = (await params).id;

  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  //   console.log(transaction);
  const date = new Date(transaction?.date);
  var options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="relative h-screen w-full center-col gap-24 py-16">
      <GoBackButton />
      <div className="center-col gap-10 w-full">
        <div className="center-col gap-8">
          <p className="text-xl leading-[120%] font-bold">Transaction Detail</p>
          <div className="w-full center-col gap-2">
            <div className="w-[280px] px-4 bg-white h-[72px] rounded-full flex items-center">
              <p className="text-lg">$</p>

              <div className="text-[44px] bg-white w-full text-center focus:outline-none focus:placeholder-transparent bg-transparent font-semibold">
                <Suspense fallback={<p>Loading...</p>}>
                  {transaction.amount}
                </Suspense>
              </div>
            </div>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
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
          </Suspense>
        </div>
        <div className="center-col gap-5 w-full">
          <EditTransactionButton id={id} />
          <DeleteTransaction id={id} />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
