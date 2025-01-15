"use client";

import * as React from "react";
import { add, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "@/components/ui/time-picker-demo";
import { TimeIcon } from "@/assets/Icons";

export function DateTimePicker({ date, setDate }) {
  /**
   * carry over the current time when a user clicks a new day
   * instead of resetting to 00:00
   */
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`border-transparent cursor-pointer border bg-white w-full max-w-[500px] rounded-lg h-14 px-6 py-1.5 items-center gap-5 flex`}
        >
          <div className={`w-5 text-light-gray-text`}>
            <TimeIcon />
          </div>
          <div className="leading-tight w-full">
            {date ? format(date, "PPP h:mm a") : <span>Pick a date</span>}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
