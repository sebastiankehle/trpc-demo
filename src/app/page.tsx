"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Play, Pause } from "lucide-react";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sections = [
    "Introduction",
    "What is tRPC?",
    "The Problem",
    "tRPC vs Alternatives",
    "How tRPC Works",
    "Building with tRPC",
    "Real-World Example",
    "Developer Experience",
    "When to Use tRPC",
    "Documentation",
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [sections.length]);

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentSection(Math.max(currentSection - 1, 0))}
              disabled={currentSection === 0}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                    index === currentSection
                      ? "bg-primary"
                      : index < currentSection
                      ? "bg-muted-foreground"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setCurrentSection(
                  Math.min(currentSection + 1, sections.length - 1)
                )
              }
              disabled={currentSection === sections.length - 1}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            <div className="hidden sm:block text-sm text-muted-foreground">
              Use ← → arrows to navigate
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {currentSection + 1} / {sections.length}
            </span>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <div className="h-[calc(100vh-4rem)] mt-16 relative">
        {sections.map((_, index) => (
          <section
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${
              currentSection === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 py-8 min-h-full flex flex-col justify-center">
              {/* Section content */}
            </div>
          </section>
        ))}

        {/* Introduction Section - Side by side layout */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${
            currentSection === 0 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 min-h-full flex flex-col justify-center">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-left relative order-2 lg:order-1 lg:pr-8">
                <div className="absolute -top-24 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative">
                  <span className="inline-block text-primary text-lg font-semibold mb-4 px-4 py-1 bg-primary/10 rounded-full">
                    End-to-end typesafe APIs
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">
                    Move Fast and{" "}
                    <span className="text-primary">Break Nothing</span>
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Build APIs with confidence using TypeScript's powerful type
                    inference. No schemas, no code generation, just pure
                    developer happiness.
                  </p>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <video
                  ref={videoRef}
                  className="w-full rounded-lg"
                  src="https://assets.trpc.io/www/v10/v10-dark-landscape.mp4"
                  loop
                  muted
                  playsInline
                  autoPlay
                />
              </div>
            </div>
          </div>
        </section>

        {/* What is tRPC? */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${
            currentSection === 1 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 min-h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center mb-12 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                What is tRPC?
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                tRPC is a modern approach to building APIs that prioritizes
                developer experience and type safety.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "How it Works",
                  description:
                    "tRPC leverages TypeScript's type inference to automatically propagate your API types.",
                  features: [
                    "Define your API procedures on the server",
                    "TypeScript automatically infers the types",
                    "Client gets full type safety and autocompletion",
                    "No manual type synchronization needed",
                  ],
                  icon: "⚡",
                  color: "blue",
                },
                {
                  title: "Key Benefits",
                  description:
                    "Experience superior developer experience while maintaining high performance.",
                  features: [
                    "Full static type safety without schemas",
                    "Automatic API documentation via TypeScript",
                    "Excellent IDE support with autocompletion",
                    "Minimal bundle size impact",
                  ],
                  icon: "✨",
                  color: "purple",
                },
              ].map((block, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl border bg-gradient-to-br from-${block.color}-500/5 to-${block.color}-500/10 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-${block.color}-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16`}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-2xl bg-${block.color}-500/10 rounded-lg w-10 h-10 flex items-center justify-center`}
                      >
                        {block.icon}
                      </span>
                      <h3 className="text-2xl font-semibold">{block.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {block.description}
                    </p>
                    <ul className="space-y-3">
                      {block.features.map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <span
                            className={`w-5 h-5 rounded-full bg-${block.color}-500/10 text-${block.color}-500 flex items-center justify-center text-sm`}
                          >
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${
            currentSection === 2 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 min-h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center mb-12 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-destructive/10 rounded-full blur-2xl" />
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                The Problem with Traditional APIs
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Building type-safe APIs has traditionally been a complex and
                error-prone process.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Type Safety Gap",
                  description:
                    "The disconnect between frontend and backend types leads to runtime errors.",
                  features: [
                    "Manual type definitions",
                    "Type mismatches",
                    "Runtime errors",
                    "Development delays",
                  ],
                  icon: "⚠️",
                  color: "red",
                },
                {
                  title: "Schema Overhead",
                  description:
                    "Traditional solutions require extensive schema definitions.",
                  features: [
                    "Complex setup",
                    "Schema maintenance",
                    "Code generation",
                    "Build pipeline complexity",
                  ],
                  icon: "📝",
                  color: "orange",
                },
                {
                  title: "Developer Experience",
                  description:
                    "Poor tooling and complex workflows slow down development.",
                  features: [
                    "Limited autocomplete",
                    "Documentation overhead",
                    "Debugging challenges",
                    "Steep learning curve",
                  ],
                  icon: "🔧",
                  color: "yellow",
                },
              ].map((block, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl border bg-gradient-to-br from-${block.color}-500/5 to-${block.color}-500/10 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-${block.color}-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16`}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-2xl bg-${block.color}-500/10 rounded-lg w-10 h-10 flex items-center justify-center`}
                      >
                        {block.icon}
                      </span>
                      <h3 className="text-2xl font-semibold">{block.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {block.description}
                    </p>
                    <ul className="space-y-3">
                      {block.features.map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <span
                            className={`w-5 h-5 rounded-full bg-${block.color}-500/10 text-${block.color}-500 flex items-center justify-center text-sm`}
                          >
                            ✗
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* tRPC vs Alternatives */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${
            currentSection === 3 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 min-h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center mb-12 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                tRPC vs Alternatives
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Understanding how tRPC compares to other API architectures helps
                highlight its unique advantages.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "REST",
                  description: "Traditional choice for web APIs",
                  pros: [
                    "Industry standard",
                    "Wide support",
                    "Great for public APIs",
                  ],
                  cons: [
                    "Manual type definitions",
                    "Extensive documentation needed",
                    "No built-in type safety",
                  ],
                  color: "blue",
                  icon: "🌐",
                },
                {
                  title: "GraphQL",
                  description: "Flexible data fetching with schemas",
                  pros: ["Flexible queries", "Strong schema", "Built-in docs"],
                  cons: [
                    "Complex setup",
                    "Code generation needed",
                    "Higher learning curve",
                  ],
                  color: "pink",
                  icon: "📊",
                },
                {
                  title: "tRPC",
                  description: "TypeScript-first API development",
                  pros: [
                    "End-to-end type safety",
                    "No code generation",
                    "Great DX",
                  ],
                  cons: [
                    "TypeScript only",
                    "Not for public APIs",
                    "New ecosystem",
                  ],
                  color: "green",
                  icon: "⚡",
                },
              ].map((platform) => (
                <div
                  key={platform.title}
                  className={`p-6 rounded-xl border bg-gradient-to-br from-${platform.color}-500/5 to-${platform.color}-500/10 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-${platform.color}-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16`}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-2xl bg-${platform.color}-500/10 rounded-lg w-10 h-10 flex items-center justify-center`}
                      >
                        {platform.icon}
                      </span>
                      <h3 className="text-2xl font-semibold">
                        {platform.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {platform.description}
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h4
                          className={`text-sm font-medium text-${platform.color}-500 mb-2`}
                        >
                          Advantages
                        </h4>
                        <ul className="space-y-2">
                          {platform.pros.map((pro) => (
                            <li
                              key={pro}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <span
                                className={`w-5 h-5 rounded-full bg-${platform.color}-500/10 text-${platform.color}-500 flex items-center justify-center text-sm`}
                              >
                                ✓
                              </span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4
                          className={`text-sm font-medium text-${platform.color}-500 mb-2`}
                        >
                          Limitations
                        </h4>
                        <ul className="space-y-2">
                          {platform.cons.map((con) => (
                            <li
                              key={con}
                              className="flex items-center gap-2 text-muted-foreground"
                            >
                              <span
                                className={`w-5 h-5 rounded-full bg-${platform.color}-500/10 text-${platform.color}-500 flex items-center justify-center text-sm`}
                              >
                                -
                              </span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How tRPC Works */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${
            currentSection === 4 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 min-h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center mb-12 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                How tRPC Works
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                tRPC uses TypeScript's type inference to create a seamless
                bridge between your client and server.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "1. Define Procedures",
                  description:
                    "Write your API endpoints as TypeScript functions",
                  features: [
                    "Regular TypeScript functions",
                    "Type-safe inputs",
                    "Automatic type inference",
                    "Built-in validation",
                  ],
                  icon: "📝",
                  color: "emerald",
                },
                {
                  title: "2. Type Propagation",
                  description: "Types automatically flow from server to client",
                  features: [
                    "Zero type definitions",
                    "End-to-end type safety",
                    "Automatic updates",
                    "IDE integration",
                  ],
                  icon: "🔄",
                  color: "emerald",
                },
                {
                  title: "3. Client Usage",
                  description:
                    "Use your API with full type safety and autocompletion",
                  features: [
                    "Type-safe calls",
                    "Rich autocompletion",
                    "Runtime validation",
                    "Error handling",
                  ],
                  icon: "💻",
                  color: "emerald",
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl border bg-gradient-to-br from-${step.color}-500/5 to-${step.color}-500/10 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-${step.color}-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16`}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-2xl bg-${step.color}-500/10 rounded-lg w-10 h-10 flex items-center justify-center`}
                      >
                        {step.icon}
                      </span>
                      <h3 className="text-2xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.features.map((feature, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <span
                            className={`w-5 h-5 rounded-full bg-${step.color}-500/10 text-${step.color}-500 flex items-center justify-center text-sm`}
                          >
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Building with tRPC */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 ${
            currentSection === 5 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Building with tRPC
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Create type-safe APIs with minimal boilerplate and maximum
                developer experience.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Server Side</h3>
                  <div className="bg-muted/50 rounded-lg p-6 font-mono text-sm">
                    <pre className="text-foreground">
                      <span className="text-blue-500">const</span>{" "}
                      <span className="text-emerald-500">userRouter</span>{" "}
                      <span className="text-blue-500">=</span>{" "}
                      <span className="text-emerald-500">router</span>({"{"}
                      {"\n  "}
                      <span className="text-emerald-500">getUser</span>:{" "}
                      <span className="text-emerald-500">publicProcedure</span>
                      {"\n    "}.<span className="text-emerald-500">input</span>
                      (<span className="text-emerald-500">z</span>.
                      <span className="text-emerald-500">string</span>())
                      {"\n    "}.<span className="text-emerald-500">query</span>
                      (<span className="text-blue-500">async</span> ({"{"}
                      {" input "}
                      {"}"}) {"=>"} {"{"}
                      {"\n      "}
                      <span className="text-blue-500">return</span>{" "}
                      <span className="text-emerald-500">db</span>.
                      <span className="text-emerald-500">user</span>.
                      <span className="text-emerald-500">findUnique</span>({"{"}
                      ){"\n        "}where: {"{"} id: input {"}"}
                      {"\n      "}
                      {"}"});{"\n    "}
                      {"}"}){"\n"}
                      {"}"});
                    </pre>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Client Side</h3>
                  <div className="bg-muted/50 rounded-lg p-6 font-mono text-sm">
                    <pre className="text-foreground">
                      <span className="text-slate-500">
                        // Use with full type safety
                      </span>
                      {"\n"}
                      <span className="text-blue-500">const</span>{" "}
                      <span className="text-emerald-500">user</span>{" "}
                      <span className="text-blue-500">=</span>{" "}
                      <span className="text-blue-500">await</span>{" "}
                      <span className="text-emerald-500">trpc</span>.
                      <span className="text-emerald-500">user</span>.
                      <span className="text-emerald-500">getUser</span>.
                      <span className="text-emerald-500">query</span>(
                      <span className="text-orange-400">'123'</span>);
                      {"\n\n"}
                      <span className="text-slate-500">
                        // TypeScript error if id is not a string
                      </span>
                      {"\n"}
                      <span className="text-blue-500">const</span>{" "}
                      <span className="text-emerald-500">error</span>{" "}
                      <span className="text-blue-500">=</span>{" "}
                      <span className="text-blue-500">await</span>{" "}
                      <span className="text-emerald-500">trpc</span>.
                      <span className="text-emerald-500">user</span>.
                      <span className="text-emerald-500">getUser</span>.
                      <span className="text-emerald-500">query</span>(
                      <span className="text-purple-400">123</span>);
                      {"\n\n"}
                      <span className="text-slate-500">
                        // Autocomplete for user properties
                      </span>
                      {"\n"}
                      <span className="text-emerald-500">console</span>.
                      <span className="text-emerald-500">log</span>(user.name);
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Real-World Example */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 ${
            currentSection === 6 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Real-World Example
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                See how tRPC transforms a typical CRUD application.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Without tRPC</h3>
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-6 font-mono text-sm">
                    <pre className="text-foreground">
                      <span className="text-slate-500">// Define types</span>
                      {"\n"}
                      <span className="text-blue-500">interface</span>{" "}
                      <span className="text-emerald-500">User</span> {"{"}
                      {"\n  "}
                      <span className="text-emerald-500">id</span>:{" "}
                      <span className="text-blue-500">string</span>;{"\n  "}
                      <span className="text-emerald-500">name</span>:{" "}
                      <span className="text-blue-500">string</span>;{"\n"}
                      {"}"}
                      {"\n\n"}
                      <span className="text-slate-500">
                        // Define API endpoints
                      </span>
                      {"\n"}
                      <span className="text-emerald-500">app</span>.
                      <span className="text-emerald-500">get</span>(
                      <span className="text-orange-400">'/api/users/:id'</span>,{" "}
                      <span className="text-blue-500">async</span> (req, res){" "}
                      {"=>"} {"{"}
                      {"\n  "}
                      <span className="text-blue-500">const</span>{" "}
                      <span className="text-emerald-500">user</span>{" "}
                      <span className="text-blue-500">=</span>{" "}
                      <span className="text-blue-500">await</span>{" "}
                      <span className="text-emerald-500">db</span>.
                      <span className="text-emerald-500">user</span>.
                      <span className="text-emerald-500">findUnique</span>({"{"}
                      ){"\n    "}where: {"{"} id: req.params.id {"}"}
                      {"\n  "}
                      {"}"});{"\n  "}
                      <span className="text-emerald-500">res</span>.
                      <span className="text-emerald-500">json</span>(user);
                      {"\n"}
                      {"}"});{"\n\n"}
                      <span className="text-slate-500">// Client usage</span>
                      {"\n"}
                      <span className="text-blue-500">const</span>{" "}
                      <span className="text-emerald-500">response</span>{" "}
                      <span className="text-blue-500">=</span>{" "}
                      <span className="text-blue-500">await</span>{" "}
                      <span className="text-emerald-500">fetch</span>(
                      <span className="text-orange-400">'/api/users/123'</span>
                      );{"\n"}
                      <span className="text-blue-500">const</span>{" "}
                      <span className="text-emerald-500">user</span>{" "}
                      <span className="text-blue-500">=</span>{" "}
                      <span className="text-blue-500">await</span>{" "}
                      <span className="text-emerald-500">response</span>.
                      <span className="text-emerald-500">json</span>();{"\n"}
                      <span className="text-slate-500">// No type safety!</span>
                    </pre>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">With tRPC</h3>
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-6 font-mono text-sm">
                    <pre className="text-foreground">
                      <span className="text-slate-500">
                        // Server procedure
                      </span>
                      {"\n"}
                      <span className="text-blue-500">const</span>{" "}
                      <span className="text-emerald-500">userRouter</span>{" "}
                      <span className="text-blue-500">=</span>{" "}
                      <span className="text-emerald-500">router</span>({"{"}
                      {"\n  "}
                      <span className="text-emerald-500">getUser</span>:{" "}
                      <span className="text-emerald-500">publicProcedure</span>
                      {"\n    "}.<span className="text-emerald-500">input</span>
                      (<span className="text-emerald-500">z</span>.
                      <span className="text-emerald-500">string</span>())
                      {"\n    "}.<span className="text-emerald-500">query</span>
                      (<span className="text-blue-500">async</span> ({"{"}
                      {" input "}
                      {"}"}) {"=>"} {"{"}
                      {"\n      "}
                      <span className="text-blue-500">return</span>{" "}
                      <span className="text-emerald-500">db</span>.
                      <span className="text-emerald-500">user</span>.
                      <span className="text-emerald-500">findUnique</span>({"{"}
                      ){"\n        "}where: {"{"} id: input {"}"}
                      {"\n      "}
                      {"}"});{"\n    "}
                      {"}"}){"\n"}
                      {"}"});{"\n\n"}
                      <span className="text-slate-500">// Client usage</span>
                      {"\n"}
                      <span className="text-blue-500">const</span>{" "}
                      <span className="text-emerald-500">user</span>{" "}
                      <span className="text-blue-500">=</span>{" "}
                      <span className="text-blue-500">await</span>{" "}
                      <span className="text-emerald-500">trpc</span>.
                      <span className="text-emerald-500">user</span>.
                      <span className="text-emerald-500">getUser</span>.
                      <span className="text-emerald-500">query</span>(
                      <span className="text-orange-400">'123'</span>);{"\n"}
                      <span className="text-slate-500">// Fully typed! ✨</span>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Experience */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${
            currentSection === 7 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 min-h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center mb-12 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Developer Experience
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                tRPC provides an unmatched developer experience that speeds up
                development and reduces errors.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  title: "IDE Integration",
                  description: "First-class IDE support with TypeScript",
                  features: [
                    "Rich autocompletion",
                    "Inline documentation",
                    "Type hints",
                    "Error detection",
                  ],
                  icon: "💡",
                  color: "purple",
                },
                {
                  title: "Rapid Development",
                  description: "Focus on business logic, not API plumbing",
                  features: [
                    "Zero boilerplate",
                    "Automatic types",
                    "Quick iterations",
                    "Easy refactoring",
                  ],
                  icon: "⚡",
                  color: "purple",
                },
                {
                  title: "Type Safety",
                  description: "Catch errors before they reach production",
                  features: [
                    "Compile-time checks",
                    "Runtime validation",
                    "API consistency",
                    "Safe updates",
                  ],
                  icon: "🛡️",
                  color: "purple",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl border bg-gradient-to-br from-${feature.color}-500/5 to-${feature.color}-500/10 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-${feature.color}-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16`}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`text-2xl bg-${feature.color}-500/10 rounded-lg w-10 h-10 flex items-center justify-center`}
                      >
                        {feature.icon}
                      </span>
                      <h3 className="text-2xl font-semibold">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.features.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <span
                            className={`w-5 h-5 rounded-full bg-${feature.color}-500/10 text-${feature.color}-500 flex items-center justify-center text-sm`}
                          >
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When to Use tRPC */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${
            currentSection === 8 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 min-h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center mb-12 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                When to Use tRPC
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Understanding when tRPC is the right choice for your project.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="p-6 rounded-xl border bg-gradient-to-br from-green-500/5 to-green-500/10 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl bg-green-500/10 rounded-lg w-10 h-10 flex items-center justify-center">
                      ✓
                    </span>
                    <h3 className="text-2xl font-semibold">Perfect For</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Full-stack TypeScript applications",
                      "Internal tools and dashboards",
                      "Rapid prototyping and MVPs",
                      "Teams prioritizing developer experience",
                      "Projects requiring strict type safety",
                      "Monorepo architectures",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-lg text-muted-foreground"
                      >
                        <span className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-sm">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 rounded-xl border bg-gradient-to-br from-orange-500/5 to-orange-500/10 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl bg-orange-500/10 rounded-lg w-10 h-10 flex items-center justify-center">
                      !
                    </span>
                    <h3 className="text-2xl font-semibold">
                      Consider Alternatives When
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Building public APIs",
                      "Using non-TypeScript clients",
                      "Requiring schema documentation",
                      "Needing GraphQL-style partial responses",
                      "Working with legacy systems",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-lg text-muted-foreground"
                      >
                        <span className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center text-sm">
                          !
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Documentation */}
        <section
          className={`absolute inset-0 transition-opacity duration-300 overflow-y-auto ${
            currentSection === 9 ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-8 min-h-full flex flex-col justify-center">
            <div className="max-w-3xl mx-auto text-center mb-12 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Get Started with tRPC
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Comprehensive documentation and resources to help you build
                type-safe APIs
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <a
                href="https://trpc.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-xl border bg-gradient-to-br from-blue-500/5 to-blue-500/10 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl bg-blue-500/10 rounded-lg w-10 h-10 flex items-center justify-center">
                      📚
                    </span>
                    <h3 className="text-2xl font-semibold">Documentation</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Explore the comprehensive guides, tutorials, and API
                    reference
                  </p>
                  <span className="text-blue-500 group-hover:text-blue-400 transition-colors duration-200">
                    Visit Documentation →
                  </span>
                </div>
              </a>
              <a
                href="https://github.com/trpc/trpc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-xl border bg-gradient-to-br from-purple-500/5 to-purple-500/10 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -translate-y-16 translate-x-16" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl bg-purple-500/10 rounded-lg w-10 h-10 flex items-center justify-center">
                      💻
                    </span>
                    <h3 className="text-2xl font-semibold">GitHub</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Check out the source code, examples, and contribute to the
                    project
                  </p>
                  <span className="text-purple-500 group-hover:text-purple-400 transition-colors duration-200">
                    View on GitHub →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
