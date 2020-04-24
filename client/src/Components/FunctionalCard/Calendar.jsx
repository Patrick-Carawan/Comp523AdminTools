import { MuiPickersUtilsProvider } from "@material-ui/pickers";

// pick a date util library
import DateFnsUtils from "@date-io/date-fns";
import React, { Fragment, useState } from "react";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import DataSelector from "./DataSelector";

const StaticDatePicker = () => {
  const [date, changeDate] = useState(new Date());

  // prettier-ignore
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          autoOk
          orientation="landscape"
          variant="static"
          openTo="date"
          value={date}
          onChange={changeDate}
        />
      </MuiPickersUtilsProvider>
      </div>
    );
};

export default StaticDatePicker;
