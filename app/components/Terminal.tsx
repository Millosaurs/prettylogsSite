import { useState } from "react";
import { Copy, Check, Terminal as TerminalIcon } from "lucide-react";

interface TerminalProps {
  output: string;
  title?: string;
  showHeader?: boolean;
}

export function Terminal({
  output,
  title = "Terminal",
  showHeader = true,
}: TerminalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Strip ANSI codes before copying
    const plainText = output.replace(
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      "",
    );
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert ANSI codes to HTML
  const formatOutput = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIndex) => {
      const segments: React.ReactElement[] = [];
      let currentIndex = 0;
      let segmentIndex = 0;

      // ANSI color code mapping
      const colorMap: { [key: string]: string } = {
        "30": "text-gray-900", // black
        "31": "text-red-400", // red
        "32": "text-green-400", // green
        "33": "text-yellow-400", // yellow
        "34": "text-blue-400", // blue
        "35": "text-pink-400", // magenta
        "36": "text-cyan-400", // cyan
        "37": "text-gray-300", // white
        "90": "text-gray-500", // bright black (gray)
        "91": "text-red-300", // bright red
        "92": "text-green-300", // bright green
        "93": "text-yellow-300", // bright yellow
        "94": "text-blue-300", // bright blue
        "95": "text-pink-300", // bright magenta
        "96": "text-cyan-300", // bright cyan
        "97": "text-white", // bright white
      };

      const ansiRegex = /\x1b\[([0-9;]+)m/g;
      let match;
      let currentClasses = ["text-gray-200"];
      let isBold = false;

      while ((match = ansiRegex.exec(line)) !== null) {
        // Add text before this code
        if (match.index > currentIndex) {
          const text = line.slice(currentIndex, match.index);
          segments.push(
            <span
              key={`${lineIndex}-${segmentIndex++}`}
              className={`${currentClasses.join(" ")} ${isBold ? "font-semibold" : ""}`}
            >
              {text}
            </span>,
          );
        }

        // Parse ANSI codes
        const codes = match[1].split(";");
        for (const code of codes) {
          if (code === "0") {
            // Reset
            currentClasses = ["text-gray-200"];
            isBold = false;
          } else if (code === "1") {
            // Bold
            isBold = true;
          } else if (code === "22") {
            // Not bold
            isBold = false;
          } else if (colorMap[code]) {
            // Color
            currentClasses = [colorMap[code]];
          }
        }

        currentIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (currentIndex < line.length) {
        const text = line.slice(currentIndex);
        segments.push(
          <span
            key={`${lineIndex}-${segmentIndex++}`}
            className={`${currentClasses.join(" ")} ${isBold ? "font-semibold" : ""}`}
          >
            {text}
          </span>,
        );
      }

      // If no segments were created, add the whole line as plain text
      if (segments.length === 0) {
        segments.push(
          <span key={`${lineIndex}-${segmentIndex}`} className="text-gray-200">
            {line || " "}
          </span>,
        );
      }

      return (
        <div key={lineIndex} className="leading-relaxed">
          {segments}
        </div>
      );
    });
  };

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-lg border border-border bg-[#0d0d0d]">
        {showHeader && (
          <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TerminalIcon className="h-4 w-4" />
              <span className="font-medium">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
          </div>
        )}
        <div className="p-5 overflow-x-auto">
          <pre
            className="font-mono text-sm"
            style={{
              fontFamily:
                '"Fira Code", Consolas, Monaco, "Courier New", monospace',
            }}
          >
            {formatOutput(output)}
          </pre>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-muted/80 hover:bg-muted rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
        aria-label="Copy output"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
