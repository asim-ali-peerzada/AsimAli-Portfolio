import cover from '@/assets/images/ai_chatbot/357shots_so.png';
import shot1 from '@/assets/images/ai_chatbot/60shots_so.png';
import shot2 from '@/assets/images/ai_chatbot/749shots_so.png';
import shot3 from '@/assets/images/ai_chatbot/909shots_so.png';
import shot4 from '@/assets/images/ai_chatbot/967shots_so.png';

export const aiCustomerSupport = {
  title: "AI Assistant Platform",
  badge: 'Personal R&D · Python / FastAPI',
  description:
    "Omnichannel AI automation system built with FastAPI, combining RAG pipelines, Pinecone vector search, voice AI, and Meta WhatsApp Cloud API workflows.",
  niche: "Omnichannel AI Automation · RAG · Voice · WhatsApp Cloud API",
  image: '/images/ai-chatbot/ai-cover.webp',
  tags: ["FastAPI", "RAG Pipeline", "Pinecone Vector DB", "WhatsApp API"],
  slug: "ai-assistant-platform",
  services: [
    "Enterprise SaaS Development",
    "AI & LLM Integration (RAG)",
    "Microservices Architecture",
    "Business Workspace Backend",
  ],
  industry: ["AI", "SaaS", "Customer Engagement"],
  timeFrame: "12 Weeks",
  // Set the real year(s) before publishing, e.g. "2025" or "2025 - 2026".
  // Left blank on purpose: an unverified date on a public CV is worse than none.
  // Repo commit history is a starting point, not the answer - confirm with the user.
  year: "",
  overview:
    "A comprehensive AI automation platform engineered to unify business operations, intelligent automation, and customer engagement. The system utilizes a microservices architecture, bridging a React-based operational dashboard, a Laravel administrative backend, and a high-performance FastAPI intelligence engine to deliver text, voice, and document-based AI capabilities.",
  problem:
    "Businesses increasingly require AI automation but struggle to securely integrate it with their proprietary data. Implementing intelligent chatbots often leads to disconnected workflows with poor data separation, lacking the proper backend infrastructure to securely manage access control, document processing, and multi-channel customer conversations.",
  solution:
    "Architected a full-stack platform that securely separates business workspace data while providing advanced conversational AI. The platform leverages a Python/FastAPI microservice for Retrieval-Augmented Generation (RAG) and multimodal processing, governed by a robust Laravel API layer that strictly enforces RBAC, subscription billing, and audit logging. This enables businesses to seamlessly inject proprietary documents into the AI's knowledge base via a high-performance React UI.",
  // Short display values for the case-study header. The long-form `role`
  // paragraph stays for the "What I built" section.
  roleTitle: "Full-Stack Architect",
  platform: "Web App + AI Service",
  role: "Full-Stack Architect & Lead Engineer. Independently designed and developed the entire system from the ground up, establishing the Laravel API foundation, engineering the FastAPI AI service layer, and building the React frontend. Focus was on scalable product design, ensuring strict role-based access control, seamless cross-service API communication, and high-performance background job processing.",
  highlights: [
    "Microservices AI Architecture: Decoupled the application logic by routing core business operations through a Laravel API while delegating heavy LLM tasks and Vector DB (Pinecone) queries to a dedicated FastAPI engine.",
    "Retrieval-Augmented Generation (RAG): Engineered a document ingestion pipeline where businesses can upload proprietary knowledge, allowing the AI assistant to generate highly accurate, context-aware responses scoped to their own workspace.",
    "Workspace Data Separation: Implemented strict role-based access controls (RBAC), ensuring secure administration of users, billing, and AI settings across isolated business workspaces.",
    "Voice & Multimodal Workflows: Integrated advanced speech-to-text (Whisper/Deepgram) and text-to-speech (ElevenLabs/OpenAI) pipelines, facilitating fluid, real-time voice interactions alongside traditional text-based channels.",
    "Background Processing & Observability: Utilized Laravel queues for heavy data ingestion jobs and integrated observability tools (Telescope, Pulse) to monitor API latency, AI interaction health, and system audits.",
  ],
  keyTakeaway:
    "AI-powered automation must be backed by robust backend architecture to be production-ready. Decoupling AI processing into a dedicated microservice while keeping business logic in Laravel ensures scalability, maintainability, and strict role-based access control.",
  tools: [
    "Laravel (PHP)",
    "FastAPI (Python)",
    "React (Vite, Tailwind)",
    "Pinecone (Vector DB)",
    "OpenAI / Google Gemini",
    "LangChain / LangGraph",
  ],
  screenshots: [
    cover,
    shot1,
    shot2,
    shot3,
    shot4,
  ],
};
