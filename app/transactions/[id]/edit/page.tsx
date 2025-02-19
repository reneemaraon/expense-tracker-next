import React, { Suspense } from "react";
import EditTransactionWrapper from "./EditTransactionWrapper";
import TransactionDetailLoading from "@/components/TransactionDetail/LoadingPage";

type Params = Promise<{ id: string }>;

const EditTransactionPage = async ({ params }: { params: Params }) => {
  const id = (await params).id;

  return (
    <Suspense fallback={<TransactionDetailLoading />}>
      <EditTransactionWrapper id={id} />;
    </Suspense>
  );
};

export default EditTransactionPage;
