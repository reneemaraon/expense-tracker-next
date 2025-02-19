import React from "react";
import EditTransaction from "@/components/EditTransaction/EditTransaction";
import { createClient } from "@/utils/supabase/server";

interface EditTransactionProps {
  id: string;
}
const EditTransactionWrapper = async ({ id }: EditTransactionProps) => {
  const supabase = await createClient();

  const { data: transaction } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  return <EditTransaction transaction={transaction} />;
};

export default EditTransactionWrapper;
