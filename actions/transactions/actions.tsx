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

export async function editTransaction(transaction: Transaction) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("transactions")
    .update({ task: transaction.task })
    .eq("id", transaction.id)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteTransaction(id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteCompletedTransactions() {
  const supabase = createClient();

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("is_complete", true);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteAllTransactions() {
  const supabase = createClient();

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
