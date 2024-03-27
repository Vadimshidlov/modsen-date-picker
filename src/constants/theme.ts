import { ColorsType, FontsType, SizeType, ThemeType } from "@/types";

export const COLORS: ColorsType = {
    white: "#ffffff",
    black: "#333333",
    gray: "#E1E1E1",
    lightGray: "#aaaaaa",
    darkBlueHover: "#5185cb",
    darkBlue: "#2f80ed",
    blue: "#2f80ed99",
    lightBlue: "#2f80ed1a",
    red: "#ff3131",
    orange: "#f97e00",
};

export const FONTS: FontsType = {
    fontFamily: { openSans: "Open Sans" },
    fontSize: {
        x: 20,
        l: 15,
        m: 14,
        s: 13,
        xs: 12,
    },
    fontWeight: {
        x: 900,
        l: 700,
        m: 600,
        s: 400,
    },
};

export const SIZES: SizeType = {
    s8: "8px",
    s10: "10px",
    s12: "12px",
    s13: "13px",
    s14: "14px",
    s15: "15px",
    s20: "20px",
    s30: "30px",
};

export const THEME: ThemeType = {
    colors: { ...COLORS },
    fonts: { ...FONTS },
    sizes: { ...SIZES },
};
