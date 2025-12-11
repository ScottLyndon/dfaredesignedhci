import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalContext";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/appointment" component={Appointment} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <ModalProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ModalProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
