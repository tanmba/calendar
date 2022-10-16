import EventInfo from "./EventInfo";
import { render } from "@testing-library/react";

describe("Event info component", () => {
  it("renders Event info component correctly", () => {
    const { asFragment } = render(
      <EventInfo
        title="New meeting" 
        vendor="Loewe" 
        buyer="Alice"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});