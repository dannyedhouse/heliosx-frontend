import { render, screen } from "@testing-library/react";

import { RadioField } from "./RadioField";

describe("RadioField Component", () => {
  it("renders radio button with label and checked if passed", () => {
    render(<RadioField fieldValue="Yes" checked={true} onChange={() => {}} />);

    const radioButton = screen.getByRole("radio", { name: "Yes" });
    expect(radioButton).toBeInTheDocument();
    expect(radioButton).toBeChecked();
  });
});
