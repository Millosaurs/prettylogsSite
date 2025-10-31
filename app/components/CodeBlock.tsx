import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { Copy, Check } from "lucide-react";

// Custom dark theme with colorful syntax highlighting
const customTheme = {
  'code[class*="language-"]': {
    color: "#e0e0e0",
    background: "none",
    fontFamily: '"Fira Code", Consolas, Monaco, "Courier New", monospace',
    fontSize: "0.875rem",
    textAlign: "left" as const,
    whiteSpace: "pre" as const,
    wordSpacing: "normal",
    wordBreak: "normal" as const,
    wordWrap: "normal" as const,
    lineHeight: "1.6",
    tabSize: 2,
    hyphens: "none" as const,
  },
  'pre[class*="language-"]': {
    color: "#e0e0e0",
    background: "#0d0d0d",
    fontFamily: '"Fira Code", Consolas, Monaco, "Courier New", monospace',
    fontSize: "0.875rem",
    textAlign: "left" as const,
    whiteSpace: "pre" as const,
    wordSpacing: "normal",
    wordBreak: "normal" as const,
    wordWrap: "normal" as const,
    lineHeight: "1.6",
    tabSize: 2,
    hyphens: "none" as const,
    padding: "1.25rem",
    margin: "0",
    overflow: "auto",
    borderRadius: "0.5rem",
  },
  comment: {
    color: "#6b7280",
    fontStyle: "italic",
  },
  prolog: {
    color: "#6b7280",
  },
  doctype: {
    color: "#6b7280",
  },
  cdata: {
    color: "#6b7280",
  },
  punctuation: {
    color: "#9ca3af",
  },
  property: {
    color: "#60a5fa",
  },
  tag: {
    color: "#f472b6",
  },
  boolean: {
    color: "#fb923c",
  },
  number: {
    color: "#fb923c",
  },
  constant: {
    color: "#a78bfa",
  },
  symbol: {
    color: "#a78bfa",
  },
  deleted: {
    color: "#ef4444",
  },
  selector: {
    color: "#22c55e",
  },
  "attr-name": {
    color: "#fbbf24",
  },
  string: {
    color: "#34d399",
  },
  char: {
    color: "#34d399",
  },
  builtin: {
    color: "#60a5fa",
  },
  inserted: {
    color: "#22c55e",
  },
  operator: {
    color: "#f472b6",
  },
  entity: {
    color: "#fbbf24",
    cursor: "help",
  },
  url: {
    color: "#60a5fa",
  },
  ".language-css .token.string": {
    color: "#34d399",
  },
  ".style .token.string": {
    color: "#34d399",
  },
  variable: {
    color: "#ec4899",
  },
  atrule: {
    color: "#a78bfa",
  },
  "attr-value": {
    color: "#34d399",
  },
  function: {
    color: "#818cf8",
  },
  "class-name": {
    color: "#fbbf24",
  },
  keyword: {
    color: "#f472b6",
    fontWeight: "500",
  },
  regex: {
    color: "#fb923c",
  },
  important: {
    color: "#ef4444",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  namespace: {
    opacity: 0.7,
  },
  // Additional token types for better coverage
  "maybe-class-name": {
    color: "#fbbf24",
  },
  parameter: {
    color: "#fb923c",
  },
  interpolation: {
    color: "#ec4899",
  },
  "interpolation-punctuation": {
    color: "#9ca3af",
  },
  "template-string": {
    color: "#34d399",
  },
  "template-punctuation": {
    color: "#9ca3af",
  },
};

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-lg border border-border bg-card/50">
        <SyntaxHighlighter
          language={language}
          style={customTheme}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            background: "#0d0d0d",
            padding: "1.25rem",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                '"Fira Code", Consolas, Monaco, "Courier New", monospace',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-muted/80 hover:bg-muted rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
        aria-label="Copy code"
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
