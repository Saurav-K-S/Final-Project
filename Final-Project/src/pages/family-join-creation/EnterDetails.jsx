import React, { useState } from "react";
import TextField from "../../components/TextField";
import Heading from "../../components/Heading";
import SubmitButton from "../../components/SubmitButton";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function EnterDetails(props) {
  
  const [value, setValue] = useState(dayjs('2022-05-17'));
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <Heading head={"Welcome " + props.name} />
      <div className="ml-12">
        <TextField head="Father's name" value="text" func={props.fatherFunc} />
        <div className="ml-6 mt-6">

        <LocalizationProvider dateAdapter={AdapterDayjs}>


          <DatePicker
          className="w-[375px] font-IBM-Plex-Mono"
          sx={{'& MuiTextField-root': {
            border:"black",
            fontFamily:"Algerian"
          }}}
            label="Basic date picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            views={['year', 'month', 'day']}
            />

        </LocalizationProvider>
            </div>
        <TextField head="Occupation" value="text" func={props.occupationFunc} />
      </div>
      <SubmitButton action="Continue" />
    </div>
  );
}
