import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

export const useAppTheme = () => {
  const mode = useSelector((state) => state.ui.themeMode);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#90caf9",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1d1d1d",
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  });

  return { theme };
};
