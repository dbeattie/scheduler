import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment";

describe("Appointment", () => {
  //REDUNDANT TEST THAT NEEDS TO BE REMOVED AT SOME POINT
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});