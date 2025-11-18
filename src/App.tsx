import { ThemeProvider } from "./theme";
import { I18nProvider } from "./i18n";
import { Dashboard } from "./pages/Dashboard";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";

export default function App() {
  return (
    <ThemeProvider>
      <Theme>
        <I18nProvider>
          <Dashboard />
        </I18nProvider>
      </Theme>
    </ThemeProvider>
  );
}
