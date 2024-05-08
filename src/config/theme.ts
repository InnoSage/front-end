"use client";

import { createTheme, MantineColorsTuple } from "@mantine/core";

const quotaGreen: MantineColorsTuple = [
    "#e3fff4",
    "#d0fbe9",
    "#a3f5d4",
    "#73f0bc",
    "#4ceca8",
    "#33e99c",
    "#21e794",
    "#0dcd80",
    "#00b770",
    "#009e5e"
];

const quotaGray: MantineColorsTuple = [
    "#e7f8f8",
    "#e2e8ed",
    "#caccd2",
    "#afb0b6",
    "#96989e",
    "#878990",
    "#7f818a",
    "#6c6f78",
    "#5f636e",
    "#4f5563"
];

const baseTheme = {
    colors: {
        "quota-green": quotaGreen,
        "quota-gray": quotaGray
    },
    primaryColor: "quota-green"
};

export const theme = createTheme({
    ...baseTheme
});
