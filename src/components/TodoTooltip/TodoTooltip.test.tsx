import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { TodoTooltip } from "@/components/TodoTooltip/index";
import { THEME } from "@/constants";
import { ThemeWrapper } from "@/components/ThemeWrapper";

describe("TodoTooltip", () => {
    it("should hide after 4 seconds", async () => {
        jest.useFakeTimers();

        const { container } = render(
            <ThemeWrapper theme={THEME}>
                <TodoTooltip />
            </ThemeWrapper>,
        );

        expect(container.firstChild).toBeInTheDocument();

        jest.advanceTimersByTime(4000);

        await waitFor(() => {
            expect(container.firstChild).not.toBeVisible();
        });
    });
});
