"use client";

import TextInput from "@/components/common/TextInput";
import { useState } from "react";

import { LabelIcon, NoteIcon } from "@/assets/Icons";
import CustomButton from "@/components/common/Button";
import SelectInput from "@/components/common/SelectInput";
import { DateTimePicker } from "@/components/AddExpense/TimeSelect";
import { addTransaction } from "@/actions/transactions/actions";

interface CategoryOption {
  name: string;
  value: string;
}

export interface AddTransactionData {
  note: string;
  category: string;
  date: Date;
  amount: number;
}

const CATEGORIES = [
  { name: "Food", value: "food" },
  { name: "Shopping", value: "shopping" },
  { name: "Travel", value: "travel" },
  { name: "Bills", value: "bills" },
  { name: "Other", value: "other" },
];

const AddTransaction = () => {
  const [value, setValue] = useState<string>("");
  const [category, setCategory] = useState<CategoryOption>({
    name: "",
    value: "",
  });
  const [note, setNote] = useState<string>("");
  const [time, setTime] = useState(new Date());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Replace non-numeric characters except '.' with an empty string
    const inputValue = e.target.value.replace(/[^0-9.]/g, "");
    setValue(inputValue);
  };

  const handleSubmit = () => {
    const formData = {
      note,
      date: time,
      category: category.value,
      amount: -value,
    };
    addTransaction(formData);
  };

  return (
    <div className="h-screen w-full center-col gap-24 py-16">
      <div className="center-col gap-10 w-full">
        <div className="center-col gap-8">
          <p className="text-xl leading-[120%] font-bold">Add Expense</p>
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
        </div>
        <div className="w-full max-w-[400px] center-col gap-5">
          <SelectInput
            icon
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
            onValueChange={setNote}
          >
            <NoteIcon />
          </TextInput>
          <DateTimePicker date={time} setDate={setTime} />
        </div>
      </div>
      <CustomButton onClick={handleSubmit}>SAVE</CustomButton>
    </div>
  );
};

export default AddTransaction;
