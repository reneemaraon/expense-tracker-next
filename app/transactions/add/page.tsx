"use client";

import TextInput from "@/components/common/TextInput";
import { Suspense, useState } from "react";

import { LabelIcon, NoteIcon } from "@/assets/Icons";
import CustomButton from "@/components/common/Button";
import SelectInput from "@/components/common/SelectInput";
import { DateTimePicker } from "@/components/AddExpense/TimeSelect";
import { addTransaction } from "@/actions/transactions/actions";
import { useSearchParams } from "next/navigation";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "@/lib/constants";
import { AddTransactionData } from "@/lib/interface";
import TransactionDetailLoading from "../[id]/loading";

interface CategoryOption {
  name: string;
  value: string;
}

const AddTransaction = () => {
  const [value, setValue] = useState<string>("");
  const [category, setCategory] = useState<CategoryOption>({
    name: "",
    value: "",
  });
  const [note, setNote] = useState<string>("");
  const [time, setTime] = useState(new Date());
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const transactionTypeString =
    String(type).charAt(0).toUpperCase() + String(type).slice(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const CATEGORIES = type == "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!value || parseFloat(value) == 0) {
      newErrors.amount = "Amount cannot be 0.";
    }

    if (!category.value) {
      newErrors.category = "Please select a category.";
    }

    if (note.length > 100) {
      newErrors.note = "Note cannot exceed 100 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9.]/g, "");
    setValue(inputValue);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }

    const formData: AddTransactionData = {
      note,
      date: time,
      category: category.value,
      amount: type == "income" ? parseFloat(value) : -parseFloat(value),
    };

    addTransaction(formData);
  };

  return (
    <Suspense fallback={<TransactionDetailLoading />}>
      <div className="h-screen w-full center-col gap-24 py-16">
        <div className="center-col gap-10 w-full">
          <div className="center-col gap-8">
            <p className="text-xl leading-[120%] font-bold">
              Add {transactionTypeString}
            </p>
            <div className="w-full center-col gap-2">
              <div className="w-[280px] px-4 bg-white h-[72px] rounded-full flex items-center">
                <p className="text-lg">$</p>
                <input
                  type="text"
                  value={value}
                  onChange={handleInputChange}
                  className="text-[44px] bg-white w-full text-center focus:outline-none focus:placeholder-transparent bg-transparent font-semibold"
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>
          </div>
          <div className="w-full max-w-[400px] center-col gap-5">
            <SelectInput
              icon
              error={errors.category}
              placeholder="Category"
              value={category}
              options={CATEGORIES.map((categoryOption) => ({
                text: categoryOption.name,
                onSelect: () => setCategory(categoryOption),
                selected: category.value == categoryOption.value,
              }))}
            >
              <LabelIcon />
            </SelectInput>

            <TextInput
              value={note}
              placeholder="Note"
              icon={true}
              error={errors.note}
              onValueChange={setNote}
            >
              <NoteIcon />
            </TextInput>

            <DateTimePicker
              date={time}
              setDate={(date) => date && setTime(date)}
            />
          </div>
        </div>
        <CustomButton onClick={handleSubmit}>SAVE</CustomButton>
      </div>
    </Suspense>
  );
};

export default AddTransaction;
