import { Link } from "react-router";
import type { Route } from "./+types/docs";
import {
  Terminal,
  BookOpen,
  Code2,
  Settings,
  Zap,
  FileText,
  Clock,
  Database,
  ChevronRight,
  ChevronDown,
  Home,
  Package,
  Rocket,
  Boxes,
  Monitor,
  Gauge,
  Sparkles,
  Server,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { CodeBlock } from "../components/CodeBlock";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Documentation - PrettyLogs" },
    {
      name: "description",
      content:
        "Complete documentation for PrettyLogs - installation, configuration, API reference, and advanced usage patterns.",
    },
  ];
}

export default function Docs() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set(),
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "getting-started",
        "quick-start",
        "log-levels",
        "configuration",
        "child-loggers",
        "file-logging",
        "performance",
        "rich-output",
        "production",
        "typescript",
        "api",
      ];

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Terminal className="h-6 w-6" />
              <span className="text-xl font-bold">PrettyLogs</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="hidden sm:flex text-sm text-muted-foreground hover:text-foreground transition-colors items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <a
                href="https://github.com/Millosaurs/prettylogs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
              >
                GitHub
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-muted transition-colors border border-border"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-custom py-8 lg:py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside
            className={`
            lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto
            ${
              mobileMenuOpen
                ? "fixed inset-0 top-16 z-40 bg-background p-6 overflow-y-auto"
                : "hidden lg:block"
            }
          `}
          >
            <nav className="space-y-2">
              <SidebarSection
                title="Getting Started"
                icon={<Rocket className="h-4 w-4 text-primary" />}
                sectionId="getting-started-section"
                collapsed={collapsedSections.has("getting-started-section")}
                onToggle={() => toggleSection("getting-started-section")}
              >
                <SidebarLink
                  href="#getting-started"
                  active={activeSection === "getting-started"}
                  onClick={() => scrollToSection("getting-started")}
                  icon={<Package className="h-4 w-4" />}
                >
                  Installation
                </SidebarLink>
                <SidebarLink
                  href="#quick-start"
                  active={activeSection === "quick-start"}
                  onClick={() => scrollToSection("quick-start")}
                  icon={<Zap className="h-4 w-4" />}
                >
                  Quick Start
                </SidebarLink>
              </SidebarSection>

              <SidebarSection
                title="Core Concepts"
                icon={<BookOpen className="h-4 w-4 text-primary" />}
                sectionId="core-concepts-section"
                collapsed={collapsedSections.has("core-concepts-section")}
                onToggle={() => toggleSection("core-concepts-section")}
              >
                <SidebarLink
                  href="#log-levels"
                  active={activeSection === "log-levels"}
                  onClick={() => scrollToSection("log-levels")}
                  icon={<Boxes className="h-4 w-4" />}
                >
                  Log Levels
                </SidebarLink>
                <SidebarLink
                  href="#configuration"
                  active={activeSection === "configuration"}
                  onClick={() => scrollToSection("configuration")}
                  icon={<Settings className="h-4 w-4" />}
                >
                  Configuration
                </SidebarLink>
                <SidebarLink
                  href="#child-loggers"
                  active={activeSection === "child-loggers"}
                  onClick={() => scrollToSection("child-loggers")}
                  icon={<Database className="h-4 w-4" />}
                >
                  Child Loggers
                </SidebarLink>
              </SidebarSection>

              <SidebarSection
                title="Features"
                icon={<Sparkles className="h-4 w-4 text-primary" />}
                sectionId="features-section"
                collapsed={collapsedSections.has("features-section")}
                onToggle={() => toggleSection("features-section")}
              >
                <SidebarLink
                  href="#file-logging"
                  active={activeSection === "file-logging"}
                  onClick={() => scrollToSection("file-logging")}
                  icon={<FileText className="h-4 w-4" />}
                >
                  File Logging
                </SidebarLink>
                <SidebarLink
                  href="#performance"
                  active={activeSection === "performance"}
                  onClick={() => scrollToSection("performance")}
                  icon={<Gauge className="h-4 w-4" />}
                >
                  Performance Monitoring
                </SidebarLink>
                <SidebarLink
                  href="#rich-output"
                  active={activeSection === "rich-output"}
                  onClick={() => scrollToSection("rich-output")}
                  icon={<Monitor className="h-4 w-4" />}
                >
                  Rich Output
                </SidebarLink>
              </SidebarSection>

              <SidebarSection
                title="Advanced"
                icon={<Server className="h-4 w-4 text-primary" />}
                sectionId="advanced-section"
                collapsed={collapsedSections.has("advanced-section")}
                onToggle={() => toggleSection("advanced-section")}
              >
                <SidebarLink
                  href="#production"
                  active={activeSection === "production"}
                  onClick={() => scrollToSection("production")}
                  icon={<Database className="h-4 w-4" />}
                >
                  Production Setup
                </SidebarLink>
                <SidebarLink
                  href="#typescript"
                  active={activeSection === "typescript"}
                  onClick={() => scrollToSection("typescript")}
                  icon={<Code2 className="h-4 w-4" />}
                >
                  TypeScript
                </SidebarLink>
              </SidebarSection>

              <SidebarSection
                title="API Reference"
                icon={<Terminal className="h-4 w-4 text-primary" />}
                sectionId="api-section"
                collapsed={collapsedSections.has("api-section")}
                onToggle={() => toggleSection("api-section")}
              >
                <SidebarLink
                  href="#api"
                  active={activeSection === "api"}
                  onClick={() => scrollToSection("api")}
                  icon={<Code2 className="h-4 w-4" />}
                >
                  Full API Documentation
                </SidebarLink>
              </SidebarSection>

              {/* Progress Indicator */}
              <div className="pt-4 mt-4 border-t border-border">
                <div className="px-3 py-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between mb-1">
                    <span>Reading Progress</span>
                    <span className="font-medium">
                      {Math.round(
                        (([
                          "getting-started",
                          "quick-start",
                          "log-levels",
                          "configuration",
                          "child-loggers",
                          "file-logging",
                          "performance",
                          "rich-output",
                          "production",
                          "typescript",
                          "api",
                        ].indexOf(activeSection) +
                          1) /
                          11) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full h-1 bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{
                        width: `${
                          (([
                            "getting-started",
                            "quick-start",
                            "log-levels",
                            "configuration",
                            "child-loggers",
                            "file-logging",
                            "performance",
                            "rich-output",
                            "production",
                            "typescript",
                            "api",
                          ].indexOf(activeSection) +
                            1) /
                            11) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="min-w-0">
            <div className="prose prose-invert max-w-none">
              {/* Getting Started */}
              <section id="getting-started" className="mb-16 scroll-mt-24">
                <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                  <Package className="h-8 w-8" />
                  Documentation
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Everything you need to know about PrettyLogs - from
                  installation to advanced usage patterns.
                </p>

                <h2 className="text-3xl font-bold mb-4 mt-12">Installation</h2>
                <p className="text-muted-foreground mb-4">
                  Install PrettyLogs using your preferred package manager:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <CodeBlock
                    code="npm install @millosaurs/prettylogs"
                    language="bash"
                  />
                  <CodeBlock
                    code="yarn add @millosaurs/prettylogs"
                    language="bash"
                  />
                  <CodeBlock
                    code="pnpm add @millosaurs/prettylogs"
                    language="bash"
                  />
                  <CodeBlock
                    code="bun add @millosaurs/prettylogs"
                    language="bash"
                  />
                </div>
              </section>

              {/* Quick Start */}
              <section id="quick-start" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Zap className="h-7 w-7" />
                  Quick Start
                </h2>
                <p className="text-muted-foreground mb-6">
                  Get up and running with PrettyLogs in seconds. Here's the
                  simplest way to start logging:
                </p>

                <CodeBlock
                  code={`import PrettyLogs from '@millosaurs/prettylogs';

const logger = new PrettyLogs();

logger.info('Application started');
logger.success('Database connected');
logger.warn('Cache miss for key: user_123');
logger.error('Failed to process payment', { orderId: '12345' });`}
                  language="typescript"
                />

                <div className="mt-6 p-4 bg-card border-2 border-border shadow-md">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Tip:</strong> PrettyLogs works out of the box
                    with zero configuration, but offers extensive customization
                    options when you need them.
                  </p>
                </div>

                <div className="bg-card border-2 border-border p-6 mt-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex-1 min-h-[350px] bg-muted/20 border-2 border-border flex items-center justify-center">
                    <img
                      src="/4.png"
                      alt="Quick start example screenshot"
                      className="w-full"
                    />
                  </div>
                </div>
              </section>

              {/* Log Levels */}
              <section id="log-levels" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Boxes className="h-7 w-7" />
                  Log Levels
                </h2>
                <p className="text-muted-foreground mb-6">
                  PrettyLogs supports multiple log levels, each with distinct
                  visual styling for easy identification:
                </p>

                <div className="space-y-4 mb-8">
                  <LogLevelRow
                    level="trace"
                    color="bg-gray-500"
                    description="Detailed debugging information"
                  />
                  <LogLevelRow
                    level="debug"
                    color="bg-blue-500"
                    description="Debug-level messages"
                  />
                  <LogLevelRow
                    level="info"
                    color="bg-cyan-500"
                    description="Informational messages"
                  />
                  <LogLevelRow
                    level="success"
                    color="bg-green-500"
                    description="Success messages"
                  />
                  <LogLevelRow
                    level="warn"
                    color="bg-yellow-500"
                    description="Warning messages"
                  />
                  <LogLevelRow
                    level="error"
                    color="bg-red-500"
                    description="Error messages"
                  />
                  <LogLevelRow
                    level="fatal"
                    color="bg-purple-500"
                    description="Fatal error messages"
                  />
                </div>

                <CodeBlock
                  code={`logger.trace('Entering function processData()');
logger.debug('Variable state:', { count: 42 });
logger.info('Request received from 192.168.1.1');
logger.success('Email sent successfully');
logger.warn('API rate limit at 80%');
logger.error('Database connection failed');
logger.fatal('Critical system failure - shutting down');`}
                  language="typescript"
                />

                <div className="bg-card border-2 border-border p-6 mt-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex-1 min-h-[350px] bg-muted/20 border-2 border-border flex items-center justify-center">
                    <img
                      src="/5.png"
                      alt="Log levels example screenshot"
                      className="w-full"
                    />
                  </div>
                </div>
              </section>

              {/* Configuration */}
              <section id="configuration" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Settings className="h-7 w-7" />
                  Configuration
                </h2>
                <p className="text-muted-foreground mb-6">
                  Customize PrettyLogs to match your application's needs with
                  extensive configuration options:
                </p>

                <CodeBlock
                  code={`const logger = new PrettyLogs({
  level: 'info',                    // Minimum log level to output
  name: 'MyApp',                    // Logger name/identifier
  showTimestamp: true,              // Show timestamps
  showLevel: true,                  // Show log level
  showName: true,                   // Show logger name
  timestampFormat: 'HH:mm:ss',      // Timestamp format
  colors: true,                     // Enable colors
  structured: false,                // Output structured JSON
  fileLogging: {
    enabled: true,
    directory: './logs',
    filename: 'app.log',
    maxSize: 10 * 1024 * 1024,     // 10MB
    maxFiles: 5,
    compress: true
  }
});`}
                  language="typescript"
                />

                <div className="mt-8 space-y-4">
                  <ConfigOption
                    name="level"
                    type="string"
                    default="'info'"
                    description="Minimum log level to output. Logs below this level are ignored."
                  />
                  <ConfigOption
                    name="name"
                    type="string"
                    default="undefined"
                    description="Logger name displayed in output. Useful for identifying different parts of your application."
                  />
                  <ConfigOption
                    name="colors"
                    type="boolean"
                    default="true"
                    description="Enable or disable colored output in the console."
                  />
                  <ConfigOption
                    name="showTimestamp"
                    type="boolean"
                    default="true"
                    description="Include timestamps in log output."
                  />
                  <ConfigOption
                    name="structured"
                    type="boolean"
                    default="false"
                    description="Output logs as structured JSON instead of pretty-printed format."
                  />
                </div>
              </section>

              {/* Child Loggers */}
              <section id="child-loggers" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Database className="h-7 w-7" />
                  Child Loggers
                </h2>
                <p className="text-muted-foreground mb-6">
                  Create child loggers to organize logs from different modules
                  or components while inheriting parent configuration:
                </p>

                <CodeBlock
                  code={`// Parent logger
const logger = new PrettyLogs({ name: 'MyApp' });

// Child loggers inherit parent config
const dbLogger = logger.child({ name: 'Database' });
const apiLogger = logger.child({ name: 'API' });
const authLogger = logger.child({ name: 'Auth' });

dbLogger.info('Connection pool initialized');
apiLogger.warn('Rate limit approaching');
authLogger.success('User authenticated');`}
                  language="typescript"
                />

                <div className="mt-6 p-4 bg-card border-2 border-border shadow-md">
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Benefits of Child Loggers:</strong>
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Share configuration across modules</li>
                    <li>• Filter logs by component name</li>
                    <li>• Maintain consistent formatting</li>
                    <li>• Easy debugging and troubleshooting</li>
                  </ul>
                </div>

                <div className="bg-card border-2 border-border p-6 mt-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex-1 min-h-[350px] bg-muted/20 border-2 border-border flex items-center justify-center">
                    <img
                      src="/6.png"
                      alt="Child loggers example screenshot"
                      className="w-full"
                    />
                  </div>
                </div>
              </section>

              {/* File Logging */}
              <section id="file-logging" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <FileText className="h-7 w-7" />
                  File Logging
                </h2>
                <p className="text-muted-foreground mb-6">
                  Enable persistent logging to files with automatic rotation,
                  compression, and cleanup:
                </p>

                <CodeBlock
                  code={`const logger = new PrettyLogs({
  fileLogging: {
    enabled: true,
    directory: './logs',
    filename: 'app.log',
    maxSize: 10 * 1024 * 1024,     // 10MB per file
    maxFiles: 5,                    // Keep 5 files
    compress: true,                 // Compress old logs
    level: 'debug',                 // Log everything to file
  }
});

// Logs go to both console and file
logger.info('This appears in console and file');
logger.error('Errors are always logged to file');`}
                  language="typescript"
                />

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-card border-2 border-border shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Automatic Rotation
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Files automatically rotate when they reach the maximum
                      size, keeping your logs organized and manageable.
                    </p>
                  </div>
                  <div className="p-6 bg-card border-2 border-border shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      Compression
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Old log files are automatically compressed to save disk
                      space while maintaining accessibility.
                    </p>
                  </div>
                </div>

                <div className="bg-card border-2 border-border p-6 mt-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex-1 min-h-[350px] bg-muted/20 border-2 border-border flex items-center justify-center">
                    <img
                      src="/7.png"
                      alt="File logging example screenshot"
                      className="w-full"
                    />
                  </div>
                </div>
              </section>

              {/* Performance */}
              <section id="performance" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Gauge className="h-7 w-7" />
                  Performance Monitoring
                </h2>
                <p className="text-muted-foreground mb-6">
                  Measure execution time of operations with built-in performance
                  tracking:
                </p>

                <CodeBlock
                  code={`// Start a timer
logger.time('database-query');

// ... your code here ...
await db.query('SELECT * FROM users');

// End timer and log duration
logger.timeEnd('database-query');
// Output: ⏱️  database-query: 145ms

// Time async operations
async function processData() {
  logger.time('data-processing');

  await fetchData();
  await transformData();
  await saveData();

  logger.timeEnd('data-processing');
}`}
                  language="typescript"
                />

                <div className="mt-6 p-4 bg-card border-2 border-border shadow-md">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Pro Tip:</strong> Use performance monitoring to
                    identify bottlenecks in your application. The timer labels
                    help you track different operations independently.
                  </p>
                </div>
              </section>

              {/* Rich Output */}
              <section id="rich-output" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Monitor className="h-7 w-7" />
                  Rich Output
                </h2>
                <p className="text-muted-foreground mb-6">
                  Log complex data structures with beautiful, readable
                  formatting:
                </p>

                <CodeBlock
                  code={`// Log objects with pretty formatting
logger.info('User data:', {
  id: 123,
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
});

// Log arrays
logger.debug('Active connections:', [
  { id: 1, ip: '192.168.1.1' },
  { id: 2, ip: '192.168.1.2' }
]);

// Log errors with stack traces
try {
  throw new Error('Something went wrong');
} catch (error) {
  logger.error('Operation failed:', error);
}`}
                  language="typescript"
                />

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="p-6 bg-card border-2 border-border shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold mb-2">Objects</h4>
                    <p className="text-sm text-muted-foreground">
                      Nested objects are pretty-printed with proper indentation
                    </p>
                  </div>
                  <div className="p-6 bg-card border-2 border-border shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold mb-2">Arrays</h4>
                    <p className="text-sm text-muted-foreground">
                      Arrays are formatted for easy scanning and readability
                    </p>
                  </div>
                  <div className="p-6 bg-card border-2 border-border shadow-md hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold mb-2">Errors</h4>
                    <p className="text-sm text-muted-foreground">
                      Full stack traces with highlighted error messages
                    </p>
                  </div>
                </div>

                <div className="bg-card border-2 border-border p-6 mt-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex-1 min-h-[350px] bg-muted/20 border-2 border-border flex items-center justify-center">
                    <img
                      src="/8.png"
                      alt="Performance monitoring example screenshot"
                      className="w-full"
                    />
                  </div>
                </div>
              </section>

              {/* Production Setup */}
              <section id="production" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Server className="h-7 w-7" />
                  Production Setup
                </h2>
                <p className="text-muted-foreground mb-6">
                  Recommended configuration for production environments:
                </p>

                <CodeBlock
                  code={`const logger = new PrettyLogs({
  level: process.env.LOG_LEVEL || 'info',
  name: process.env.SERVICE_NAME || 'app',
  colors: process.env.NODE_ENV !== 'production',
  structured: process.env.NODE_ENV === 'production',
  fileLogging: {
    enabled: true,
    directory: process.env.LOG_DIR || './logs',
    filename: \`\${process.env.SERVICE_NAME || 'app'}.log\`,
    maxSize: 50 * 1024 * 1024,      // 50MB
    maxFiles: 10,
    compress: true,
    level: 'debug'                   // Log everything to file
  }
});

// Log unhandled errors
process.on('uncaughtException', (error) => {
  logger.fatal('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection:', reason);
});`}
                  language="typescript"
                />

                <div className="mt-6 space-y-4">
                  <div className="p-6 bg-card border-2 border-border shadow-md">
                    <h4 className="font-semibold mb-2">
                      Environment Variables
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Use environment variables for flexible configuration:
                    </p>
                    <CodeBlock
                      code={`LOG_LEVEL=info
SERVICE_NAME=api-server
LOG_DIR=/var/log/myapp
NODE_ENV=production`}
                      language="bash"
                    />
                  </div>
                </div>
              </section>

              {/* TypeScript */}
              <section id="typescript" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Code2 className="h-7 w-7" />
                  TypeScript Support
                </h2>
                <p className="text-muted-foreground mb-6">
                  PrettyLogs is written in TypeScript and provides full type
                  definitions out of the box:
                </p>

                <CodeBlock
                  code={`import PrettyLogs, { LogLevel, LoggerConfig } from '@millosaurs/prettylogs';

// Type-safe configuration
const config: LoggerConfig = {
  level: 'info' as LogLevel,
  name: 'MyApp',
  colors: true
};

const logger = new PrettyLogs(config);

// All methods are fully typed
logger.info('Message', { key: 'value' });
logger.child({ name: 'SubModule' });

// Custom type definitions
interface UserEvent {
  userId: string;
  action: string;
  timestamp: Date;
}

function logUserEvent(event: UserEvent) {
  logger.info('User event:', event);
}`}
                  language="typescript"
                />

                <div className="mt-6 p-4 bg-card border-2 border-border shadow-md">
                  <p className="text-sm text-muted-foreground">
                    ✨ <strong>Full IntelliSense Support:</strong> Get
                    autocomplete, type checking, and inline documentation in
                    your IDE for all PrettyLogs features.
                  </p>
                </div>
              </section>

              {/* API Reference */}
              <section id="api" className="mb-16 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <Terminal className="h-7 w-7" />
                  API Reference
                </h2>
                <p className="text-muted-foreground mb-6">
                  Complete reference for all PrettyLogs methods and options:
                </p>

                <div className="space-y-6">
                  <ApiMethod
                    name="constructor"
                    signature="new PrettyLogs(config?: LoggerConfig)"
                    description="Create a new logger instance with optional configuration."
                  />

                  <ApiMethod
                    name="trace"
                    signature="logger.trace(message: string, ...args: any[])"
                    description="Log a trace-level message with optional arguments."
                  />

                  <ApiMethod
                    name="debug"
                    signature="logger.debug(message: string, ...args: any[])"
                    description="Log a debug-level message with optional arguments."
                  />

                  <ApiMethod
                    name="info"
                    signature="logger.info(message: string, ...args: any[])"
                    description="Log an info-level message with optional arguments."
                  />

                  <ApiMethod
                    name="success"
                    signature="logger.success(message: string, ...args: any[])"
                    description="Log a success message with optional arguments."
                  />

                  <ApiMethod
                    name="warn"
                    signature="logger.warn(message: string, ...args: any[])"
                    description="Log a warning message with optional arguments."
                  />

                  <ApiMethod
                    name="error"
                    signature="logger.error(message: string, ...args: any[])"
                    description="Log an error message with optional arguments."
                  />

                  <ApiMethod
                    name="fatal"
                    signature="logger.fatal(message: string, ...args: any[])"
                    description="Log a fatal error message with optional arguments."
                  />

                  <ApiMethod
                    name="child"
                    signature="logger.child(config: Partial<LoggerConfig>)"
                    description="Create a child logger that inherits configuration from the parent."
                  />

                  <ApiMethod
                    name="time"
                    signature="logger.time(label: string)"
                    description="Start a timer with the given label for performance monitoring."
                  />

                  <ApiMethod
                    name="timeEnd"
                    signature="logger.timeEnd(label: string)"
                    description="End a timer and log the elapsed time."
                  />
                </div>

                <div className="mt-8 p-6 bg-card border-2 border-border shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Need More Help?</h3>
                  <p className="text-muted-foreground mb-4">
                    Check out our GitHub repository for examples, issues, and
                    contributions:
                  </p>
                  <a
                    href="https://github.com/Millosaurs/prettylogs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <Terminal className="h-4 w-4" />
                    View on GitHub
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarSection({
  title,
  icon,
  sectionId,
  collapsed,
  onToggle,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  sectionId: string;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase text-foreground hover:bg-muted transition-colors group border-l-2 border-transparent hover:border-primary"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        {collapsed ? (
          <ChevronRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <ChevronDown className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </button>
      {!collapsed && <div className="mt-1 space-y-0.5">{children}</div>}
    </div>
  );
}

function SidebarLink({
  href,
  active,
  onClick,
  icon,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`flex items-center gap-2 px-3 py-2 text-sm transition-all ${
        active
          ? "bg-primary/10 text-primary font-medium border-l-4 border-primary shadow-md"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-4 border-transparent hover:border-muted"
      }`}
    >
      <span className={active ? "text-primary" : "text-muted-foreground"}>
        {icon}
      </span>
      {children}
    </a>
  );
}

function LogLevelRow({
  level,
  color,
  description,
}: {
  level: string;
  color: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 p-5 bg-linear-to-r from-card to-card/50 border-2 border-border hover:border-primary transition-all shadow-md hover:shadow-lg">
      <div className={`w-4 h-4 ${color}`} />
      <div className="flex-1">
        <code className="text-base font-bold uppercase tracking-wide">
          {level}
        </code>
      </div>
      <div className="text-sm text-muted-foreground">{description}</div>
    </div>
  );
}

function ConfigOption({
  name,
  type,
  default: defaultValue,
  description,
}: {
  name: string;
  type: string;
  default: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-card border-2 border-border hover:border-primary transition-all shadow-md hover:shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <code className="text-base font-semibold text-primary">{name}</code>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 bg-muted border border-border">
            {type}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            default: {defaultValue}
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ApiMethod({
  name,
  signature,
  description,
}: {
  name: string;
  signature: string;
  description: string;
}) {
  return (
    <div className="p-6 bg-card border-2 border-border hover:border-primary transition-all shadow-md hover:shadow-lg">
      <div className="mb-3">
        <h4 className="text-base font-semibold mb-2 text-primary">{name}</h4>
        <code className="text-xs bg-muted px-3 py-2 border border-border block overflow-x-auto font-mono">
          {signature}
        </code>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
