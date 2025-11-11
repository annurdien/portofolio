export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  links: ProjectLink[];
  category: string;
  year: number;
  status: "Shipped" | "In Beta" | "Exploration";
  featured?: boolean;
  metrics?: string;
  tags?: string[];
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "swift-inspector",
    title: "Swift Inspector",
    summary: "Compiler stage output inspector for Swift programming language",
    description:
      "A Web app that allows Swift programmers to visualize and analyze the output of different compiler stages, aiding in debugging and optimization of Swift code.",
  tech: ["Python"],
    links: [
      { label: "Live", href: "https://swift.rasyid.codes" },
      { label: "GitHub", href: "https://github.com/annurdien/swift-inspector" }
    ],
    category: "Tools",
    year: 2025,
    status: "Shipped",
    featured: true,
    tags: ["Swift", "Compiler"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "bcc",
    title: "bcc",
    summary: "Bakpia C Compiler",
    description:
      "My implementation of C compiler written in Swift",
  tech: ["Swift"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/bcc" }
    ],
    category: "Compiler",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Swift", "Compiler"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "chip8-emulator",
    title: "chip8",
    summary: "Emulator for CHIP-8 system",
    description:
      "My implementation of CHIP-8 emulator written in C++ language, this is from article series Writing chip-8 emulator in C++",
  tech: ["C++"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/chip8" }
    ],
    category: "Emulator",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["C++", "Emulator"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "toasty",
    title: "Toasty",
    summary: "Toast made easy in SwiftUI",
    description:
      "A lightweight Swift package that simplifies the process of displaying toast notifications in SwiftUI applications",
  tech: ["Swift"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/Toasty" }
    ],
    category: "Library",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Swift", "SwiftUI"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "import-formatter",
    title: "Import Formatter",
    summary: "A CLI tool to format import statements in Swift files",
    description:
      "A command-line tool that automatically formats and organizes import statements in Swift source files to enhance code readability and maintainability.",
  tech: ["Swift"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/ImportFormatter" }
    ],
    category: "Tools",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Swift", "Tools"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "flutter-clean-architecture",
    title: "Flutter Clean Architecture",
    summary: "A starter template for Flutter apps using Clean Architecture",
    description:
      "A boilerplate project that demonstrates the implementation of Clean Architecture principles in Flutter applications, promoting maintainable and scalable codebases.",
  tech: ["Flutter"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/flutter_clean_architecture" }
    ],
    category: "Library",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Flutter", "Clean Architecture"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "populate",
    title: "populate",
    summary: "Swift macro to populate data models with sample data",
    description:
      "A Swift macro that automatically generates sample data for data models, facilitating easier testing and prototyping during development.",
  tech: ["Swift"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/populate" }
    ],
    category: "Library",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Swift", "Macro"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "sim-cli",
    title: "sim cli",
    summary: "CLI tool to manage iOS and Android simulators",
    description:
      "A command-line interface tool that simplifies the management of iOS and Android simulators, allowing developers to easily start, stop, and configure simulators from the terminal.",
  tech: ["Go"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/sim-cli" }
    ],
    category: "Tools",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["go", "CLI"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "sigma",
    title: "sigma",
    summary: "Web app to generate or convert dataset for LLM fine tuning",
    description:
      "A web application that facilitates the generation and conversion of datasets specifically designed for fine-tuning large language models (LLMs), streamlining the preparation process for machine learning tasks.",
  tech: ["TypeScript"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/sigma" }
    ],
    category: "Tools",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["LLM", "Web App"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "http-rust",
    title: "http rust",
    summary: "Http 1.0 implementation in Rust",
    description:
      "A simple implementation of HTTP 1.0 protocol in Rust programming language, demonstrating the fundamentals of handling HTTP requests and responses.",
  tech: ["Rust"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/http-rust" }
    ],
    category: "Library",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Rust", "Library"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "wing",
    title: "Wing",
    summary: "Collection of native Swift extensions and property wrappers",
    description:
      "A collection of native Swift extensions and property wrappers that enhance the functionality and usability of Swift programming language features.",
  tech: ["Swift"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/Wing" }
    ],
    category: "Library",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Swift", "Library"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "what-snap",
    title: "WhatSnap",
    summary: "iOS app to scan phone number and start WhatsApp chat",
    description:
      "An iOS application that enables users to quickly scan a phone number and initiate a WhatsApp chat without the need to save the contact in their address book.",
  tech: ["Swift"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/WhatSnap" }
    ],
    category: "iOS App",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Swift", "iOS App"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "pes-joke",
    title: "Pes Joke",
    summary: "iOS app to give you dad jokes of the day",
    description:
      "An iOS application that delivers a daily dose of dad jokes to users, providing light-hearted humor and entertainment.",
  tech: ["Swift"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/pes-joke" }
    ],
    category: "iOS App",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Swift", "iOS App"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "mrs-server",
    title: "mrs",
    summary: "Home automation server written in Rust",
    description:
      "A home automation server built using Rust programming language, designed to manage and control various smart home devices and systems efficiently and securely.",
  tech: ["Rust"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/mrs-server" }
    ],
    category: "Tools",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Rust", "Tools"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "cloudflare-r2",
    title: "cloudflare r2",
    summary: "Cloudflare R2 client library in Typescript",
    description:
      "A TypeScript client library for interacting with Cloudflare R2, enabling developers to easily integrate R2 storage capabilities into their applications.",
  tech: ["TypeScript"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/cloudflare-r2-with-stream" }
    ],
    category: "Library",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["TypeScript", "Library"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "idlix-api",
    title: "Idlix API",
    summary: "Idlix streaming scraper API in TypeScript",
    description:
      "A TypeScript API that scrapes streaming data from Idlix, providing developers with programmatic access to Idlix's streaming content for integration into their applications.",
  tech: ["TypeScript"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/IDLIX-API" }
    ],
    category: "Library",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["TypeScript", "Library"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "karat",
    title: "karat",
    summary: "Rust programming language, in Indonesian",
    description:
      "Meme project, Rust programming syntax in Indonesian language",
  tech: ["Rust"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/karat" }
    ],
    category: "Compiler",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["Rust", "Compiler"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "steam-idler",
    title: "steam idler",
    summary: "Steam game idler bot",
    description:
      "A bot that idles Steam games to accumulate playtime or achieve other in game benefits automatically.",
  tech: ["TypeScript"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/steam-idler" }
    ],
    category: "Tools",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["TypeScript", "Tools"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "git-cheater",
    title: "git cheater",
    summary: "Beautify git cendol in your github profile",
    description:
      "A tool that helps you to beautify your git cendol in your github profile by creating fake commits to increase your github contribution graph",
  tech: ["TypeScript"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/git-cheater" }
    ],
    category: "Tools",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["TypeScript", "Tools"],
    image: "/images/project-placeholder.svg"
  },
  {
    slug: "mpilot",
    title: "M Pliot",
    summary: "Intuitive and powerful ground control station (GCS) for UAVs.",
    description:
      "M Pliot is a ground control station (GCS) software designed for operating and managing unmanned aerial vehicles (UAVs). It provides an intuitive interface and powerful features to enhance the UAV piloting experience.",
  tech: ["C++"],
    links: [
      { label: "GitHub", href: "https://github.com/annurdien/MPILOT" }
    ],
    category: "Tools",
    year: 2025,
    status: "Shipped",
    featured: false,
    tags: ["C++", "Tools"],
    image: "/images/project-placeholder.svg"
  },
];
