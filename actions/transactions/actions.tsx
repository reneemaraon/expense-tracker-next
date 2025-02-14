// actions/transactions/actions.tsx

"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Transaction } from "@/lib/interface";
import { AddTransactionData } from "@/app/transactions/add/page";

export async function addTransaction(formData: AddTransactionData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("transactions")
    .insert([
      {
        user_id: user?.id,
        category: formData.category,
        note: formData.note,
        amount: formData.amount,
        date: formData.date,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function editTransaction(transaction: any) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("transactions")
    .update(transaction)
    .eq("id", transaction.id)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  redirect(`/transactions/${transaction.id}`);
}

export async function deleteTransaction(id: number) {
  console.log("hi");
  const supabase = await createClient();

  const response = await supabase.from("transactions").delete().eq("id", id);
  console.log(response);

  if (response.error) {
    throw new Error(response.error.message);
  }

  redirect("/");
}

export async function deleteCompletedTransactions() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("is_complete", true);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function deleteAllTransactions() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("user_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}
