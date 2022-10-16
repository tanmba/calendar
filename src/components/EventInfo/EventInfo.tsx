import React, { MouseEventHandler } from "react";
import { Box } from "@mui/material";

interface EventInfoProps {
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
   * Delete event function.
   */
  deleteEvent?: MouseEventHandler<HTMLButtonElement>;
}

const EventInfo = ({title, vendor, buyer, deleteEvent}: EventInfoProps) => {
  return (
    <React.Fragment>
      <Box component="h2" sx={{ textAlign: "center" }}>Event</Box>
      <p>Title: {title}</p>
      <p>Buyer: {buyer}</p>
      <p>Vendor: {vendor}</p>
      <Box component="button" sx={{ marginTop: "10px" }} onClick={deleteEvent}>
        Delete Event
      </Box>
    </React.Fragment>
  )
}

export default EventInfo;