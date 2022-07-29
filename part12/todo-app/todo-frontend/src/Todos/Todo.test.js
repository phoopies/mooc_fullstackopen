import React from "react";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

const todo = {
  text: "Testing a single todo",
  done: true,
};

test("Todo text is rendered", () => {
  render(<Todo todo={todo} />);

  const text = screen.getByText("Testing a single todo");
  expect(text).toBeDefined();
});
