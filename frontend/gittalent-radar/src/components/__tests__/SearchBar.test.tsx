import {describe, it, expect, vi, beforeEach} from "vitest";
import {render, screen, fireEvent} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import SearchBar from "@/components/SearchBar";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("SearchBar", () => {

    beforeEach(() => { mockNavigate.mockClear(); });

    it("readers inputs with placeholder", () => {
        render(
            <BrowserRouter>
                <SearchBar />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText("Search GitHub user...")).toBeInTheDocument();
    });

    it("navigate on Enter with username", () => {
        render(
            <BrowserRouter>
                <SearchBar />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText("Search GitHub user...");

        fireEvent.change(input, { target: {value: "Rackkoun"} });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(mockNavigate).toHaveBeenCalledWith("/users/Rackkoun");
    });

    it("does not navigate on empty input", () => {
        render(
            <BrowserRouter>
                <SearchBar />
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText("Search GitHub user...");

        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});