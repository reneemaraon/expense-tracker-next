import React, { Suspense } from "react";
import EditTransactionWrapper from "./EditTransactionWrapper";
import TransactionDetailLoading from "@/components/TransactionDetail/LoadingPage";

interface EditTransactionProps {
  params: {
    id: number;
  };
}
const EditTransactionPage = async ({ params }: EditTransactionProps) => {
  const id = (await params).id;

  return (
    <Suspense fallback={<TransactionDetailLoading />}>
      <EditTransactionWrapper id={id} />;
    </Suspense>
  );
};

export default EditTransactionPage;
