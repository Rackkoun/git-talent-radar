import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LanguagePieChart from "../LanguagePieChart";


const mockData = [
    {name: "Python", percentage: 70},
    {name: "SQL", percentage: 20},
    {name: "TypeScript", percentage: 10},
];

describe("LanguagePieChart", () => {
    it("renders without crashing", () => {
        const { container } = render(<LanguagePieChart data={mockData} />);

        expect(container).toBeInTheDocument();
        expect(container.firstChild).toBeTruthy();
    });

    it("renders with empty data", () => {
        const { container } = render(<LanguagePieChart data={[]} />);

        expect(container).toBeInTheDocument();
    });
});