import { ThemeProvider } from "@mui/material";
import Router from "./Router";
import theme from "./theme";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
