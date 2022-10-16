import React, { ChangeEventHandler, MouseEventHandler, SyntheticEvent } from "react";
import { Box, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import {setMinutes, setHours} from "date-fns";

interface EventFormProps {
  /**
   * Event title.
   */
  title?: string;
  /**
   * Event vendor info.
   */
  vendor?: string;
  /**
   * Event buyer info.
   */
  buyer?: string;
  /**
   * Event start date.
   */
  start?: Date;
  /**
   * Event end date.
   */
  end?: Date;
  /**
   * On form title change function.
   */
  onTitleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * On form vendor change function.
   */
  onVendorChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * On form buyer change function.
   */
  onBuyerChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * On form start date change function.
   */
  onStartChange?: any;
  /**
   * On form end date change function.
   */
  onEndChange?: any;
  /**
   * Add event function.
   */
  addEvent?: MouseEventHandler<HTMLButtonElement>;
}

const EventForm = ({
  title, 
  vendor, 
  buyer, 
  start, 
  end, 
  onTitleChange, 
  onBuyerChange, 
  onVendorChange, 
  onStartChange, 
  onEndChange, 
  addEvent}: EventFormProps) => {

  const now = new Date();

  //Text field container style
  const textFieldContainerStyle = {
    width: '100%', 
    display: 'flex', 
    justifyContent: 'space-between',
    marginBottom: '2rem'
  }

  return (
    <React.Fragment>
      <Box component="h2" sx={{ textAlign: "center" }}>Add event</Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          sx={{ width: '100%', marginBottom: '2rem'}}
          id="outlined-basic" 
          label="Event name" 
          variant="outlined"
          value={title} 
          onChange={onTitleChange}
        />
        <Box sx={textFieldContainerStyle}>
          <TextField
            sx={{ width: '47%'}}
            id="outlined-basic" 
            label="Vendor" 
            variant="outlined"
            value={vendor}
            onChange={onVendorChange}
          />
          <TextField
            sx={{ width: '47%'}}
            id="outlined-basic" 
            label="Buyer" 
            variant="outlined"
            value={buyer}
            onChange={onBuyerChange}
          />
        </Box>
        <Box sx={textFieldContainerStyle}>
          <Box>
            <Box sx={{ marginBottom: "0.5rem" }}>From</Box>
            <DatePicker
              dateFormat="MM/d/yyyy h:mm aa"
              customInput={<TextField />}
              timeIntervals={15} 
              minDate={now}
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 0), 18)}
              showTimeSelect
              placeholderText="Start Date" 
              selected={start} 
              onChange={onStartChange} 
            />
          </Box>
          <Box>
            <Box sx={{ marginBottom: "0.5rem" }}>To</Box>
            <DatePicker
              dateFormat="MM/d/yyyy h:mm aa"
              customInput={<TextField />}
              timeIntervals={15} 
              minDate={now}
              minTime={setHours(setMinutes(new Date(), 0), 9)}
              maxTime={setHours(setMinutes(new Date(), 0), 18)} 
              showTimeSelect 
              placeholderText="End Date" 
              selected={end} 
              onChange={onEndChange} 
            />
          </Box>
        </Box>
      </Box>
      <Box component="button" sx={{ marginTop: "10px" }} onClick={addEvent}>
        Add Event
      </Box>
    </React.Fragment>
  )
}

export default EventForm;