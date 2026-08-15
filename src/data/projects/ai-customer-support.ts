import cover from '@/assets/images/ai_chatbot/357shots_so.png';
import shot1 from '@/assets/images/ai_chatbot/60shots_so.png';
import shot2 from '@/assets/images/ai_chatbot/749shots_so.png';
import shot3 from '@/assets/images/ai_chatbot/909shots_so.png';
import shot4 from '@/assets/images/ai_chatbot/967shots_so.png';

export const aiCustomerSupport = {
  title: "AI Assistant Platform",
  description:
    "Multi-Tenant AI SaaS Platform for Intelligent Automation & Customer Engagement",
  niche:
    "Multi-Tenant AI SaaS Platform for Intelligent Automation & Customer Engagement",
  image: cover,
  tags: ["RAG", "AI Automation", "FastAPI", "Multi-Tenant"],
  slug: "ai-assistant-platform",
  services: [
    "Enterprise SaaS Development",
    "AI & LLM Integration (RAG)",
    "Microservices Architecture",
    "Multi-Tenant Backend Engineering",
  ],
  industry: ["AI", "SaaS", "Customer Engagement"],
  timeFrame: "12 Weeks",
  overview:
    "A comprehensive, multi-tenant AI SaaS platform engineered to unify business operations, intelligent automation, and customer engagement. The system utilizes a microservices architecture, bridging a React-based operational dashboard, a Laravel administrative backend, and a high-performance FastAPI intelligence engine to deliver text, voice, and document-based AI capabilities.",
  problem:
    "Businesses increasingly require AI automation but struggle to securely integrate it with their proprietary data. Implementing intelligent chatbots often leads to disconnected workflows with poor data isolation, lacking the proper backend infrastructure to securely manage multi-tenant access, document processing, and multi-channel customer conversations.",
  solution:
    "Architected a full-stack SaaS solution that securely isolates tenant data while providing advanced conversational AI. The platform leverages a Python/FastAPI microservice for Retrieval-Augmented Generation (RAG) and multimodal processing, governed by a robust Laravel API layer that strictly enforces RBAC, subscription billing, and audit logging. This enables businesses to seamlessly inject proprietary documents into the AI's knowledge base via a high-performance React UI.",
  role: "Full-Stack Architect & Lead Engineer. Independently designed and developed the entire system from the ground up, establishing the Laravel API foundation, engineering the FastAPI AI service layer, and building the React frontend. Focus was on scalable product design, ensuring secure tenant isolation, seamless cross-service API communication, and high-performance background job processing.",
  highlights: [
    "Microservices AI Architecture: Decoupled the application logic by routing core business operations through a Laravel API while delegating heavy LLM tasks and Vector DB (Pinecone) queries to a dedicated FastAPI engine.",
    "Retrieval-Augmented Generation (RAG): Engineered a document ingestion pipeline where businesses can upload proprietary knowledge, allowing the AI assistant to generate highly accurate, context-aware responses specific to each tenant.",
    "Multi-Tenant Data Isolation: Implemented strict tenant architecture and role-based access controls (RBAC), ensuring secure administration of users, billing, and AI settings across isolated business workspaces.",
    "Voice & Multimodal Workflows: Integrated advanced speech-to-text (Whisper/Deepgram) and text-to-speech (ElevenLabs/OpenAI) pipelines, facilitating fluid, real-time voice interactions alongside traditional text-based channels.",
    "Background Processing & Observability: Utilized Laravel queues for heavy data ingestion jobs and integrated observability tools (Telescope, Pulse) to monitor API latency, AI interaction health, and system audits.",
  ],
  keyTakeaway:
    "AI-powered automation must be backed by robust backend architecture to be production-ready. Decoupling AI processing into a dedicated microservice while keeping business logic in Laravel ensures scalability, maintainability, and secure tenant isolation.",
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
