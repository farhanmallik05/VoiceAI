---
type: "query"
date: "2026-09-10T18:55:25.018185+00:00"
question: "Trace the core data flows for Authentication, Assistant, and Billing."
contributor: "graphify"
source_nodes: ["Login()", "firebase.js", "auth.controller.js", "User", "askAssistant()", "generateGeminiResponse()", "billing.controller.js", "isAuth()"]
---

# Q: Trace the core data flows for Authentication, Assistant, and Billing.

## Answer

The graph traces three primary flows: (1) Authentication Flow: Client/src/pages/Login.jsx relies on Client/src/utils/firebase.js (auth, provider) for login, then uses axios to post to the ServerUrl (Server/Routes/auth.route.js). The router calls auth.controller.js (googleAuth), which checks the User model. (2) Assistant Flow: index.html embeds the Assistant Script (local_assistant_js), which hits assistant.route.js. This routes to assistant.controller.js (askAssistant), which calls generateGeminiResponse() from Server/Configs/gemini.js and updates the User model usage stats. (3) Billing Flow: billing.route.js protects endpoints using the isAuth() middleware. It calls billing.controller.js (createOrder, verifyBilling), which links the Razorpay payment to both the Billing model and the User model.

## Source Nodes

- Login()
- firebase.js
- auth.controller.js
- User
- askAssistant()
- generateGeminiResponse()
- billing.controller.js
- isAuth()