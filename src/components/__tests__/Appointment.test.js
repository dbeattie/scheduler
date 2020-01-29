import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment";

describe("Appointment", () => {
  //A redundant test that was never asked to be removed
  it("renders appointment", () => {
    render(<Appointment />);
  });
});