import React from "react";
import EventForm from "./EventForm";
import { render } from "@testing-library/react";

describe("Event form component", () => {
  it("renders Event form component correctly", () => {
    const { asFragment } = render(<EventForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});