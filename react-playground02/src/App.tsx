import { ThemeProvider } from "./contexts/ThemeContext";
import { UIProvider } from "./UIProvider/UIProvider";
import AppRouter from "./router/AppRouter";
import { ActionProvider } from "./contexts/ActionContext";

function App() {
  return (
    <ThemeProvider>
      <UIProvider>
        <ActionProvider>
          <AppRouter />
        </ActionProvider>
      </UIProvider>
    </ThemeProvider>
  );
}

export default App;
