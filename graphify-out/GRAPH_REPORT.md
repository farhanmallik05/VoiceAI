# Graph Report - 5.ShifraAI  (2026-09-11)

## Corpus Check
- Corpus is ~17,563 words - fits in a single context window. You may not need a graph.

## Summary
- 156 nodes · 237 edges · 14 communities (11 shown, 1 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.85)
- Token cost: 4,715 input · 1,052 output

## Community Hubs (Navigation)
- Client Pages & Routing
- User & Billing Services
- Client Build & Tooling Config
- Server Core Dependencies
- Assistant Engine & Server Entry
- Client Production Dependencies
- Client Dev Dependencies
- Server Runtime Dependencies
- Server Authentication & JWT
- Client NPM Build Scripts
- Web Entry & Script Embeds
- Media & Graphic Assets

## God Nodes (most connected - your core abstractions)
1. `react-router-dom` - 8 edges
2. `axios` - 6 edges
3. `react` - 6 edges
4. `react-hot-toast` - 6 edges
5. `express` - 6 edges
6. `scripts` - 5 edges
7. `ServerUrl` - 5 edges
8. `User` - 5 edges
9. `mongoose` - 4 edges
10. `generateGeminiResponse()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ShifraAI Logo` --semantically_similar_to--> `ShifraAI Logo Asset`  [INFERRED] [semantically similar]
  public/logo.png → src/assets/logo.png
- `askAssistant()` --calls--> `generateGeminiResponse()`  [EXTRACTED]
  Server/Controllers/assistant.controller.js → Server/Configs/gemini.js
- `googleAuth()` --calls--> `genToken()`  [EXTRACTED]
  Server/Controllers/auth.controller.js → Server/Configs/token.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Frontend Entry Flow** — index_html, client_src_main, local_assistant_js [EXTRACTED 0.90]

## Communities (14 total, 1 thin omitted)

### Community 0 - "Client Pages & Routing"
Cohesion: 0.13
Nodes (22): App(), CLIENT_URL, ServerUrl, AssistantPreview(), themes, Navbar(), ProtectedRoute(), Billing() (+14 more)

### Community 1 - "User & Billing Services"
Cohesion: 0.14
Nodes (15): crypto, jsonwebtoken, mongoose, createOrder(), verifyBilling(), getCurrentUser(), saveAssistant(), isAuth() (+7 more)

### Community 2 - "Client Build & Tooling Config"
Cohesion: 0.12
Nodes (18): name, private, type, version, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+10 more)

### Community 3 - "Server Core Dependencies"
Cohesion: 0.13
Nodes (14): cookie-parser, dotenv, nodemon, razorpay, razorpay, author, description, license (+6 more)

### Community 4 - "Assistant Engine & Server Entry"
Cohesion: 0.20
Nodes (10): cors, express, connectDB(), generateGeminiResponse(), askAssistant(), getAssistantConfig(), app, privateCors (+2 more)

### Community 5 - "Client Production Dependencies"
Cohesion: 0.20
Nodes (10): dependencies, axios, firebase, react, react-dom, react-hot-toast, react-icons, react-router-dom (+2 more)

### Community 6 - "Client Dev Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 7 - "Server Runtime Dependencies"
Cohesion: 0.20
Nodes (10): dependencies, cookie-parser, cors, crypto, dotenv, express, jsonwebtoken, mongoose (+2 more)

### Community 8 - "Server Authentication & JWT"
Cohesion: 0.48
Nodes (4): genToken(), googleAuth(), logOut(), authRouter

### Community 9 - "Client NPM Build Scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, preview

### Community 10 - "Web Entry & Script Embeds"
Cohesion: 0.40
Nodes (4): Assistant Script, ShifraAI Logo, Razorpay Checkout SDK, ShifraAI Logo Asset

## Knowledge Gaps
- **65 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 69 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-router-dom` connect `Client Pages & Routing` to `Client Build & Tooling Config`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Client Production Dependencies` to `Client Build & Tooling Config`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Client Dev Dependencies` to `Client Build & Tooling Config`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Client Pages & Routing` be split into smaller, more focused modules?**
  _Cohesion score 0.12903225806451613 - nodes in this community are weakly interconnected._
- **Should `User & Billing Services` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `Client Build & Tooling Config` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._