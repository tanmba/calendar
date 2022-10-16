import React, { useCallback, useState } from "react";
import { Box, Modal } from "@mui/material";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import {setMinutes, setHours} from "date-fns";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import EventForm from "./EventForm/EventForm";
import EventInfo from "./EventInfo/EventInfo";

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

const events: any[] | (() => unknown[]) = []

const newEventProps = {
  title: "",
  start: new Date(),
  end: new Date(),
  buyer: "",
  vendor: ""
}

const Agenda = () => {
  const [newEvent, setNewEvent] = useState(newEventProps);
  const [allEvents, setAllEvents] = useState(events);
  const [open, setOpen] = useState(false);
  const [viewEvent, setViewEvent] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [, setEvents] = useState(events)
  
  //Open the popup on click on the calendar
  const handleSelectSlot = useCallback(
    ({ start, end, title, buyer, vendor }: any) => {
      handleOpen()
      setViewEvent(false);
      setEvents((prev: unknown[]) => [...prev, { start, end, title, buyer, vendor }])
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
  const handleDeleteEvent = (event: unknown) => {
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

  return (
    <React.Fragment>
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
      >
        <Box sx={style}>
          {!viewEvent ? (
            <EventForm 
              title={newEvent.title} 
              vendor={newEvent.vendor} 
              buyer={newEvent.buyer} 
              start={newEvent.start} 
              end={newEvent.end} 
              onTitleChange={(e: { target: { value: string; }; }) => setNewEvent({ ...newEvent, title: e.target.value })} 
              onVendorChange={(e: { target: { value: string; }; }) => setNewEvent({ ...newEvent, vendor: e.target.value })} 
              onBuyerChange={(e: { target: { value: string; }; }) => setNewEvent({ ...newEvent, buyer: e.target.value })} 
              onStartChange={(start: Date) => setNewEvent({ ...newEvent, start })} 
              onEndChange={(end: Date) => setNewEvent({ ...newEvent, end })} 
              addEvent={handleAddEvent}              
            />
          ) : (
            <EventInfo 
              title={newEvent.title} 
              vendor={newEvent.vendor} 
              buyer={newEvent.buyer} 
              deleteEvent={handleDeleteEvent}           
            />
          )
          }
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default Agenda;
