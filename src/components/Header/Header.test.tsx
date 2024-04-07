import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the header with logo", () => {
    render(<Header />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByAltText("MedExpress logo")).toBeInTheDocument();
  });
});
