---
type: "query"
date: "2026-09-10T18:42:31.620401+00:00"
question: "Why does react-router-dom connect Client Pages & Routing to Client Build & Tooling Config?"
contributor: "graphify"
source_nodes: ["react-router-dom", "Client/package.json", "App.jsx", "Login.jsx"]
---

# Q: Why does react-router-dom connect Client Pages & Routing to Client Build & Tooling Config?

## Answer

react-router-dom acts as a bridge because it is declared as a dependency in Client/package.json (which belongs to the Build & Tooling Config community), but it provides the core routing logic imported by almost every frontend UI component like App.jsx, Login.jsx, Navbar.jsx, Billing.jsx, Home.jsx, and ProtectedRoute.jsx (which belong to the Client Pages & Routing community).

## Source Nodes

- react-router-dom
- Client/package.json
- App.jsx
- Login.jsx