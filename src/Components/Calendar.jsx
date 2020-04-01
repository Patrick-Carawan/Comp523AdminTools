import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// pick a date util library
import DateFnsUtils from "@date-io/date-fns";
import React, { Fragment, useState } from "react";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

function InlineDatePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          variant="inline"
          label="Basic example"
          value={selectedDate}
          onChange={handleDateChange}
        />

        <DatePicker
          disableToolbar
          variant="inline"
          label="Only calendar"
          helperText="No year selection"
          value={selectedDate}
          onChange={handleDateChange}
        />

        <KeyboardDatePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          label="With keyboard"
          format="MM/dd/yyyy"
          value={selectedDate}
          InputAdornmentProps={{ position: "start" }}
          onChange={date => handleDateChange(date)}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
}

export default InlineDatePickerDemo;
