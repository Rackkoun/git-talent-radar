import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import UserPage from "../UserPage";
import { getGithubLanguages, getGithubUser } from "@/services/githubApi";
import type { GithubUser } from "@/types/github";

const mockUser = {
    id: 1,
    login: "Rackkoun",
    avatar_url: "https://avatars.com/rackkoun.png",
    html_url: "https://github.com/Rackkoun",
    bio: "MLOps enthusiast",
    location: "Douala",
    created_at: "2013-05-02T00:00:00Z",
    followers: 2,
    following: 1,
    public_repos: 30
};

const mockLanguages = [
    {name: "Python", bytes: 7000, percentage: 70},
    {name: "SQL", bytes: 3000, percentage: 30},
];

vi.mock("@/services/githubApi", () => ({
    getGithubUser: vi.fn(),
    getGithubLanguages: vi.fn()
}));

describe("UserPage", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    });

    it("shows loading state", () => {
        vi.mocked(getGithubUser).mockImplementation(() => new Promise(() => {}));
        vi.mocked(getGithubLanguages).mockImplementation(() => new Promise(() => {}));

        render(
            <MemoryRouter initialEntries={["/users/Rackkoun"]}>
                <Routes>
                    <Route path="/users/:username" element={<UserPage />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders user data after loading", async () => {
        vi.mocked(getGithubUser).mockResolvedValue(mockUser);
        vi.mocked(getGithubLanguages).mockResolvedValue(mockLanguages);

        render(
            <MemoryRouter initialEntries={["/users/Rackkoun"]}>
                <Routes>
                    <Route path="/users/:username" element={<UserPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText("Rackkoun")).toBeInTheDocument();
        });

        expect(screen.getByAltText("Rackkoun")).toHaveAttribute("src", "https://avatars.com/rackkoun.png");
        expect(screen.getByText("MLOps enthusiast")).toBeInTheDocument();

        expect(screen.getByText((content) => content.includes("Douala"))).toBeInTheDocument();

        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("30")).toBeInTheDocument();

        expect(screen.getByText("Languages")).toBeInTheDocument();
        expect(screen.getByText("Python")).toBeInTheDocument();
        expect(screen.getByText("70%")).toBeInTheDocument();
        expect(screen.getByText("SQL")).toBeInTheDocument();
        expect(screen.getByText("30%")).toBeInTheDocument();

        expect(screen.getByText("← Back")).toHaveAttribute("href", "/");
    });

    it("shows user not found when API retures null/underfined", async () => {
        vi.mocked(getGithubUser).mockResolvedValue(null as GithubUser | null);
        vi.mocked(getGithubLanguages).mockResolvedValue([]);

        render(
            <MemoryRouter initialEntries={["/users/unknown"]}>
                <Routes>
                    <Route path="/users/:username" element={<UserPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText("User not found")).not.toBeInTheDocument();
        });
    });

    it("renders unknow location when location is null", async () => {
        vi.mocked(getGithubUser).mockResolvedValue({...mockUser, location: null});
        vi.mocked(getGithubLanguages).mockResolvedValue([]);

        render(
            <MemoryRouter initialEntries={["/users/Rackkoun"]}>
                <Routes>
                    <Route path="/users/:username" element={<UserPage />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText("User not found")).not.toBeInTheDocument();
        });

        expect(screen.getByText((content) => content.includes("Unknown"))).toBeInTheDocument();
    });
});