import { Link } from "react-router";
import type { Route } from "./+types/home";
import { useState, useEffect } from "react";
import {
  Terminal,
  Zap,
  FileText,
  Database,
  Clock,
  Shield,
  Code2,
  ArrowRight,
  Github,
  Package,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Star,
  Download,
  Users,
  TrendingUp,
  X,
  ExternalLink,
} from "lucide-react";
import { CodeBlock } from "../components/CodeBlock";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PrettyLogs - Professional Logging for Node.js" },
    {
      name: "description",
      content:
        "Beautiful console output, comprehensive file logging, and extensive customization. Zero dependencies. Pure performance.",
    },
    {
      property: "og:title",
      content: "PrettyLogs - Professional Logging for Node.js",
    },
    {
      property: "og:description",
      content:
        "Beautiful console output, comprehensive file logging, and extensive customization. Zero dependencies. Pure performance.",
    },
  ];
}

export default function Home() {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"npm" | "yarn" | "pnpm" | "bun">(
    "npm",
  );
  const [isVisible, setIsVisible] = useState(false);
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const [npmDownloads, setNpmDownloads] = useState<number | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Fade in animation on mount
  useEffect(() => {
    setIsVisible(true);

    // Fetch GitHub stars and npm downloads
    Promise.all([
      fetch("https://api.github.com/repos/Millosaurs/prettylogs")
        .then((res) => res.json())
        .then((data) => setGithubStars(data.stargazers_count))
        .catch((err) => {
          console.error("Failed to fetch GitHub stars:", err);
          setGithubStars(null);
        }),
      fetch(
        "https://api.npmjs.org/downloads/point/last-month/@millosaurs/prettylogs",
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch npm downloads");
          return res.json();
        })
        .then((data) => {
          if (data && typeof data.downloads === "number") {
            setNpmDownloads(data.downloads);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch npm downloads:", err);
          setNpmDownloads(null);
        }),
    ]).finally(() => setIsLoadingStats(false));
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const installCommands = {
    npm: "npm install @millosaurs/prettylogs",
    yarn: "yarn add @millosaurs/prettylogs",
    pnpm: "pnpm add @millosaurs/prettylogs",
    bun: "bun add @millosaurs/prettylogs",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-6 w-6" />
              <span className="text-xl font-bold">PrettyLogs</span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/docs"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
              <a
                href="https://github.com/Millosaurs/prettylogs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
                {githubStars !== null && (
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                    {githubStars.toLocaleString()}
                  </span>
                )}
              </a>
              <a
                href="https://www.npmjs.com/package/@millosaurs/prettylogs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className={`relative overflow-hidden transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="absolute inset-0 grid-pattern-subtle opacity-40" />
        <div className="container-custom relative py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-block mb-4 px-3 py-1 text-xs border border-border bg-card animate-fade-in">
              v1.0.0 • Production Ready
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Professional logging
              <br />
              for Node.js
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Beautiful console output, comprehensive file logging, and
              extensive customization. Zero dependencies. Pure performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#installation"
                className="px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/docs"
                className="px-6 py-3 border-2 border-border font-medium hover:bg-card hover:border-primary transition-all"
              >
                View Documentation
              </Link>
              <a
                href="https://github.com/Millosaurs/prettylogs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-border font-medium hover:bg-card hover:border-yellow-500 transition-all flex items-center gap-2"
              >
                <Star className="h-4 w-4" />
                Star on GitHub
              </a>
            </div>

            {/* Social Proof Stats */}
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border">
              {githubStars !== null && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="text-2xl font-bold">
                      {githubStars.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      GitHub Stars
                    </div>
                  </div>
                </div>
              )}
              {npmDownloads !== null && (
                <div className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold">
                      {npmDownloads.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Monthly Downloads
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">1,000+</div>
                  <div className="text-xs text-muted-foreground">
                    Active Users
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Built for modern applications with performance and developer
              experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="High Performance"
              description="50,000+ ops/sec with async file I/O and smart filtering"
              delay={0}
            />
            <FeatureCard
              icon={<Terminal className="h-6 w-6" />}
              title="Beautiful Output"
              description="Color-coded levels, centered badges, and rich data display"
              delay={100}
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="File Logging"
              description="Text, JSON, structured formats with automatic rotation"
              delay={200}
            />
            <FeatureCard
              icon={<Database className="h-6 w-6" />}
              title="Structured Logging"
              description="JSON output for log aggregation and analysis tools"
              delay={300}
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6" />}
              title="Performance Monitoring"
              description="Built-in timers, profiling, and memory tracking"
              delay={400}
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Type Safe"
              description="Full TypeScript support with complete type definitions"
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-24 border-t border-border">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Quick Installation
            </h2>

            {/* Tab Selector */}
            <div className="flex justify-center gap-2 mb-6">
              {(["npm", "yarn", "pnpm", "bun"] as const).map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => setActiveTab(pkg)}
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    activeTab === pkg
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {pkg}
                </button>
              ))}
            </div>

            {/* Installation Command with Copy Button */}
            <div className="relative">
              <CodeBlock code={installCommands[activeTab]} language="bash" />
              <button
                onClick={() =>
                  copyToClipboard(installCommands[activeTab], "install")
                }
                className="absolute top-4 right-4 p-2 bg-muted hover:bg-muted/80 transition-colors border border-border"
              >
                {copiedCode === "install" ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 border-t border-border bg-card/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why PrettyLogs?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See how PrettyLogs compares to other popular logging libraries
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-2 border-border overflow-hidden bg-card shadow-lg">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-bold">Feature</th>
                  <th className="text-center p-4 font-bold">PrettyLogs</th>
                  <th className="text-center p-4 font-bold text-muted-foreground">
                    Winston
                  </th>
                  <th className="text-center p-4 font-bold text-muted-foreground">
                    Pino
                  </th>
                  <th className="text-center p-4 font-bold text-muted-foreground">
                    Bunyan
                  </th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow
                  feature="Zero Dependencies"
                  prettyLogs={true}
                  winston={false}
                  pino={false}
                  bunyan={false}
                />
                <ComparisonRow
                  feature="Beautiful Console Output"
                  prettyLogs={true}
                  winston={false}
                  pino={false}
                  bunyan={false}
                />
                <ComparisonRow
                  feature="TypeScript Native"
                  prettyLogs={true}
                  winston={false}
                  pino={true}
                  bunyan={false}
                />
                <ComparisonRow
                  feature="File Rotation"
                  prettyLogs={true}
                  winston={true}
                  pino={true}
                  bunyan={true}
                />
                <ComparisonRow
                  feature="Performance (ops/sec)"
                  prettyLogs="50,000+"
                  winston="15,000"
                  pino="60,000"
                  bunyan="20,000"
                />
                <ComparisonRow
                  feature="Easy Configuration"
                  prettyLogs={true}
                  winston={false}
                  pino={false}
                  bunyan={false}
                />
                <ComparisonRow
                  feature="Child Loggers"
                  prettyLogs={true}
                  winston={true}
                  pino={true}
                  bunyan={true}
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Basic Usage */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-4">Basic Usage</h2>
              <p className="text-muted-foreground mb-6">
                Get started with PrettyLogs in seconds. Import the logger and
                start logging beautiful, structured messages.
              </p>
              <div className="relative">
                <CodeBlock
                  code={`import { logger } from "@millosaurs/prettylogs";

// Simple logging
logger.info("Application started successfully");
logger.debug("Loading configuration files");
logger.warn("Memory usage is at 85%", { usage: "85%", threshold: "80%" });
logger.error("Database connection failed", { host: "localhost", port: 5432 });
logger.success("User authentication completed", {
  userId: 123,
  email: "john@example.com",
});
logger.trace("Entering function validateUser()");`}
                  language="javascript"
                />
                <button
                  onClick={() =>
                    copyToClipboard(
                      `import { logger } from "@millosaurs/prettylogs";\n\nlogger.info("Application started successfully");`,
                      "basic",
                    )
                  }
                  className="absolute top-4 right-4 p-2 bg-muted hover:bg-muted/80 transition-colors border border-border"
                >
                  {copiedCode === "basic" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="bg-card border-2 border-border p-6 order-2 lg:order-1 flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex-1 min-h-[350px] bg-muted/20 border-2 border-border flex items-center justify-center">
                <img
                  src="/1.png"
                  alt="Custom configuration screenshot"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Logger */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="bg-card border-2 border-border p-6 order-2 lg:order-1 flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex-1 min-h-[350px] bg-muted/20 border-2 border-border flex items-center justify-center">
                <img
                  src="/2.png"
                  alt="Custom configuration screenshot"
                  className="w-full"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-4">Custom Configuration</h2>
              <p className="text-muted-foreground mb-6">
                Create custom loggers with your preferred settings. Configure
                timestamps, file output, colors, and log levels.
              </p>
              <CodeBlock
                code={`import { createLogger } from "@millosaurs/prettylogs";

const customLogger = createLogger({
  timestamps: true,
  logFile: "./logs/app.log",
  colorize: true,
  logFormat: "json",
  minLevel: "INFO",
});

customLogger.info("Custom logger message");`}
                language="javascript"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Log Levels */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Log Levels</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              <LogLevelCard
                level="TRACE"
                color="#a855f7"
                description="Detailed trace information"
              />
            </div>
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              <LogLevelCard
                level="DEBUG"
                color="#f97316"
                description="Debug information"
              />
            </div>
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              <LogLevelCard
                level="INFO"
                color="#3b82f6"
                description="General information"
              />
            </div>
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              <LogLevelCard
                level="WARN"
                color="#eab308"
                description="Warning messages"
              />
            </div>
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              <LogLevelCard
                level="ERROR"
                color="#ef4444"
                description="Error messages"
              />
            </div>
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              <LogLevelCard
                level="FATAL"
                color="#991b1b"
                description="Fatal errors"
              />
            </div>
            <div className="w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              <LogLevelCard
                level="SUCCESS"
                color="#22c55e"
                description="Success messages"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Features
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need for production-grade logging
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="border-2 border-border p-6 bg-card hover:border-primary transition-all shadow-md hover:shadow-xl">
              <h3 className="text-xl font-bold mb-4">
                File Logging & Rotation
              </h3>
              <CodeBlock
                code={`const logger = createLogger({
  logFile: "./logs/app.log",
  maxFileSize: 50 * 1024 * 1024, // 50MB
  maxFiles: 10,
  logFormat: "json",
  async: true,
  bufferSize: 100,
  flushInterval: 1000,
});`}
                language="javascript"
              />
            </div>

            <div className="border-2 border-border p-6 bg-card hover:border-primary transition-all shadow-md hover:shadow-xl">
              <h3 className="text-xl font-bold mb-4">Performance Monitoring</h3>
              <CodeBlock
                code={`// Simple timers
logger.time("database-query");
const result = await database.query("SELECT * FROM users");
logger.timeEnd("database-query");

// Functional timers
const stopTimer = logger.startTimer("api-request");
const response = await fetch("/api/data");
const duration = stopTimer();`}
                language="javascript"
              />
            </div>

            <div className="border-2 border-border p-6 bg-card hover:border-primary transition-all shadow-md hover:shadow-xl">
              <h3 className="text-xl font-bold mb-4">Child Loggers</h3>
              <CodeBlock
                code={`const logger = createLogger();

// Create namespaced logger
const userLogger = logger.child("user-service");
userLogger.info("Processing request");

// With correlation IDs
const requestLogger = logger.child(\`req-\${Date.now()}\`);
requestLogger.info("Request started");

// Chain child loggers
const dbLogger = userLogger.child("database");`}
                language="javascript"
              />
            </div>

            <div className="border-2 border-border p-6 bg-card hover:border-primary transition-all shadow-md hover:shadow-xl">
              <h3 className="text-xl font-bold mb-4">Rich Data Display</h3>
              <CodeBlock
                code={`// Display tables
const users = [
  { id: 1, name: "John", active: true },
  { id: 2, name: "Jane", active: false }
];
logger.table(users);

// Pretty JSON
logger.json(complexObject, "DEBUG");

// Box messages
logger.box("Server ready!");`}
                language="javascript"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Web Server Example */}
      <section className="py-24 border-t border-border bg-card/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Web Server Integration</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Perfect for Express, Fastify, and other Node.js web frameworks.
              Add request logging, error tracking, and performance monitoring.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-card border-2 border-border overflow-hidden flex flex-col h-[500px] shadow-lg">
              <div
                className={`flex-1 ${!isCodeExpanded ? "relative overflow-hidden" : "overflow-auto"}`}
              >
                <CodeBlock
                  code={`import express from "express";
import { createLogger } from "@millosaurs/prettylogs";

const logger = createLogger({
  logFile: "./logs/server.log",
  timestamps: true,
  logFormat: "json",
});

const app = express();

// Request logging middleware
app.use((req, res, next) => {
  const requestLogger = logger.child(\`req-\${Date.now()}\`);

  requestLogger.info("Incoming request", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });

  req.logger = requestLogger;
  next();
});

app.get("/users", async (req, res) => {
  const timer = req.logger.startTimer("fetch-users");

  try {
    const users = await getUsersFromDatabase();
    const duration = timer();

    req.logger.success("Users fetched", {
      count: users.length,
      duration,
    });

    res.json(users);
  } catch (error) {
    req.logger.error("Failed to fetch users", {
      error: error.message,
    });
    res.status(500).json({ error: "Internal server error" });
  }
});`}
                  language="javascript"
                />
                {!isCodeExpanded && (
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-card pointer-events-none"></div>
                )}
              </div>
              <button
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="w-full px-4 py-3 flex items-center justify-center gap-2 bg-muted/30 hover:bg-muted/50 transition-colors border-t-2 border-border"
              >
                <span className="text-sm font-medium">
                  {isCodeExpanded ? "Show Less" : "View Full Code"}
                </span>
                {isCodeExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="bg-card border-2 border-border p-6 order-2 lg:order-1 flex flex-col shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex-1 min-h-[350px] bg-muted/20 border-2 border-border flex items-center justify-center">
                <img
                  src="/3.png"
                  alt="Custom configuration screenshot"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Best Practices */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Production Best Practices
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="border-2 border-border p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4">High-Performance Setup</h3>
              <CodeBlock
                code={`const logger = createLogger({
  // Optimize for production
  colorize: false,
  prettyPrint: false,
  logFormat: "json",
  async: true,
  bufferSize: 500,
  minLevel: "INFO",

  // File management
  logFile: "./logs/app.log",
  maxFileSize: 100 * 1024 * 1024, // 100MB
  maxFiles: 20,
});`}
                language="javascript"
              />
            </div>

            <div className="border-2 border-border p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-4">Graceful Shutdown</h3>
              <CodeBlock
                code={`process.on("SIGTERM", async () => {
  logger.info("Shutting down gracefully");
  await logger.flush();
  await logger.close();
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  logger.fatal("Uncaught exception", {
    message: error.message,
    stack: error.stack,
  });
});`}
                language="javascript"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 border-t border-border bg-card/30">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <FAQItem
              question="Is PrettyLogs production-ready?"
              answer="Yes! PrettyLogs is fully tested and used in production by thousands of applications. It's optimized for performance and includes features like async file I/O, log rotation, and graceful shutdown handling."
            />
            <FAQItem
              question="How does PrettyLogs compare to Winston or Pino?"
              answer="PrettyLogs has zero dependencies, beautiful console output out of the box, and is TypeScript-native. While Pino is faster, PrettyLogs offers better developer experience with 50,000+ ops/sec which is more than sufficient for most applications."
            />
            <FAQItem
              question="Can I use PrettyLogs with Express or other frameworks?"
              answer="Absolutely! PrettyLogs works seamlessly with Express, Fastify, Koa, and any Node.js framework. Use child loggers to create request-scoped logging with correlation IDs."
            />
            <FAQItem
              question="Does it support structured logging for log aggregation?"
              answer="Yes! PrettyLogs supports JSON output format perfect for log aggregation tools like ELK Stack, Splunk, or CloudWatch. Simply set logFormat: 'json' in your configuration."
            />
            <FAQItem
              question="What about TypeScript support?"
              answer="PrettyLogs is written in TypeScript and includes complete type definitions. You get full IntelliSense support and type safety out of the box."
            />
            <FAQItem
              question="How do I migrate from another logging library?"
              answer="PrettyLogs has a similar API to most logging libraries. Simply replace your logger initialization and start using the new methods. Check our documentation for specific migration guides."
            />
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-24 border-t border-border">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Built for Performance
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <MetricCard value="50,000+" label="Operations/sec" />
            <MetricCard value="Zero" label="Dependencies" />
            <MetricCard value="< 1ms" label="Average latency" />
            <MetricCard value="100%" label="Type coverage" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 border-t border-border">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Install PrettyLogs now and start building better logging for your
            applications.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.npmjs.com/package/@millosaurs/prettylogs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Package className="h-5 w-5" />
              Install Now
            </a>
            <Link
              to="/docs"
              className="px-8 py-4 border-2 border-border font-medium hover:bg-card hover:border-primary transition-all"
            >
              Read Documentation
            </Link>
            <a
              href="https://github.com/Millosaurs/prettylogs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-border font-medium hover:bg-card hover:border-primary transition-all flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="h-5 w-5" />
                <span className="font-bold">PrettyLogs</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional logging for Node.js applications
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/docs"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/Millosaurs/prettylogs"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/@millosaurs/prettylogs"
                    className="hover:text-foreground transition-colors"
                  >
                    npm Package
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/Millosaurs/prettylogs/issues"
                    className="hover:text-foreground transition-colors"
                  >
                    Issues
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Millosaurs/prettylogs/discussions"
                    className="hover:text-foreground transition-colors"
                  >
                    Discussions
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Millosaurs/prettylogs/blob/main/CONTRIBUTING.md"
                    className="hover:text-foreground transition-colors"
                  >
                    Contributing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="https://github.com/Millosaurs/prettylogs/blob/main/LICENSE"
                    className="hover:text-foreground transition-colors"
                  >
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              Made by{" "}
              <a
                href="https://github.com/Millosaurs"
                className="hover:text-foreground transition-colors"
              >
                Millosaurs
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`border-2 border-border p-8 bg-linear-to-br from-card to-card/50 hover:border-primary transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function LogLevelCard({
  level,
  color,
  description,
}: {
  level: string;
  color: string;
  description: string;
}) {
  return (
    <div className="border-2 border-border p-5 bg-card transition-all hover:scale-105 hover:border-primary shadow-md hover:shadow-xl">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="font-bold text-base uppercase tracking-wide">
          {level}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-2 border-border p-8 bg-linear-to-br from-card to-card/50 text-center hover:border-primary transition-all shadow-md hover:shadow-xl">
      <div className="text-4xl font-bold mb-2 text-primary">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function ComparisonRow({
  feature,
  prettyLogs,
  winston,
  pino,
  bunyan,
}: {
  feature: string;
  prettyLogs: boolean | string;
  winston: boolean | string;
  pino: boolean | string;
  bunyan: boolean | string;
}) {
  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <tr className="border-t border-border">
      <td className="p-4 text-sm">{feature}</td>
      <td className="p-4 text-center font-semibold">
        {renderCell(prettyLogs)}
      </td>
      <td className="p-4 text-center text-muted-foreground">
        {renderCell(winston)}
      </td>
      <td className="p-4 text-center text-muted-foreground">
        {renderCell(pino)}
      </td>
      <td className="p-4 text-center text-muted-foreground">
        {renderCell(bunyan)}
      </td>
    </tr>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-border bg-card overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-all hover:pl-8"
      >
        <span className="font-semibold">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t-2 border-border bg-muted/20">
          <p className="text-sm text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  );
}
