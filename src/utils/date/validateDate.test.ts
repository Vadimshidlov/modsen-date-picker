import { validateDate } from "@/utils/date";

describe("validateDate tests", () => {
    it("should return true for a valid date format (DD/MM/YYYY)", () => {
        const validDate = "01/01/2022";
        expect(validateDate(validDate)).toBe(true);
    });

    it("should return false for an invalid date format", () => {
        const invalidDate = "2022/01/01";
        expect(validateDate(invalidDate)).toBe(false);
    });

    it("should return false for a date with invalid day", () => {
        const invalidDayDate = "32/01/2022";
        expect(validateDate(invalidDayDate)).toBe(false);
    });

    it("should return false for a date with invalid month", () => {
        const invalidMonthDate = "01/13/2022";
        expect(validateDate(invalidMonthDate)).toBe(false);
    });

    it("should return false for a date with invalid year", () => {
        const invalidYearDate = "01/01/22";
        expect(validateDate(invalidYearDate)).toBe(false);
    });
});
