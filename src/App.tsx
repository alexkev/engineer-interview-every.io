import { ChallengeComponent } from "./ChallengeComponent";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen">
        <header className="bg-card text-primary-foreground p-6">
          <div className="flex items-center ml-6">
            <h1 className="text-2xl font-bold text-foreground">
              Welcome To The Every.io Code Challenge.
            </h1>
            <div className="ml-12">
              <a
                target="_blank"
                href="https://www.figma.com/proto/kd49ArXbBt0vi1kBSLkmC1/Code-Challenge?node-id=1%3A2&scaling=min-zoom&page-id=0%3A1"
                className="bg-accent text-accent-foreground px-4 py-2 rounded hover:bg-accent/80 transition-colors inline-block"
                rel="noreferrer"
              >
                Checkout the Prototype
              </a>
            </div>
          </div>
        </header>
        <main className="max-w-[calc(100vw-50px)] min-h-[calc(100vh-152px)] m-8 bg-muted border border-border rounded-lg shadow-lg">
          <ChallengeComponent />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
