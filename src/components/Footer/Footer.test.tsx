import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  const mockUsefulLinks = [
    { text: "Dummy link 1", url: "https://www.google.com" },
    { text: "Dummy link 2", url: "https://www.google.com" },
  ];
  const mockContactLinks = [
    { text: "Dummy link 3", url: "https://www.google.com" },
    { text: "Dummy link 4", url: "https://www.google.com" },
  ];

  it("should render the footer and display the passed links in accessible way", () => {
    render(
      <Footer usefulLinks={mockUsefulLinks} contactLinks={mockContactLinks} />
    );

    expect(
      screen.getByRole("list", { name: "useful links list" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockUsefulLinks[0].text }));
    expect(screen.getByRole("link", { name: mockUsefulLinks[1].text }));
    expect(
      screen.getByRole("list", { name: "contact links list" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockContactLinks[0].text }));
    expect(screen.getByRole("link", { name: mockContactLinks[1].text }));
  });
});
