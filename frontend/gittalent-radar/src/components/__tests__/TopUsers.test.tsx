import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TopUsers from "../TopUsers";

const mockUsers = [
    {id: 1, login: "Rackkoun", avatar_url: "https://example.com/1.png"},
    {id: 2, login: "tj", avatar_url: "https://example.com/2.png"},
];

vi.mock("@/services/githubApi", () => ({
    getFeaturedUsers: vi.fn(() => Promise.resolve(mockUsers)),
}));

describe("TopUsers", () => {
    it("renders featured users", async () => {
        render(
            <BrowserRouter>
                <TopUsers />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Rackkoun")).toBeInTheDocument();
            expect(screen.getByText("tj")).toBeInTheDocument();
        });
    });
});