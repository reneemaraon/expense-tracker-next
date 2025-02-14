import React from "react";
import EditTransaction from "@/components/EditTransaction/EditTransaction";
import { createClient } from "@/utils/supabase/server";

interface EditTransactionProps {
  params: {
    id: number;
  };
}
const EditTransactionPage = async ({ params }: EditTransactionProps) => {
  const supabase = await createClient();
  const id = (await params).id;

  const { data: transaction } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  return <EditTransaction transaction={transaction} />;
};

export default EditTransactionPage;
