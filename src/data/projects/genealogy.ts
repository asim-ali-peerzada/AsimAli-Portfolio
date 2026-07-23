import platformOverview from '@/assets/images/ft/ft-platform-overview.png';
import mainDashboard from '@/assets/images/ft/ft-main-dashboard.png';
import conversations from '@/assets/images/ft/ft-conversations.png';
import ticketPipeline from '@/assets/images/ft/ft-ticket-pipeline.png';
import guestWidget from '@/assets/images/ft/ft-guest-widget.png';
import directory from '@/assets/images/ft/ft-directory.png';
import collab from '@/assets/images/ft/collab.png';
import gedcom from '@/assets/images/ft/gedcom.png';

export const genealogy = {
  title: 'Genealogy SaaS Platform',
  niche: 'Multi-Tenant Family History & Archival Platform',
  image: platformOverview,
  tags: ['OCR', 'GEDCOM', 'NARA'],
  slug: 'genealogy-saas-platform',
  services: ['Enterprise SaaS Development', 'API Integrations', 'OCR Processing'],
  industry: ['Family History', 'Archival'],
  timeFrame: '10 Weeks',
  overview:
    'A multi-tenant platform preserving family history through intelligent record matching, OCR processing, and collaborative family trees.',
  problem:
    'Family history research is fragmented across disconnected archives, proprietary formats, and manual record-matching processes. Researchers struggle to connect disparate historical records into coherent family narratives.',
  solution:
    'Built a scalable genealogy platform with NARA and OpenArch API integrations for automated historical record discovery. Implemented OCR-based document extraction and intelligent record-matching algorithms to connect family trees across distributed data sources.',
  role: 'Lead Backend Developer - Architected the API layer, integrated external archival APIs, built the OCR processing pipeline, and designed the multi-tenant data isolation model.',
  highlights: [
    'NARA & OpenArch API integration for automated historical record discovery',
    'OCR-based document extraction and text recognition pipeline',
    'Intelligent record-matching algorithm for cross-source family tree connections',
    'Multi-tenant architecture with isolated family tree data per lineage',
    'Collaborative tree editing with real-time sync across family members',
  ],
  keyTakeaway:
    'Historical record processing at scale requires robust OCR pipelines and intelligent fuzzy-matching algorithms. Combining API integrations with automated extraction transforms weeks of manual research into seconds of computation.',
  tools: ['Laravel', 'MySQL', 'OCR Engine', 'Redis', 'Pusher'],
  screenshots: [
    mainDashboard,
    ticketPipeline,
    conversations,
    guestWidget,
    collab,
    gedcom,
    directory,
  ],
};
