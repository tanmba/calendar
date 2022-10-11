import App from "./App";
import { render } from "@testing-library/react";

describe("App component", () => {
  it("renders App component correctly", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
