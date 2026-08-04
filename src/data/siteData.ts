import { SectionId } from '../types';

export interface PartnerItem {
  id: string;
  name: string;
  url: string;
  category: string;
  logoText: string;
  logoPath?: string;
}

export interface TechnologyItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Cloud';
  description: string;
  iconPath?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspectRatio: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  description: string;
  metric: string;
}

export interface LocationItem {
  id: string;
  city: string;
  country: string;
  address: string;
  code: string;
  isHeadOffice?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HospitalityService {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  deliverables: string[];
}

export interface HospitalityBeforeAfter {
  id: string;
  metric: string;
  beforeLabel: string;
  beforeValue: string;
  afterLabel: string;
  afterValue: string;
  impact: string;
}

export interface HospitalityCaseStudy {
  id: string;
  client: string;
  location: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
}

export interface HospitalityTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  property: string;
}

export interface GalleryCarouselCategory {
  id: string;
  title: string;
  subtitle: string;
  items: GalleryItem[];
}

export const HERO_METRICS = [
  { value: '42+', label: 'Projects Delivered', labelKey: 'projectsDelivered' },
  { value: '4', label: 'Industries Served', labelKey: 'industriesServed' },
  { value: '98%', label: 'Client Satisfaction', labelKey: 'clientSatisfaction' },
  { value: 'Alexandria, EG', label: 'Head Office', labelKey: 'headOffice' },
];

export const PARTNERS_DATA: PartnerItem[] = [
  { id: '1', name: 'Booking.com', url: 'https://www.booking.com', category: 'Travel & Hospitality', logoText: 'Booking.com', logoPath: '/partners/booking.png' },
  { id: '2', name: 'Agoda', url: 'https://www.agoda.com', category: 'Global Booking Engine', logoText: 'agoda', logoPath: '/partners/agoda.png' },
  { id: '3', name: 'Trip.com', url: 'https://www.trip.com', category: 'International Travel', logoText: 'Trip.com', logoPath: '/partners/trip.png' },
  { id: '4', name: 'Wego', url: 'https://www.wego.com', category: 'Travel Marketplace', logoText: 'wego', logoPath: '/partners/wego.png' },
  { id: '5', name: 'LateRooms', url: 'https://www.laterooms.com', category: 'Hospitality Tech', logoText: 'LateRooms', logoPath: '/partners/laterooms.png' },
  { id: '6', name: 'ClickTripz', url: 'https://www.clicktripz.com', category: 'Travel AdTech', logoText: 'CLICKTRIPZ', logoPath: '/partners/clicktripz.png' },
  { id: '7', name: 'BlowPillow', url: 'https://www.blowpillow.com', category: 'Luxury Leisure Tech', logoText: 'BlowPillow', logoPath: '/partners/blowpillow.png' },
];

export const TECHNOLOGIES_LIST: TechnologyItem[] = [
  { id: 'angular', name: 'Angular', category: 'Frontend', description: 'Enterprise-grade TypeScript framework for scalable single-page web applications.', iconPath: '/stacks/angular.png' },
  { id: 'react', name: 'React', category: 'Frontend', description: 'Declarative component architecture for high-performance interactive user interfaces.', iconPath: '/stacks/react.png' },
  { id: 'node', name: 'Node.js', category: 'Backend', description: 'Asynchronous event-driven JavaScript runtime engineered for network services.', iconPath: '/stacks/node.png' },
  { id: 'express', name: 'Express.js', category: 'Backend', description: 'Minimalist web server framework designed for RESTful microservices and APIs.', iconPath: '/stacks/express.png' },
  { id: 'aspnet', name: 'ASP.NET', category: 'Backend', description: 'High-performance cross-platform framework for mission-critical enterprise backends.', iconPath: '/stacks/asp.net.png' },
  { id: 'spring', name: 'Java Spring Boot', category: 'Backend', description: 'Robust application framework designed for enterprise distributed cloud backends.', iconPath: '/stacks/springboot.png' },
  { id: 'flutter', name: 'Flutter', category: 'Mobile', description: 'Multi-platform UI toolkit rendering fast cross-platform mobile and desktop software.', iconPath: '/stacks/flutter.png' },
  { id: 'aws', name: 'Amazon Web Services', category: 'Cloud', description: 'Global cloud computing infrastructure powering auto-scaling serverless deployments.', iconPath: '/stacks/aws.png' },
];

export interface FlowStep {
  stepNumber: string;
  stage: 'Frontend' | 'Backend' | 'API' | 'Database' | 'Cloud' | 'Deployment';
  title: string;
  techs: string[];
  blueprintSpec: string;
}

export interface ProcessStep {
  stepNumber: string;
  id: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
  expectedOutcome: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    id: 'discovery',
    title: 'Discovery',
    summary: 'Understanding the client\'s business, goals and challenges.',
    description: 'We conduct an in-depth operational analysis to align business objectives, identify technical constraints, and establish clear project benchmarks.',
    deliverables: [
      'Business Requirements Audit',
      'Stakeholder Alignment Session',
      'Technical Feasibility Assessment',
    ],
    expectedOutcome: 'Clear project scope definition and alignment on key performance indicators.',
  },
  {
    stepNumber: '02',
    id: 'planning',
    title: 'Planning',
    summary: 'Creating the technical roadmap and project strategy.',
    description: 'Our system architects formulate the technical roadmap, framework selection, and milestone delivery schedule for predictable execution.',
    deliverables: [
      'System Architecture Blueprint',
      'Resource & Timeline Allocation',
      'Risk Mitigation Strategy',
    ],
    expectedOutcome: 'Risk-mitigated engineering roadmap with precise timeline commitments.',
  },
  {
    stepNumber: '03',
    id: 'design',
    title: 'UI / UX Design',
    summary: 'Designing intuitive user experiences and premium interfaces.',
    description: 'We craft user-centered visual systems and seamless interaction patterns engineered for intuitive navigation and brand prestige.',
    deliverables: [
      'Wireframe Architecture',
      'High-Fidelity Interface Prototypes',
      'Component Design System',
    ],
    expectedOutcome: 'Highly engaging, accessible, and user-tested visual prototype.',
  },
  {
    stepNumber: '04',
    id: 'development',
    title: 'Development',
    summary: 'Building scalable, secure and high-performance applications.',
    description: 'Senior engineers build clean, modular, and high-throughput software using modern type-safe enterprise frameworks.',
    deliverables: [
      'Production-Grade Codebase',
      'API & Middleware Integration',
      'Automated Test Coverage',
    ],
    expectedOutcome: 'Production-grade enterprise software engineered for high concurrency.',
  },
  {
    stepNumber: '05',
    id: 'qa',
    title: 'Quality Assurance',
    summary: 'Testing every feature across devices before launch.',
    description: 'Rigorous cross-device testing, automated security audits, and load benchmarks guarantee zero defects prior to deployment.',
    deliverables: [
      'Automated Cross-Device Test Suites',
      'Security & Penetration Audit',
      'Performance Benchmark Report',
    ],
    expectedOutcome: 'Zero-defect validation and sub-second load time guarantee.',
  },
  {
    stepNumber: '06',
    id: 'launch',
    title: 'Launch',
    summary: 'Deploying the solution with monitoring and optimization.',
    description: 'Continuous integration and automated deployment pipelines execute zero-downtime releases backed by live telemetry monitoring.',
    deliverables: [
      'Zero-Downtime Production Release',
      'Cloud Infrastructure Provisioning',
      'Real-Time Telemetry Tracking',
    ],
    expectedOutcome: 'Seamless public rollout with real-time health monitoring.',
  },
  {
    stepNumber: '07',
    id: 'support',
    title: 'Support',
    summary: 'Continuous improvements, maintenance and future growth.',
    description: 'Ongoing performance tuning, security patching, and SLA-backed maintenance ensure long-term resilience and continuous scaling.',
    deliverables: [
      '24/7 SLA Telemetry & Monitoring',
      'Security Patch Management',
      'Iterative Platform Evolution',
    ],
    expectedOutcome: 'Long-term platform stability and continuous enterprise evolution.',
  },
];

export const ENGINEERING_FLOW: FlowStep[] = [
  {
    stepNumber: '01',
    stage: 'Frontend',
    title: 'Reactive Client Interface',
    techs: ['Angular', 'React', 'Flutter'],
    blueprintSpec: 'Client-side component architecture, state synchronization, and reactive frame-rate rendering.',
  },
  {
    stepNumber: '02',
    stage: 'Backend',
    title: 'Distributed Core Execution',
    techs: ['Node.js', 'Express.js', 'ASP.NET', 'Java Spring Boot'],
    blueprintSpec: 'High-throughput concurrency, microservices orchestration, and type-safe data processing pipelines.',
  },
  {
    stepNumber: '03',
    stage: 'API',
    title: 'Low-Latency Gateway Protocol',
    techs: ['RESTful APIs', 'gRPC Protocol', 'Real-Time WebSockets'],
    blueprintSpec: 'Sub-millisecond serialization, encrypted payload transport, and rate-limited endpoint handlers.',
  },
  {
    stepNumber: '04',
    stage: 'Database',
    title: 'Transactional Persistence Engine',
    techs: ['Enterprise SQL & Document Storage'],
    blueprintSpec: 'ACID-compliant transactions, distributed read-replicas, and automated failover data integrity.',
  },
  {
    stepNumber: '05',
    stage: 'Cloud',
    title: 'Global Infrastructure Layer',
    techs: ['Amazon Web Services'],
    blueprintSpec: 'Serverless container clusters, edge CDN caching, and automated multi-region elasticity.',
  },
  {
    stepNumber: '06',
    stage: 'Deployment',
    title: 'Automated CI/CD Delivery Pipeline',
    techs: ['Continuous Orchestration'],
    blueprintSpec: 'Zero-downtime rolling upgrades, automated security scanning, and infrastructure-as-code state.',
  },
];

export interface DetailedIndustryService {
  title: string;
  description: string;
  tags: string[];
}

export interface DetailedIndustryProject {
  name: string;
  type: string;
  highlight: string;
  impact: string;
}

export interface DetailedIndustryGalleryItem {
  title: string;
  caption: string;
  aspect: string;
  imageUrl: string;
}

export interface DetailedIndustryTestimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
}

export interface DetailedIndustry {
  id: 'hospitality' | 'ecommerce' | 'food' | 'fintech';
  title: string;
  subtitle: string;
  shortIntro: string;
  heroImage: string;
  heroPlaceholderSpec: {
    accentColor: string;
    badge: string;
    metricValue: string;
    metricLabel: string;
    visualTheme: string;
  };
  services: DetailedIndustryService[];
  projects: DetailedIndustryProject[];
  gallery: DetailedIndustryGalleryItem[];
  testimonials: DetailedIndustryTestimonial[];
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'hospitality',
    title: 'Hospitality',
    description: 'High-concurrency reservation systems, real-time rate engines, and guest management platforms.',
    metric: 'Real-Time Sync',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    description: 'High-throughput storefronts, automated inventory synchronization, and secure checkout pipelines.',
    metric: 'High Conversion',
  },
  {
    id: 'food',
    title: 'Food Industry',
    description: 'Order dispatch systems, kitchen management workflows, and real-time delivery tracking systems.',
    metric: 'Sub-Minute Dispatch',
  },
  {
    id: 'fintech',
    title: 'FinTech',
    description: 'Secure payment processing, ledger reconciliation, and multi-currency gateway integrations.',
    metric: 'Bank-Grade Security',
  },
];

export const DETAILED_INDUSTRIES_DATA: Record<'hospitality' | 'ecommerce' | 'food' | 'fintech', DetailedIndustry> = {
  hospitality: {
    id: 'hospitality',
    title: 'Hospitality',
    subtitle: 'High-concurrency reservation engines, real-time rate distribution gateways, and keyless guest portals.',
    shortIntro: 'We engineer bespoke digital platforms for luxury hotel groups, boutique resorts, and global hospitality networks. Our systems eliminate check-in queues and streamline PMS rate synchronization across all third-party OTAs.',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    heroPlaceholderSpec: {
      accentColor: '#D4AF37',
      badge: 'LUXURY HOSPITALITY',
      metricValue: 'Sub-250ms',
      metricLabel: 'Rate Sync Latency',
      visualTheme: 'Gold Architectural Grid',
    },
    services: [
      {
        title: 'Keyless Web Guest Portal',
        description: 'Contactless web application providing mobile check-in, keyless room access, and digital concierge services directly in browser.',
        tags: ['React', 'PWA', 'WebBluetooth', 'Node.js'],
      },
      {
        title: 'Real-Time Rate Engine',
        description: 'High-throughput channel distribution engine synchronizing rates and availability across OTAs with sub-250ms propagation latency.',
        tags: ['Node.js', 'Express', 'Redis', 'AWS Lambda'],
      },
      {
        title: 'Predictive RevPAR Analytics',
        description: 'Telemetry dashboard visualizing occupancy trends, ADR, and competitor rate benchmarking in real time.',
        tags: ['ASP.NET Core', 'Angular', 'D3.js', 'PostgreSQL'],
      },
      {
        title: 'On-Property POS Integration',
        description: 'Unified point-of-sale system charging restaurant, spa, and service billing directly into guest folio accounts.',
        tags: ['Flutter', 'Node.js', 'WebSockets', 'AWS'],
      },
    ],
    projects: [
      {
        name: 'Alexandria Grand Coastal Resort',
        type: 'Flagship Resort Portal',
        highlight: 'Keyless Web Check-In & Direct Booking Engine',
        impact: '+52% Direct Bookings & 85% Less Wait',
      },
      {
        name: 'Alpine Heritage Luxury Collection',
        type: 'International Hotel Group',
        highlight: 'Unified Restaurant POS & PMS Bridge',
        impact: '99.98% Billing Accuracy Across 12 Outlets',
      },
    ],
    gallery: [
      {
        title: 'Keyless Mobile Guest Portal Interface',
        caption: 'Progressive web application running on iOS and Android without requiring app store installation.',
        aspect: '16/9',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'Real-Time PMS Telemetry Command',
        caption: 'High-density analytics console tracking live occupancy across 4,200 guest rooms worldwide.',
        aspect: '16/9',
        imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    testimonials: [
      {
        quote: 'Quriv Technologies completely transformed our guest arrival experience. Guests walk from their car straight to their suite using the progressive web keyless portal.',
        author: 'Karem El-Ghandour',
        title: 'General Manager',
        company: 'Mediterranean Luxury Resorts',
      },
      {
        quote: 'The sub-second OTA rate synchronization eliminated overbooking during peak season. It paid for itself in the first quarter.',
        author: 'Sophia Al-Husseini',
        title: 'VP Revenue Management',
        company: 'Grand Horizon Group',
      },
    ],
  },
  ecommerce: {
    id: 'ecommerce',
    title: 'E-Commerce',
    subtitle: 'High-throughput storefronts, automated inventory synchronization, and secure checkout pipelines.',
    shortIntro: 'We build custom headless storefronts and distributed order processing engines designed for high conversion and sub-second page loads during flash sales and high-volume retail events.',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0a67dd3952d7?q=80&w=1200&auto=format&fit=crop',
    heroPlaceholderSpec: {
      accentColor: '#E6C766',
      badge: 'HIGH-VOLUME RETAIL',
      metricValue: '<150ms',
      metricLabel: 'Storefront Load Speed',
      visualTheme: 'Dynamic Commerce Grid',
    },
    services: [
      {
        title: 'Headless Storefront Architecture',
        description: 'Next-generation React/Vite frontends with instant page switches and edge-rendered product catalogs.',
        tags: ['React', 'Vite', 'GraphQL', 'CDN Caching'],
      },
      {
        title: 'Distributed Inventory Engine',
        description: 'Real-time multi-warehouse stock synchronization preventing inventory overselling during traffic spikes.',
        tags: ['Node.js', 'Redis', 'Kafka', 'PostgreSQL'],
      },
      {
        title: 'Custom Checkout & Payments',
        description: 'Frictionless multi-currency checkout flow supporting localized gateways and tokenized payment security.',
        tags: ['TypeScript', 'Stripe API', 'PCI-DSS', 'WebHooks'],
      },
      {
        title: 'Automated Order Fulfillment',
        description: 'Backend service integrating ERP systems, shipping carriers, and automated tracking webhooks.',
        tags: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
      },
    ],
    projects: [
      {
        name: 'Vanguard Luxury Apparel',
        type: 'Global E-Commerce Platform',
        highlight: 'Headless Storefront & Multi-Region Inventory',
        impact: '+44% Conversion Boost & Sub-150ms Load',
      },
      {
        name: 'Aetheria Direct Electronics',
        type: 'High-Volume Storefront',
        highlight: 'Flash Sale Concurrency Guard Engine',
        impact: '80,000 Concurrent Buyers Without Lag',
      },
    ],
    gallery: [
      {
        title: 'Headless Storefront Product Display',
        caption: 'Sub-second image loading with responsive edge caching and interactive product viewer.',
        aspect: '16/9',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67dd3952d7?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'Multi-Warehouse Inventory Control',
        caption: 'Real-time stock allocation map spanning 8 regional fulfillment centers.',
        aspect: '16/9',
        imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    testimonials: [
      {
        quote: 'Our flash sales used to crash our store. Quriv rebuilt our e-commerce engine on a distributed architecture and we handled 80,000 concurrent shoppers flawlessly.',
        author: 'Omar Mansour',
        title: 'Chief Technology Officer',
        company: 'Vanguard Retail',
      },
      {
        quote: 'Page load times dropped from 3.2 seconds to 120 milliseconds. The conversion increase was immediate and sustained.',
        author: 'Elena Rostova',
        title: 'E-Commerce Director',
        company: 'Aetheria Digital',
      },
    ],
  },
  food: {
    id: 'food',
    title: 'Food Industry',
    subtitle: 'Order dispatch systems, kitchen management workflows, and real-time delivery tracking.',
    shortIntro: 'We engineer real-time order dispatch platforms, kitchen display systems (KDS), and automated fleet tracking for multi-branch restaurant chains and cloud kitchen networks.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    heroPlaceholderSpec: {
      accentColor: '#D4AF37',
      badge: 'LOGISTICS & DISPATCH',
      metricValue: 'Sub-Minute',
      metricLabel: 'Order Dispatch Time',
      visualTheme: 'Kitchen Dispatch Matrix',
    },
    services: [
      {
        title: 'Real-Time KDS & Station Routing',
        description: 'Intelligent station routing for multi-item kitchen orders with live preparation telemetry and timing alarms.',
        tags: ['WebSockets', 'React', 'Node.js', 'Express'],
      },
      {
        title: 'Order Dispatch & Driver Fleet Engine',
        description: 'Automated driver assignment using real-time geofencing and route optimization algorithms.',
        tags: ['Node.js', 'GeoJSON', 'Redis', 'WebSockets'],
      },
      {
        title: 'Multi-Channel Ordering Gateway',
        description: 'Single unified API aggregating orders from web, mobile apps, and third-party food aggregators.',
        tags: ['Express.js', 'gRPC', 'PostgreSQL', 'Docker'],
      },
      {
        title: 'Inventory & Recipe Control',
        description: 'Automated recipe ingredient tracking with stock deduction upon order confirmation.',
        tags: ['Node.js', 'D3.js', 'SQL', 'TypeScript'],
      },
    ],
    projects: [
      {
        name: 'Nile Artisan Dining Network',
        type: 'Multi-Branch Restaurant Chain',
        highlight: 'Central KDS & Web Ordering Gateway',
        impact: 'Sub-45s Dispatch Speed & Zero Order Drops',
      },
      {
        name: 'Express Gourmet Delivery',
        type: 'Cloud Kitchen Network',
        highlight: 'Real-Time Driver Fleet Routing Engine',
        impact: '-22% Delivery Times & +38% Retention',
      },
    ],
    gallery: [
      {
        title: 'Kitchen Display System Console',
        caption: 'High-contrast touch interface optimized for kitchen environments and station routing.',
        aspect: '16/9',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'Geofenced Fleet Tracking Map',
        caption: 'Live telemetry tracking delivery drivers across urban zones.',
        aspect: '16/9',
        imageUrl: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    testimonials: [
      {
        quote: 'Quriv connected our 18 cloud kitchen locations into a single dispatch brain. Order fulfillment errors dropped to practically zero.',
        author: 'Ahmed Farouk',
        title: 'Operations Director',
        company: 'Nile Dining Group',
      },
      {
        quote: 'The real-time driver tracking and automated ETA system boosted our customer retention rate by 38%.',
        author: 'Laila Benali',
        title: 'Head of Product',
        company: 'Express Gourmet',
      },
    ],
  },
  fintech: {
    id: 'fintech',
    title: 'FinTech',
    subtitle: 'Secure payment processing, ledger reconciliation, and multi-currency gateway integrations.',
    shortIntro: 'We design bank-grade payment processing gateways, immutable transaction ledgers, and automated financial compliance dashboards for modern digital finance companies.',
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    heroPlaceholderSpec: {
      accentColor: '#E6C766',
      badge: 'BANK-GRADE FINANCE',
      metricValue: '99.999%',
      metricLabel: 'Transaction Accuracy',
      visualTheme: 'Encrypted Financial Matrix',
    },
    services: [
      {
        title: 'Multi-Currency Gateway Orchestration',
        description: 'Smart payment routing engine minimizing transaction fees across international card networks and digital wallets.',
        tags: ['Node.js', 'Express', 'PCI-DSS', 'TLS 1.3'],
      },
      {
        title: 'Double-Entry Immutable Ledger',
        description: 'High-performance financial ledger guaranteeing transactional integrity, instant reconciliation, and auditability.',
        tags: ['ASP.NET Core', 'PostgreSQL', 'Redis', 'Crypto Hashes'],
      },
      {
        title: 'Automated Fraud Telemetry',
        description: 'Real-time rule engine detecting anomalous transaction patterns and flagging high-risk payments instantly.',
        tags: ['TypeScript', 'Node.js', 'D3.js', 'Machine Rules'],
      },
      {
        title: 'Compliance & Audit Reporting',
        description: 'Automated generation of financial compliance reports and regulatory data exports for banking authorities.',
        tags: ['Node.js', 'PostgreSQL', 'PDF Engine', 'Express'],
      },
    ],
    projects: [
      {
        name: 'Apex Capital Clearing',
        type: 'Cross-Border Payment Gateway',
        highlight: 'Multi-Currency Routing & Double-Entry Ledger',
        impact: '$1.2B Volume Processed & -1.8% Fee Costs',
      },
      {
        name: 'Nile Pay Merchant Services',
        type: 'Digital POS & Settlements',
        highlight: 'Real-Time Settlement & Fraud Engine',
        impact: 'Zero Security Breaches & Sub-100ms API Response',
      },
    ],
    gallery: [
      {
        title: 'Payment Routing & Telemetry Command',
        caption: 'Live dashboard displaying transaction throughput and authorization response rates.',
        aspect: '16/9',
        imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
      },
      {
        title: 'Immutable Ledger Audit Trail',
        caption: 'Double-entry accounting console with cryptographically verified entry hashes.',
        aspect: '16/9',
        imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
      },
    ],
    testimonials: [
      {
        quote: 'The payment routing engine built by Quriv cut our transaction processing fees by 1.8% while increasing card authorization success rates.',
        author: 'Dr. Tariq Al-Sayed',
        title: 'Managing Director',
        company: 'Apex Capital',
      },
      {
        quote: 'Bank-grade security and sub-100ms API response times gave us the confidence to scale our merchant acquisition across North Africa.',
        author: 'Mona Zaki',
        title: 'Chief Risk Officer',
        company: 'Nile Pay Services',
      },
    ],
  },
};


export const CORE_SERVICES_LIST = [
  { id: 'website-dev', name: 'Website Development', description: 'High-performance, bespoke web applications built with modern frameworks and responsive design.' },
  { id: 'guest-portal', name: 'Guest Portal', description: 'Contactless web portals with keyless access features, digital concierge services, and room controls.' },
  { id: 'dashboard', name: 'Dashboard', description: 'Custom administrative consoles and real-time operational management systems.' },
  { id: 'marketing', name: 'Marketing', description: 'Targeted digital campaigns and brand positioning strategies for international growth.' },
  { id: 'seo', name: 'SEO', description: 'Search engine optimization ensuring search visibility and organic traffic acquisition.' },
  { id: 'google-business', name: 'Google Business', description: 'Complete profile setup, local business optimization, and location management.' },
  { id: 'analytics', name: 'Analytics', description: 'Custom data telemetry, conversion tracking, and reporting dashboards.' },
  { id: 'monthly-consulting', name: 'Monthly Consulting', description: 'Continuous architectural oversight, performance optimization, and technical advising.' },
];

export interface TimelineEvent {
  stage: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface CoreValueItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface WhyQurivItem {
  id: string;
  title: string;
  description: string;
}

export const ABOUT_EXHIBIT_DATA = {
  roomCode: 'EXHIBIT ROOM 01',
  heading: 'The Engineering Exhibit',
  tagline: 'Precision software architectures built for high-concurrency digital ecosystems.',
  introduction:
    'Quriv Technologies is an international software architecture engineering company based in Alexandria, Egypt. We engineer bespoke web applications, keyless guest portals, administrative dashboards, and scalable cloud infrastructures.',
  mission:
    'To replace generic digital templates with custom, high-performance software systems that drive operational efficiency and direct business revenue.',
  vision:
    'To serve as the global benchmark for luxury digital craftsmanship, web innovation, and resilient cloud architecture.',
  coreValues: [
    { id: '1', number: '01', title: 'Bespoke Engineering', description: 'Every codebase is built from first principles with zero reliance on generic SaaS templates.' },
    { id: '2', number: '02', title: 'Low-Latency Architecture', description: 'Optimized network routing, edge caching, and high-concurrency microservices.' },
    { id: '3', number: '03', title: 'Complete Source Transfer', description: 'Clients maintain 100% ownership of source code, IP, and technical assets.' },
    { id: '4', number: '04', title: 'Design System Discipline', description: 'Immersive user experiences with optical balance, fluid typography, and cinematic precision.' },
  ] as CoreValueItem[],
  timeline: [
    { stage: 'FOUNDATION', title: 'Engineering Origin', subtitle: 'Alexandria Head Office', description: 'Established as a specialized software architecture team focusing on custom web systems.' },
    { stage: 'FIRST PROJECT', title: 'Initial Milestone', subtitle: 'Hospitality Architecture', description: 'Engineered our first keyless web portal and reservation sync system for coastal luxury properties.' },
    { stage: 'EXPANSION', title: 'Sector Diversification', subtitle: 'Multi-Industry Footprint', description: 'Expanded engineering operations to serve E-Commerce, Food Industry, and FinTech domains.' },
    { stage: 'TODAY', title: 'Global Platform Reach', subtitle: '42+ Delivered Platforms', description: 'Operating across international markets with dedicated engineering suites for flagship enterprises.' },
  ] as TimelineEvent[],
  achievements: [
    { value: '42+', label: 'Projects Delivered', subtext: 'Custom codebases transferred' },
    { value: '4', label: 'Industries Served', subtext: 'Hospitality, E-Commerce, Food, FinTech' },
    { value: '98%', label: 'Client Satisfaction', subtext: 'Verified client retention' },
    { value: 'Alexandria', label: 'Head Office', subtext: 'Fouad Street, Downtown, Egypt' },
  ],
  whyQuriv: [
    { id: 'why-1', title: 'Direct Source Code Ownership', description: 'You own 100% of the repository, IP, and deployment setup upon completion with no recurring platform lock-in.' },
    { id: 'why-2', title: 'High-Concurrency Uptime', description: 'Architected to handle peak traffic spikes, instant synchronization, and uninterrupted operational uptime.' },
    { id: 'why-3', title: 'Tailored Luxury Aesthetics', description: 'Handcrafted interfaces engineered specifically to elevate your brand prestige and conversion funnel.' },
  ] as WhyQurivItem[],
};

export const HOSPITALITY_EXHIBIT_DATA = {
  title: 'Hospitality Technology Exhibit',
  subtitle: 'End-to-End Digital Architecture for Luxury Hotels, Resorts & Global Booking Platforms',
  overview:
    'Quriv Technologies engineers high-concurrency reservation engines, real-time rate distribution gateways, and keyless mobile guest portals that transform guest satisfaction and maximize RevPAR.',
  services: [
    {
      id: 'guest-portal',
      title: 'Keyless Web Guest Portal',
      category: 'Guest Experience',
      description:
        'Sub-second progressive web application providing contactless mobile check-in, keyless door unlock protocols, digital concierge ordering, and room automation controls directly in browser.',
      techStack: ['React', 'PWA', 'WebBluetooth', 'Node.js'],
      deliverables: ['Contactless Check-In', 'Keyless Room Unlock API', 'In-Room Dining Engine', 'Multi-Language Support'],
    },
    {
      id: 'rate-sync',
      title: 'Real-Time Rate & Inventory Engine',
      category: 'Distribution & Channel Management',
      description:
        'High-throughput channel sync engine orchestrating live rates and availability across OTAs (Booking.com, Agoda, Trip.com, Wego) with sub-250ms propagation latency.',
      techStack: ['Node.js', 'Express.js', 'Redis', 'AWS Lambda'],
      deliverables: ['Sub-250ms Rate Sync', 'Automated Overbooking Guard', 'Dynamic Pricing Rules Engine', '2-Way PMS Integration'],
    },
    {
      id: 'analytics-yield',
      title: 'Predictive Yield & RevPAR Analytics',
      category: 'Revenue Management',
      description:
        'Enterprise telemetry dashboard visualizing occupancy trends, ADR (Average Daily Rate), RevPAR forecasting, and competitor rate benchmarking in real time.',
      techStack: ['ASP.NET Core', 'Angular', 'D3.js', 'PostgreSQL'],
      deliverables: ['Live Occupancy Heatmaps', 'Automated ADR Maximizer', 'Competitor Rate Intelligence', 'Exportable Financial Audit Logs'],
    },
    {
      id: 'pos-kitchen',
      title: 'Integrated Food & Beverage POS',
      category: 'On-Property Operations',
      description:
        'Unified point-of-sale and kitchen display system synchronizing restaurant, bar, and room-service billing directly into guest folio accounts.',
      techStack: ['Flutter', 'Node.js', 'WebSockets', 'AWS'],
      deliverables: ['Folio Charging API', 'Kitchen Display System (KDS)', 'Split-Bill Calculator', 'Inventory Auto-Deduction'],
    },
  ] as HospitalityService[],
  beforeAfter: [
    {
      id: 'checkin-speed',
      metric: 'Check-In Processing Time',
      beforeLabel: 'Legacy Reception Desk',
      beforeValue: '18 minutes avg wait',
      afterLabel: 'Quriv Keyless Web Portal',
      afterValue: '30 seconds mobile check-in',
      impact: '97% reduction in lobby wait queues',
    },
    {
      id: 'channel-lag',
      metric: 'OTA Rate & Availability Sync',
      beforeLabel: 'Traditional Batch Sync',
      beforeValue: '35 - 45 min delay (overbooking risk)',
      afterLabel: 'Quriv Live Rate Engine',
      afterValue: '<250 ms real-time broadcast',
      impact: 'Zero overbooking incidents across 120k rooms',
    },
    {
      id: 'direct-booking',
      metric: 'Direct Booking Revenue Ratio',
      beforeLabel: '3rd Party OTA Heavy',
      beforeValue: '14% direct website bookings',
      afterLabel: 'Quriv High-Conversion Funnel',
      afterValue: '48% direct web bookings',
      impact: '+34% boost in non-commission revenue',
    },
  ] as HospitalityBeforeAfter[],
  caseStudies: [
    {
      id: 'grand-resort',
      client: 'Alexandria Grand Coastal Resort',
      location: 'Alexandria, Egypt',
      challenge: 'High lobby congestion during peak season, manual room key management, and 18% commission leakage to 3rd party booking portals.',
      solution: 'Deployed Quriv Hospitality Suite: keyless web portal, direct booking engine with dynamic pricing, and real-time PMS channel synchronization.',
      metrics: [
        { label: 'Direct Bookings', value: '+52%' },
        { label: 'Lobby Wait Time', value: '-85%' },
        { label: 'Annual Savings', value: '$340k+' },
      ],
    },
    {
      id: 'swiss-alps-collection',
      client: 'Alpine Heritage Luxury Hotels',
      location: 'Zurich & St. Moritz',
      challenge: 'Disjointed restaurant POS and room billing causing delayed checkout settlements and guest disputes.',
      solution: 'Engineered unified WebSockets POS integration connecting 12 fine dining outlets with central guest folios in sub-50ms.',
      metrics: [
        { label: 'Billing Accuracy', value: '99.98%' },
        { label: 'Checkout Speed', value: '4x Faster' },
        { label: 'Guest Score', value: '4.95 / 5' },
      ],
    },
  ] as HospitalityCaseStudy[],
  testimonials: [
    {
      id: 'test-1',
      quote: 'Quriv Technologies completely transformed our guest arrival experience. Our guests walk from their car straight to their suite using the progressive web keyless portal.',
      author: 'Karem El-Ghandour',
      role: 'General Manager',
      property: 'Mediterranean Luxury Resorts',
    },
    {
      id: 'test-2',
      quote: 'The sub-second OTA rate synchronization eliminated our overbooking nightmare during high-season events. It paid for itself within the first quarter.',
      author: 'Sophia Al-Husseini',
      role: 'VP Revenue Management',
      property: 'Grand Horizon Hotel Group',
    },
  ] as HospitalityTestimonial[],
  results: [
    { value: '+38%', label: 'Direct Revenue Growth' },
    { value: '-75%', label: 'Check-In Queue Duration' },
    { value: '99.99%', label: 'Channel Engine Uptime' },
    { value: '4.9/5', label: 'Verified Guest Score' },
  ],
};

export const GALLERY_CAROUSELS: GalleryCarouselCategory[] = [
  {
    id: 'web-portals',
    title: 'Websites & Guest Portals',
    subtitle: 'High-conversion booking engines, keyless guest portals, and luxury brand web platforms.',
    items: [
      {
        id: 'gal-1',
        title: 'Luxury Hotel Web Portal',
        category: 'Hospitality',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
        aspectRatio: '16/9',
      },
      {
        id: 'gal-2',
        title: 'Modern E-Commerce Storefront',
        category: 'E-Commerce',
        image: 'https://images.unsplash.com/photo-1556742049-0a67dd3952d7?q=80&w=1200&auto=format&fit=crop',
        aspectRatio: '16/9',
      },
      {
        id: 'gal-3',
        title: 'Food Delivery Web App',
        category: 'Food Industry',
        image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'dashboards',
    title: 'Enterprise Dashboards',
    subtitle: 'Real-time telemetry, rate distribution consoles, and logistics dispatch control centers.',
    items: [
      {
        id: 'gal-4',
        title: 'FinTech Settlement Dashboard',
        category: 'FinTech',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        aspectRatio: '16/9',
      },
      {
        id: 'gal-5',
        title: 'Rate Distribution Control',
        category: 'Hospitality',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        aspectRatio: '16/9',
      },
      {
        id: 'gal-6',
        title: 'Kitchen Dispatch Telemetry',
        category: 'Food Industry',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
        aspectRatio: '16/9',
      },
    ],
  },
  {
    id: 'visual-media',
    title: 'Brand Marketing & Visual Media',
    subtitle: '3D product renders, spatial video showcases, and digital interactive exhibits.',
    items: [
      {
        id: 'gal-7',
        title: '3D Spatial Interactive Canvas',
        category: 'Interactive Media',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        aspectRatio: '16/9',
      },
      {
        id: 'gal-8',
        title: 'Architectural Lighting Render',
        category: 'Digital Architecture',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
        aspectRatio: '16/9',
      },
    ],
  },
];

export const GALLERY_DATA: GalleryItem[] = GALLERY_CAROUSELS[0].items;

export const TEAM_DATA: TeamMember[] = [
  { id: '1', name: 'Engineering Leadership', role: 'Head of Software Architecture', location: 'Alexandria' },
  { id: '2', name: 'Systems Engineering', role: 'Lead Cloud Architect', location: 'Zurich' },
  { id: '3', name: 'Product Engineering', role: 'Full-Stack Technical Lead', location: 'San Francisco' },
  { id: '4', name: 'Security & Quality', role: 'Senior Quality & Systems Lead', location: 'London' },
];

export const LOCATIONS_DATA: LocationItem[] = [
  { id: 'alexandria', city: 'Alexandria', country: 'Egypt (Head Office)', address: 'Fouad Street, Downtown', code: 'ALY-HQ', isHeadOffice: true },
  { id: 'zurich', city: 'Zurich', country: 'Switzerland', address: 'Bahnhofstrasse 42', code: 'ZRH-01' },
  { id: 'sf', city: 'San Francisco', country: 'United States', address: 'Montgomery St 101', code: 'SFO-02' },
  { id: 'london', city: 'London', country: 'United Kingdom', address: 'Bishopsgate 25', code: 'LON-03' },
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What defines Quriv Technologies’ engineering standard?',
    answer: 'We engineer custom, scalable software architectures combining robust backend services with modern responsive user interfaces built for long-term reliability.',
  },
  {
    id: 'faq-2',
    question: 'How is system security and performance handled?',
    answer: 'All architectures adhere to strict industry security standards with encrypted payloads, automated unit/integration testing, and optimized runtime performance.',
  },
  {
    id: 'faq-3',
    question: 'What is the standard engagement model?',
    answer: 'We operate through direct architectural consultation, requirement scoping, and dedicated engineering sprints tailored to your business goals.',
  },
  {
    id: 'faq-4',
    question: 'Who owns the final source code and intellectual property?',
    answer: '100% of custom software codebases and architectural deliverables are fully transferred to your company upon project completion.',
  },
];

