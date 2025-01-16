import { useState, useMemo } from "react";
import { LOCAL_STORAGE_THEME_KEY, THEME } from "../theme/const";
import { themeSettings } from "../theme/themeSettings";
import { createTheme } from "@mui/material/styles";

const chooseTheme = (theme) => theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
const defaultTheme = JSON.parse(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) || THEME.DARK;

export const useMode = () => {
    const [mode, setMode] = useState(defaultTheme);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prev) => chooseTheme(prev));
                localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(chooseTheme(mode)))
            }
        }),
        [mode]
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};