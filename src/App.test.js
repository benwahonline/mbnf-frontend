import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./pages/MapPage", () => () => <div>Mocked MapPage</div>);

test("renders MBNF Frontend", () => {
  render(<App />);
  const linkElement = screen.getByText(/missing but not forgotten/i);
  expect(linkElement).toBeInTheDocument();
});
