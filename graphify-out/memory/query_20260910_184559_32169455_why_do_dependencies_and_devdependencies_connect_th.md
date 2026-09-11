---
type: "query"
date: "2026-09-10T18:45:59.358208+00:00"
question: "Why do dependencies and devDependencies connect their communities to Client Build & Tooling Config?"
contributor: "graphify"
source_nodes: ["client_package_dependencies", "client_package_devdependencies", "Client/package.json"]
---

# Q: Why do dependencies and devDependencies connect their communities to Client Build & Tooling Config?

## Answer

The dependencies and devDependencies nodes act as structural gateways. They are both contained within Client/package.json (which sits in the Build & Tooling Config community). From there, they fan out to completely different sets of tools: dependencies connects to all the UI/production libraries like React, Axios, and Tailwind (Client Production Dependencies community), while devDependencies connects to build tools like ESLint and Vite (Client Dev Dependencies community).

## Source Nodes

- client_package_dependencies
- client_package_devdependencies
- Client/package.json