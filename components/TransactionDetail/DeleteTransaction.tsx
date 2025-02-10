"use client";
import React from "react";
import CustomButton from "../common/Button";
import { deleteTransaction } from "@/actions/transactions/actions";

interface DeleteTransactionProps {
  id: number;
}

function DeleteTransaction({ id }: DeleteTransactionProps) {
  const handleDelete = () => {
    console.log("delete");
    deleteTransaction(id);
  };
  console.log(id);
  return (
    <CustomButton onClick={handleDelete} styleSet="dark">
      Delete
    </CustomButton>
  );
}

export default DeleteTransaction;
