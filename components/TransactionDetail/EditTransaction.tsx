"use client";
import React from "react";
import CustomButton from "../common/Button";
import { useRouter } from "next/navigation";

interface EditTransactionProps {
  id: number;
}

function EditTransactionButton({ id }: EditTransactionProps) {
  const router = useRouter();

  console.log(id);
  return (
    <CustomButton onClick={() => router.push(`/transactions/${id}/edit`)}>
      Edit Transaction
    </CustomButton>
  );
}

export default EditTransactionButton;
