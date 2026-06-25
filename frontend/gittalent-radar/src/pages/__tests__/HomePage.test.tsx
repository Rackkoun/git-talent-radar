import { describe, it, expect, vi } from "vitest";
import {  render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";


vi.mock("@/components/TopUsers", () => ({
    default: () => <div data-testid="top-users">TopUsers</div>
}));

vi.mock("@/components/SearchBar", () => ({
    default: () => <div data-testid="search-bar">SearchBar</div>
}));

describe("HomePage", () => {
    it("renders title and sections", () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );

        expect(screen.getByText("GitTalentRadar")).toBeInTheDocument();
        expect(screen.getByText("Featured Developers")).toBeInTheDocument();
        expect(screen.getByTestId("top-users")).toBeInTheDocument();
        expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    });
});