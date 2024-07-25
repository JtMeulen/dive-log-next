"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./InputDatePicker.module.css";

export default function InputDatePicker({
  label,
  name,
  defaultValue,
  withTime = false,
  maxDate,
  ...rest
}) {
  const [date, setDate] = useState(defaultValue || "");

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <DatePicker
        onChange={(date) => setDate(date)}
        selected={date ? new Date(date) : ""}
        showMonthDropdown
        showYearDropdown
        showTimeInput={withTime}
        showIcon
        dropdownMode="select"
        dateFormat={withTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'}
        className={styles.input}
        calendarClassName={styles.calendar}
        popperClassName={styles.popup}
        popperPlacement="bottom-start"
        showPopperArrow={false}
        maxDate={maxDate}
      />

      <input
        {...rest}
        name={name}
        id={name}
        type="hidden"
        value={date}
        className={styles.hiddenInput}
      />
    </div>
  );
}
