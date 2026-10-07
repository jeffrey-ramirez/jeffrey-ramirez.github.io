import type { ApproachStep } from "./types";

export const approach: ApproachStep[] = [
  {
    number: "01",
    title: "Understand",
    description: "Understand the product, users, requirements, and existing architecture.",
    principles: ["Read the code before rewriting it", "Ask what problem the user actually has"],
  },
  {
    number: "02",
    title: "Architect",
    description: "Design maintainable components and scalable application structures.",
    principles: ["Clear boundaries over clever abstractions", "Design the data flow first"],
  },
  {
    number: "03",
    title: "Build",
    description: "Develop clean, reusable, and performant frontend and full-stack solutions.",
    principles: ["Small, reviewable changes", "Accessible and typed by default"],
  },
  {
    number: "04",
    title: "Improve",
    description: "Optimize performance, simplify code, and continuously improve developer experience.",
    principles: ["Measure before optimizing", "Leave the codebase easier to work in"],
  },
];
