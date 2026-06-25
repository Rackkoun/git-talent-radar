import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RepoStatsChart from "../RepoStatsChart";


const mockData = [
    {month: "Jan", repos: 5},
    {month: "Feb", repos: 8},
    {month: "Mar", repos: 12},
];

describe("RepoStatsChart", () => {

    it("renders without crashing", () => {
        const { container } = render(<RepoStatsChart data={mockData} />);

        expect(container).toBeInTheDocument();
        expect(container.firstChild).toBeTruthy();
    });

    it("renders with empty data", () => {
        const { container } = render(<RepoStatsChart data={[]} />);

        expect(container).toBeInTheDocument();
    });
});