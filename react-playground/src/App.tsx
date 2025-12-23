import { ThemeProvider } from "./contexts/ThemeContext";
import { UIProvider } from "./UIProvider/UIProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <ThemeProvider>
      <UIProvider>
        <AppRouter />
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;
