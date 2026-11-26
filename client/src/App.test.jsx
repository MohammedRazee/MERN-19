import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";
import { API_URL } from "./config.js";

const sample = [
  { _id: "1", text: "Buy milk", done: false },
  { _id: "2", text: "Finish lab record", done: true },
];

function fakeServer(response) {
  vi.stubGlobal("fetch", vi.fn(() => response));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("To-Do list loaded from the server", () => {
  it("shows Loading first, then the tasks", async () => {
    fakeServer(Promise.resolve({ ok: true, json: async () => sample }));
    render(<App />);
    expect(screen.getByText(/Loading tasks/)).toBeInTheDocument();
    expect(await screen.findByText(/Buy milk/)).toBeInTheDocument();
    expect(screen.getByText(/Finish lab record/)).toBeInTheDocument();
    expect(screen.queryByText(/Loading tasks/)).not.toBeInTheDocument();
  });

  it("marks done and not-done tasks", async () => {
    fakeServer(Promise.resolve({ ok: true, json: async () => sample }));
    render(<App />);
    const items = await screen.findAllByRole("listitem");
    expect(items[0]).toHaveTextContent("⬜ Buy milk");
    expect(items[1]).toHaveTextContent("✅ Finish lab record");
  });

  it("asks the server once, at the right address", async () => {
    fakeServer(Promise.resolve({ ok: true, json: async () => sample }));
    render(<App />);
    await screen.findByText(/Buy milk/);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  it("shows the error message when the server cannot be reached", async () => {
    fakeServer(Promise.reject(new TypeError("Failed to fetch")));
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<App />);
    expect(await screen.findByText(/Could not load the tasks/)).toBeInTheDocument();
  });

  it("shows the error message when the server answers 500", async () => {
    fakeServer(Promise.resolve({ ok: false, status: 500, json: async () => ({}) }));
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<App />);
    expect(await screen.findByText(/Could not load the tasks/)).toBeInTheDocument();
  });

  it("shows 'No tasks yet' when the database is empty", async () => {
    fakeServer(Promise.resolve({ ok: true, json: async () => [] }));
    render(<App />);
    expect(await screen.findByText(/No tasks yet/)).toBeInTheDocument();
  });
});
