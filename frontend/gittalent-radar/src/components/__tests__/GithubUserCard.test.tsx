import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";;
import GitHubUserCard from "@/components/GithubUserCard";


describe("GithubUserCard", () => {
    it("renders login and avatar", () => {
        render(
            <BrowserRouter>
                <GitHubUserCard 
                    login="Rackkoun"
                    avatarUrl="https://example.com/avatar.png"
                />
            </BrowserRouter>
        );

        expect(screen.getByText("Rackkoun")).toBeInTheDocument();
        expect(screen.getByAltText("Rackkoun")).toHaveAttribute("src", "https://example.com/avatar.png")
    });

    it("links to user page", () => {
        render(
            <BrowserRouter>
                <GitHubUserCard 
                    login="Rackkoun"
                    avatarUrl="https://example.com/avatar.png"
                />
            </BrowserRouter>
        );

        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/users/Rackkoun");
    });
});