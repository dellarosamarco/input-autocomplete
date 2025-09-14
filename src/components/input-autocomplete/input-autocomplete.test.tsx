import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputAutocomplete from "./input-autocomplete.component";

interface User {
  id: number;
  name: string;
}

const mockData: User[] = [
  { id: 1, name: "Marco" },
  { id: 2, name: "Maria" },
  { id: 3, name: "Luca" },
];

describe("InputAutocomplete", () => {
  const onSelect = jest.fn();

  beforeEach(() => {
    onSelect.mockClear();
  });

  it("renders with correct ARIA attributes", () => {
    render(<InputAutocomplete<User> data={mockData} searchKeys={["name"]} displayKey="name" onSelect={onSelect} dropdownCharactersThreshold={1}/>);

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-haspopup", "listbox");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
  });

  it("shows matching results when user types", () => {
    render(<InputAutocomplete<User> data={mockData} searchKeys={["name"]} displayKey="name" onSelect={onSelect} dropdownCharactersThreshold={1} />);

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Mar" } });

    const options = screen.getAllByRole("option");
    
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent("Marco");
    expect(options[1]).toHaveTextContent("Maria");
  });

  it("selects item on click and updates input value", () => {
    render(<InputAutocomplete<User> data={mockData} searchKeys={["name"]} displayKey="name" onSelect={onSelect} dropdownCharactersThreshold={1} />);

    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Lu" } });

    const option = screen.getByText("Luca");
    fireEvent.mouseDown(option);

    expect(onSelect).toHaveBeenCalledWith({ id: 3, name: "Luca" });
    expect((input as HTMLInputElement).value).toBe("Luca");
  });
});
