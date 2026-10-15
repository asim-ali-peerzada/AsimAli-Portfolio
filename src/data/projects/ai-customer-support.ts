
export const aiCustomerSupport = {
  title: "AI Assistant Platform",
  badge: 'Personal R&D · Python / FastAPI',
  description:
    "Omnichannel AI automation system built with FastAPI, combining RAG pipelines, Pinecone vector search, voice AI, and Meta WhatsApp Cloud API workflows.",
  niche: "Omnichannel AI Automation · RAG · Voice · WhatsApp Cloud API",
  image: '/images/ai-chatbot/ai-cover.webp',
  tags: ["FastAPI", "RAG Pipeline", "Pinecone Vector DB", "WhatsApp API"],
  coreCapabilities: [
    'FastAPI',
    'RAG Pipeline',
    'Pinecone Vector DB',
    'WhatsApp API',
  ],
  slug: "ai-assistant-platform",
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    "An omnichannel AI customer-engagement and workflow automation platform built as a personal R&D system exploring Python and applied AI architecture. It pairs a React operational dashboard with a FastAPI intelligence service—combining Pinecone vector search (RAG), document ingestion, STT/TTS voice pipelines, and Meta WhatsApp Cloud API webhooks for automated customer support.",
  problem:
    "Businesses increasingly require AI automation but struggle to securely integrate it with their proprietary data. Implementing intelligent chatbots often leads to disconnected workflows with poor data separation, lacking the proper backend infrastructure to securely manage access control, document processing, and multi-channel customer conversations.",
  solution:
    "Architected a full-stack platform that securely separates business workspace data while providing advanced conversational AI. The platform leverages a Python/FastAPI microservice for Retrieval-Augmented Generation (RAG) and multimodal processing, governed by a robust Laravel API layer that strictly enforces RBAC, subscription billing, and audit logging. This enables businesses to seamlessly inject proprietary documents into the AI's knowledge base via a high-performance React UI.",
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Backend & AI Engineer",
  platform: "FastAPI Automation & RAG Service",
  role: "Full-Stack Architect & Lead Engineer. Independently designed and developed the entire system from the ground up, establishing the Laravel API foundation, engineering the FastAPI AI service layer, and building the React frontend. Focus was on scalable product design, ensuring strict role-based access control, seamless cross-service API communication, and high-performance background job processing.",
  highlights: [
    "Microservices AI Architecture: Decoupled the application logic by routing core business operations through a Laravel API while delegating heavy LLM tasks and Vector DB (Pinecone) queries to a dedicated FastAPI engine.",
    "Retrieval-Augmented Generation (RAG): Engineered a document ingestion pipeline where businesses can upload proprietary knowledge, allowing the AI assistant to generate highly accurate, context-aware responses scoped to their own workspace.",
    "Workspace Data Separation: Implemented strict role-based access controls (RBAC), ensuring secure administration of users, billing, and AI settings across isolated business workspaces.",
    "Voice & Multimodal Workflows: Integrated advanced speech-to-text (Whisper/Deepgram) and text-to-speech (ElevenLabs/OpenAI) pipelines, facilitating fluid, real-time voice interactions alongside traditional text-based channels.",
    "Background Processing & Observability: Utilized Laravel queues for heavy data ingestion jobs and integrated observability tools (Telescope, Pulse) to monitor API latency, AI interaction health, and system audits.",
  ],
  // Ordered as the pipeline works: what it knows, where the knowledge comes
  // from, how it reaches people, what it actually says, then workspace access.
  screenshots: [
    '/images/ai-v2/screenshot-rocks (77).webp', // public landing
    '/images/ai-v2/screenshot-rocks (78).webp', // overview
    '/images/ai-v2/screenshot-rocks (80).webp', // the brain
    '/images/ai-v2/screenshot-rocks (82).webp', // documents
    '/images/ai-v2/screenshot-rocks (79).webp', // integrations
    '/images/ai-v2/screenshot-rocks (81).webp', // inbox
    '/images/ai-v2/screenshot-rocks (83).webp', // settings
  ],
};
