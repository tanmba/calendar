import React, { useCallback, useState } from "react";
import { Box, Modal, TextField } from "@mui/material";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import {setMinutes, setHours} from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events: any[] | (() => any[]) = [];

const newEventProps = {
  title: "",
  start: new Date(),
  end: new Date(),
  buyer: "",
  vendor: ""
}

function App() {
  const [newEvent, setNewEvent] = useState(newEventProps);
  const [allEvents, setAllEvents] = useState(events);
  const [now, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [viewEvent, setViewEvent] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [myEvents, setEvents] = useState(events)
  
  //Open the popup on click on the calendar
  const handleSelectSlot = useCallback(
    ({ start, end, title, buyer, vendor }: any) => {
      handleOpen()
      setViewEvent(false);
      setEvents((prev: any) => [...prev, { start, end, title, buyer, vendor }])
    },
    [setEvents]
  )

  //Show information for the selected event
  const handleSelectEvent = useCallback(
    () => {
      setViewEvent(true);
      handleOpen();
    },
    []
  )

  //Add event function
  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
    handleClose()
  }

  //Delete event function
  const deleteEvent = (event: any) => {
    const idx = allEvents.indexOf(event)
    const events = [...allEvents]
    events.splice(idx, 1);
    handleClose();
    setAllEvents(events);
  }

  //Event modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  //Text field container style
  const textFieldContainerStyle = {
    width: '100%', 
    display: 'flex', 
    justifyContent: 'space-between',
    marginBottom: '2rem'
  }

  return (
    <div className="App">
      <Box component="h1" sx={{ textAlign: "center" }}>Calendar</Box>
      <Calendar 
        localizer={localizer} 
        events={allEvents} 
        startAccessor="start" 
        endAccessor="end" 
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        timeslots={1}
        step={15}
        min={setHours(setMinutes(new Date(), 0), 9)}
        max={setHours(setMinutes(new Date(), 0), 18)}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!viewEvent ? (
            <React.Fragment>
              <Box component="h2" sx={{ textAlign: "center" }}>Add event</Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  sx={{ width: '100%', marginBottom: '2rem'}}
                  id="outlined-basic" 
                  label="Event name" 
                  variant="outlined"
                  value={newEvent.title} 
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <Box sx={textFieldContainerStyle}>
                  <TextField
                    sx={{ width: '47%'}}
                    id="outlined-basic" 
                    label="Vendor" 
                    variant="outlined"
                    value={newEvent.vendor}
                    onChange={(e) => setNewEvent({ ...newEvent, vendor: e.target.value })}
                  />
                  <TextField
                    sx={{ width: '47%'}}
                    id="outlined-basic" 
                    label="Buyer" 
                    variant="outlined"
                    value={newEvent.buyer}
                    onChange={(e) => setNewEvent({ ...newEvent, buyer: e.target.value })}
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
                      selected={newEvent.start} 
                      onChange={(start: Date) => setNewEvent({ ...newEvent, start })} 
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
                      selected={newEvent.end} 
                      onChange={(end: Date) => setNewEvent({ ...newEvent, end })} 
                    />
                  </Box>
                </Box>
              </Box>
              <Box component="button" sx={{ marginTop: "10px" }} onClick={handleAddEvent}>
                Add Event
              </Box>
            </React.Fragment>
          ) : (
            <Box>
              <Box component="h2" sx={{ textAlign: "center" }}>Event</Box>
              <p>Title: {newEvent.title}</p>
              <p>Buyer: {newEvent.buyer}</p>
              <p>Vendor: {newEvent.vendor}</p>
              <Box component="button" sx={{ marginTop: "10px" }} onClick={deleteEvent}>
                Delete Event
              </Box>
            </Box>
          )
          }
        </Box>
      </Modal>
    </div>
  );
}

export default App;
