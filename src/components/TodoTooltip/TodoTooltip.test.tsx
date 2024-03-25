import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { TodoTooltip } from "@/components/TodoTooltip/index";

describe("TodoTooltip", () => {
    it("should hide after 4 seconds", async () => {
        jest.useFakeTimers();

        const { container } = render(<TodoTooltip />);

        expect(container.firstChild).toBeInTheDocument();

        jest.advanceTimersByTime(4000);

        await waitFor(() => {
            expect(container.firstChild).not.toBeVisible();
        });
    });
});
