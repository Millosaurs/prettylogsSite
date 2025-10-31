import { Terminal } from "../components/Terminal";
import { CodeBlock } from "../components/CodeBlock";
import { useState } from "react";
import { Download, Terminal as TerminalIcon, Code2 } from "lucide-react";

export function meta() {
  return [
    { title: "Screenshot Tool - PrettyLogs" },
    {
      name: "description",
      content: "Create screenshots of terminal output and code snippets",
    },
  ];
}

export default function Screenshot() {
  const [mode, setMode] = useState<"terminal" | "code">("terminal");
  const [terminalOutput, setTerminalOutput] =
    useState(`[2024-10-29 12:34:56] \x1b[32mINFO\x1b[0m: Application started
[2024-10-29 12:34:57] \x1b[33mWARN\x1b[0m: Memory usage high
[2024-10-29 12:34:58] \x1b[31mERROR\x1b[0m: Connection failed`);
  const [code, setCode] = useState(`const logger = createLogger();
logger.info("Hello world");`);
  const [language, setLanguage] = useState("javascript");
  const [title, setTitle] = useState("Terminal");
  const [showHeader, setShowHeader] = useState(true);

  const handleDownloadInstructions = () => {
    alert(
      "To save as image:\n\n" +
        "1. Right-click on the preview below\n" +
        "2. Select 'Save image as...' or use browser DevTools\n" +
        "3. Or use browser screenshot extension\n\n" +
        "For pixel-perfect screenshots:\n" +
        "- Press F12 to open DevTools\n" +
        "- Click the element selector (top-left)\n" +
        "- Click on the preview\n" +
        "- Right-click in Elements tab\n" +
        "- Select 'Capture node screenshot'",
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="h-6 w-6" />
              <span className="text-xl font-bold">Screenshot Tool</span>
            </div>
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </nav>

      <div className="container-custom py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-3">Screenshot Tool</h1>
            <p className="text-muted-foreground text-lg">
              Create styled screenshots of terminal output and code snippets
              that match the site theme
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setMode("terminal")}
              className={`px-4 py-2 font-medium transition-colors relative ${
                mode === "terminal"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <TerminalIcon className="h-4 w-4" />
                Terminal Output
              </div>
              {mode === "terminal" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setMode("code")}
              className={`px-4 py-2 font-medium transition-colors relative ${
                mode === "code"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Code Block
              </div>
              {mode === "code" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>

          {/* Controls */}
          <div className="grid gap-6">
            {mode === "terminal" ? (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">
                      Terminal Title:
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Terminal"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="showHeader"
                      checked={showHeader}
                      onChange={(e) => setShowHeader(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="showHeader"
                      className="font-medium cursor-pointer"
                    >
                      Show header with window controls
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Terminal Output:
                  </label>
                  <textarea
                    value={terminalOutput}
                    onChange={(e) => setTerminalOutput(e.target.value)}
                    className="w-full h-48 px-3 py-2 border border-border rounded-md bg-card text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Paste your terminal output here (ANSI codes supported)"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Tip: ANSI color codes are supported (e.g., \x1b[32m for
                    green)
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium">Language:</label>
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="javascript, typescript, python, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">Code:</label>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-48 px-3 py-2 border border-border rounded-md bg-card text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Paste your code here"
                  />
                </div>
              </>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-card/50 border border-border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Download className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-2 text-sm">
                <p className="font-medium">How to save as image:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>
                    Right-click on the preview below and select "Save image
                    as..."
                  </li>
                  <li>
                    Or use F12 → Element Inspector → Right-click element →
                    "Capture node screenshot"
                  </li>
                  <li>
                    Or use a browser screenshot extension like "GoFullPage"
                  </li>
                  <li>For best quality, ensure browser zoom is at 100%</li>
                </ol>
                <button
                  onClick={handleDownloadInstructions}
                  className="text-primary hover:underline"
                >
                  Show detailed instructions
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Preview</h2>
            <div id="screenshot-target" className="inline-block min-w-full">
              {mode === "terminal" ? (
                <Terminal
                  output={terminalOutput}
                  title={title}
                  showHeader={showHeader}
                />
              ) : (
                <CodeBlock code={code} language={language} />
              )}
            </div>
          </div>

          {/* Quick Examples */}
          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-4">Quick Examples</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setMode("terminal");
                  setTerminalOutput(
                    `\x1b[90m[2024-10-29 12:34:56]\x1b[0m \x1b[42m\x1b[30m INFO \x1b[0m Application started
\x1b[90m[2024-10-29 12:34:57]\x1b[0m \x1b[43m\x1b[30m WARN \x1b[0m Memory usage: 85%
\x1b[90m[2024-10-29 12:34:58]\x1b[0m \x1b[41m\x1b[37m ERROR \x1b[0m Connection failed
\x1b[90m[2024-10-29 12:34:59]\x1b[0m \x1b[44m\x1b[37m DEBUG \x1b[0m Request processed in 234ms`,
                  );
                }}
                className="p-4 text-left border border-border rounded-lg hover:bg-card/50 transition-colors"
              >
                <h3 className="font-bold mb-1">Colorful Logs</h3>
                <p className="text-sm text-muted-foreground">
                  Sample output with colored log levels
                </p>
              </button>

              <button
                onClick={() => {
                  setMode("code");
                  setLanguage("typescript");
                  setCode(`import { createLogger } from "@millosaurs/prettylogs";

const logger = createLogger({
  level: "info",
  console: {
    enabled: true,
    colors: true,
  },
  file: {
    enabled: true,
    path: "./logs",
  },
});

logger.info("Application started");`);
                }}
                className="p-4 text-left border border-border rounded-lg hover:bg-card/50 transition-colors"
              >
                <h3 className="font-bold mb-1">Basic Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Sample PrettyLogs configuration code
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
