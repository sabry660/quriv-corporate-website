# Media Assets Requirements & Documentation

This document categorizes all media assets used in the Quriv Technologies corporate website into **Integrated** (currently implemented) and **Non-Integrated** (placeholder/required) media.

---

## RECENT UPDATES (August 2026)

### Translation Keys Added (Latest)
- Added translation keys for hero metrics:
  - `projectsDelivered`: "Projects Delivered"
  - `industriesServed`: "Industries Served"
  - `clientSatisfaction`: "Client Satisfaction"
  - `headOffice`: "Head Office"
- Added translation keys for industry solution components:
  - `restaurantCulinaryTechnology`: "RESTAURANT & CULINARY TECHNOLOGY"
  - `culinarySystems`: "CULINARY SYSTEMS"
  - `restaurantTechnologySystemPreviews`: "Restaurant Technology System Previews"
  - `restaurantTechnologyPreviewDescription`: "Preview our specialized restaurant technologies..."
  - `culinaryPreview`: "Culinary Preview"
  - `optimizedRestaurantOperations`: "OPTIMIZED RESTAURANT OPERATIONS"
  - `foodIndustrySurface`: "Food Industry Surface"
  - `kitchenKds`: "KITCHEN KDS"
  - `contactlessQrMenu`: "Contactless QR Menu"
  - `kitchenDisplayKds`: "Kitchen Display (KDS)"
  - `onlineOrderingPortal`: "Online Ordering Portal"
  - `tableReservations`: "Table Reservations"
  - `onlineStorefront`: "Online Storefront"
  - `adminDashboard`: "Admin Dashboard"
  - `mobileScreens`: "Mobile Screens"
  - `analyticsTelemetry`: "Analytics Telemetry"
  - `onlineStorefrontPreviewDescription`: "Custom headless and monolithic online storefronts..."
  - `customerPortal`: "Customer Portal"
  - `operationsDashboard`: "Operations Dashboard"
  - `secureAuth`: "Secure Authentication"
  - `automatedReporting`: "Automated Reporting"
  - `cinematicScroll`: "Cinematic Scroll"
- Added translation keys for footer section:
  - `footerTagline`: "Pioneering bespoke software architectures..."
  - `backToTop`: "Back to Top (Camera Flight)"
  - `footerHomeOverview`: "Home / Overview"
  - `footerEngineeringVision`: "Engineering Vision"
  - `footerTechStack`: "Tech Stack"
  - `footerDevelopmentLifecycle`: "Development Lifecycle"
  - `footerLeadershipTeam`: "Leadership Team"
  - `footerOfficeLocations`: "Office Locations"
  - `footerKnowledgeBase`: "Knowledge Base"
  - `footerGetInTouch`: "Get In Touch"
  - `footerFintechTrading`: "FinTech & Trading"
  - `footerFoodHospitality`: "Food & Hospitality"
  - `footerRealEstate`: "Real Estate"
  - `footerEcommerce`: "E-Commerce"
  - `footerHealthcare`: "Healthcare"
  - `ceoEmail`: "ceo@quriv.com"
  - `phone`: "01157502000"
  - `copyright`: "© 2026 Quriv Technologies Inc."
  - `allRightsReserved`: "All Rights Reserved"
  - `quickNavigation`: "Quick Navigation"
  - `targetIndustries`: "Target Industries"
  - `connectOnOfficialChannels`: "Connect on Official Channels"
- Added translation keys for locations:
  - `officeOverview`: "Office Overview"
  - `phaseOverview`: "Phase Overview"

### Translation Keys Added (Previous)
- Added translation keys for all hardcoded text in industry solution components
- New keys in `common` section:
  - `deliverablesHighlights`: "Deliverables & Highlights"
  - `coreHighlightsFeatures`: "Core Highlights & Features"
  - `deliverablesFeatures`: "Deliverables & Features"
  - `institutionalGrade`: "Institutional Grade"
  - `restaurantReady`: "Restaurant Ready"
  - `readyForDeployment`: "Ready for Deployment"
  - `serviceSpecification`: "Service Specification"
  - `serviceModuleSpecification`: "Service Module Specification"
  - `fintechComparisonDescription`: "Comparing traditional financial operations with a fully integrated Quriv software architecture."
  - `foodIndustryComparisonDescription`: "Comparing traditional restaurant operations with a fully integrated Quriv software architecture."
  - `ecommerceComparisonDescription`: "Comparing traditional e-commerce operations with a fully integrated Quriv software architecture."
  - `editableProjectSpecification`: "Editable Project Specification"
  - `readyForLiveData`: "Ready for Live Data"
  - `hospitalityProjectsDescription`: "Bespoke digital architecture implementations across hotels and resorts."
  - `hospitalityProjectsShowcase`: "Hospitality Projects Showcase"
  - `projectPortfolio`: "Project Portfolio"

### Contact Section Translation Keys Added
- `contactInfo`: "Contact Information"
- `phoneLabel`: "Phone"
- `emailLabel`: "Email"
- `addressLabel`: "Address"
- `socialMediaLinks`: "Social Media Links"
- `consultationScheduler`: "Consultation Scheduler"
- `slotsOpenToday`: "Slots Open Today"
- `createAccount`: "Create Account"

### Book Meeting Modal Fixed
- Fixed translation key path from `bookMeeting.*` to `forms.bookMeeting.*`
- All book meeting modal text now properly translatable

### Before/After Slider Component
- Created new `BeforeAfterSlider.tsx` component with draggable image comparison
- Integrated into all industry solution components (Fintech, Food Industry, E-Commerce, Hospitality)
- Added before/after image paths to data structures in each component

### Partners Section Styling
- Adjusted partner logo boxes to fill the container except for text area
- Text positioned below logos in smaller font size

### Company Name Update (Arabic)
- Changed company name in Arabic from "قوريف" to "كيوريف" across all translation files
- Updated in meta tags, hero section, about section, forms, FAQ, and all other references

### Footer Translation Keys Fixed
- Fixed footer translation key references to use proper `footer.*` namespace
- Fixed hero metrics to use translation keys with `labelKey` property
- Fixed nav.bookMeeting to common.bookMeeting across all components

---

## INTEGRATED MEDIA
*These media assets are currently implemented and functional in the codebase.*

### AUDIO FILES
**Base Path**: `/public/audio/`

| File | Purpose | Used In | Status |
|------|---------|---------|--------|
| `ambient.mp3` | Background ambient music | Sound manager, toggled via sound icon in Navbar | ✅ Integrated |
| `click.mp3` | UI click sound effect | Button interactions throughout site | ✅ Integrated |
| `hover.mp3` | UI hover sound effect | Hover interactions (currently disabled) | ✅ Integrated |
| `transition.mp3` | Section transition sound | Camera transitions between sections | ✅ Integrated |
| `section.mp3` | Section-specific sounds | Section navigation (currently disabled) | ✅ Integrated |

### LOGO
**Base Path**: `/public/`

| File | Purpose | Used In | Status |
|------|---------|---------|--------|
| `logo.jpg` | Quriv Technologies logo | Navbar, Hero, Footer, Logo Popup Modal | ✅ Integrated |

### FONTS
**Base Path**: `/public/fonts/`

| File | Purpose | Used In | Status |
|------|---------|---------|--------|
| `Moralana DEMO.otf` | Display font for headings | All h1-h6 elements via CSS @font-face | ✅ Integrated |
| `BLKCHCRY.TTF` | Body font for content | Body text via CSS @font-face | ✅ Integrated |

### PARTNER LOGOS
**Base Path**: `/public/partners/`

| File | Partner | Used In | Status |
|------|---------|---------|--------|
| `booking.png` | Booking.com | Partners Marquee section | ✅ Integrated |
| `agoda.png` | Agoda | Partners Marquee section | ✅ Integrated |
| `trip.png` | Trip.com | Partners Marquee section | ✅ Integrated |
| `wego.png` | Wego | Partners Marquee section | ✅ Integrated |
| `laterooms.png` | LateRooms | Partners Marquee section | ✅ Integrated |
| `Clicktripz.png` | ClickTripz | Partners Marquee section | ✅ Integrated |
| `expedia.png` | Expedia | Partners Marquee section | ✅  Required (added to list) |
| `airbnb.png` | Airbnb | Partners Marquee section | ✅  Required (added to list) |
| `hotels.png` | Hotels.com | Partners Marquee section | ✅  Required (added to list) |
| `priceline.png` | Priceline | Partners Marquee section | ✅  Required (added to list) |
| `kayak.png` | KAYAK | Partners Marquee section | ✅  Required (added to list) |
| `hostelworld.png` | Hostelworld | Partners Marquee section | ✅  Required (added to list) |

---

## NON-INTEGRATED MEDIA
*These media assets are referenced in the code but not yet implemented or are placeholders.*

### VIDEOS
**Base Path**: `/public/videos/`

| File | Purpose | Used In | Status |
|------|---------|---------|--------|
| `hero.mp4` | Cinematic background video for hero section | `src/components/HeroVideoEngine.tsx`, `src/components/GlobalVideoBackground.tsx` | ❌ Required |
| `hero.webm` | WebM fallback for browser compatibility | `src/components/HeroVideoEngine.tsx`, `src/components/GlobalVideoBackground.tsx` | ❌ Required |

**Online Fallback**: `https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-and-black-3d-lines-41238-large.mp4`

### GALLERY IMAGES
**Base Path**: `/public/gallery/`

#### Websites Category
**Folder**: `/public/gallery/websites/`

| File | Title | Purpose | Recommended Resolution | Status |
|------|-------|---------|------------------------|--------|
| `website-1.jpg` | High-Concurrency Web Portal | Enterprise Software showcase | 1920x1080px | ❌ Required |
| `website-2.jpg` | Direct-to-Consumer Storefront | E-Commerce showcase | 1920x1080px | ❌ Required |
| `website-3.jpg` | Culinary Brand Property | Food Industry showcase | 1920x1080px | ❌ Required |

#### Dashboards Category
**Folder**: `/public/gallery/dashboards/`

| File | Title | Purpose | Recommended Resolution | Status |
|------|-------|---------|------------------------|--------|
| `dashboard-1.jpg` | Financial Settlement Console | FinTech dashboard showcase | 1920x1080px | ❌ Required |
| `dashboard-2.jpg` | Kitchen Display System | Food Industry KDS showcase | 1920x1080px | ❌ Required |
| `dashboard-3.jpg` | Rate Distribution Gateway | Hospitality dashboard showcase | 1920x1080px | ❌ Required |

#### Guest Portals Category
**Folder**: `/public/gallery/guest-portals/`

| File | Title | Purpose | Recommended Resolution | Status |
|------|-------|---------|------------------------|--------|
| `portal-1.jpg` | Keyless Mobile Guest Portal | Hospitality portal showcase | 1920x1080px | ❌ Required |
| `portal-2.jpg` | Client Wealth Management Portal | FinTech portal showcase | 1920x1080px | ❌ Required |

### INDUSTRY HERO IMAGES
**Base Path**: `/public/industries/`

| File | Industry | Purpose | Recommended Resolution | Status |
|------|----------|---------|------------------------|--------|
| `hospitality-hero.jpg` | Hospitality | Hero section background | 1200x675px (16:9) | ❌ Required |
| `hospitality-gallery-1.jpg` | Hospitality | Gallery item 1 | 1200x675px (16:9) | ❌ Required |
| `hospitality-gallery-2.jpg` | Hospitality | Gallery item 2 | 1200x675px (16:9) | ❌ Required |
| `ecommerce-hero.jpg` | E-Commerce | Hero section background | 1200x675px (16:9) | ❌ Required |
| `ecommerce-gallery-1.jpg` | E-Commerce | Gallery item 1 | 1200x675px (16:9) | ❌ Required |
| `ecommerce-gallery-2.jpg` | E-Commerce | Gallery item 2 | 1200x675px (16:9) | ❌ Required |
| `food-hero.jpg` | Food Industry | Hero section background | 1200x675px (16:9) | ❌ Required |
| `food-gallery-1.jpg` | Food Industry | Gallery item 1 | 1200x675px (16:9) | ❌ Required |
| `food-gallery-2.jpg` | Food Industry | Gallery item 2 | 1200x675px (16:9) | ❌ Required |
| `fintech-hero.jpg` | FinTech | Hero section background | 1200x675px (16:9) | ❌ Required |
| `fintech-gallery-1.jpg` | FinTech | Gallery item 1 | 1200x675px (16:9) | ❌ Required |
| `fintech-gallery-2.jpg` | FinTech | Gallery item 2 | 1200x675px (16:9) | ❌ Required |

**Note**: Currently using Unsplash URLs as placeholders in `src/data/siteData.ts`

### LOCATION IMAGES
**Base Path**: `/public/locations/`

| File | Location | Purpose | Recommended Resolution | Status |
|------|----------|---------|------------------------|--------|
| `alexandria-hq.jpg` | Alexandria, Egypt (Head Office) | Office photo | 1920x1080px | ❌ Required |

**Used In**: `src/components/LocationsShowcase.tsx`

### TEAM PHOTOS
**Base Path**: `/public/team/`

| File | Role | Purpose | Recommended Resolution | Status |
|------|------|---------|------------------------|--------|
| `architect-portrait.jpg` | Lead Software Architect | Team member photo | 400x400px | ❌ Required |

**Used In**: `src/components/TeamShowcase.tsx`

### PROJECT SCREENSHOTS
**Base Path**: `/public/projects/`

| File | Industry | Purpose | Recommended Resolution | Status |
|------|----------|---------|------------------------|--------|
| `website-desktop.jpg` | Hospitality | Website preview desktop | 1920x1080px | ❌ Required |
| `website-tablet.jpg` | Hospitality | Website preview tablet | 1024x768px | ❌ Required |
| `website-mobile.jpg` | Hospitality | Website preview mobile | 375x667px | ❌ Required |
| `website-shot-1.jpg` | Hospitality | Screenshot 1 | 1920x1080px | ❌ Required |
| `website-shot-2.jpg` | Hospitality | Screenshot 2 | 1920x1080px | ❌ Required |
| `website-shot-3.jpg` | Hospitality | Screenshot 3 | 1920x1080px | ❌ Required |
| `portal-shot-1.jpg` | Hospitality | Portal screenshot 1 | 1920x1080px | ❌ Required |
| `portal-shot-2.jpg` | Hospitality | Portal screenshot 2 | 1920x1080px | ❌ Required |
| `portal-shot-3.jpg` | Hospitality | Portal screenshot 3 | 1920x1080px | ❌ Required |
| `dashboard-shot-1.jpg` | Hospitality | Dashboard screenshot 1 | 1920x1080px | ❌ Required |
| `dashboard-shot-2.jpg` | Hospitality | Dashboard screenshot 2 | 1920x1080px | ❌ Required |
| `hotel-1.jpg` | Hospitality | Project 1 main image | 1920x1080px | ❌ Required |
| `hotel-1-a.jpg` | Hospitality | Project 1 gallery 1 | 1920x1080px | ❌ Required |
| `hotel-1-b.jpg` | Hospitality | Project 1 gallery 2 | 1920x1080px | ❌ Required |
| `hotel-1-c.jpg` | Hospitality | Project 1 gallery 3 | 1920x1080px | ❌ Required |
| `hotel-2.jpg` | Hospitality | Project 2 main image | 1920x1080px | ❌ Required |
| `hotel-2-a.jpg` | Hospitality | Project 2 gallery 1 | 1920x1080px | ❌ Required |
| `hotel-2-b.jpg` | Hospitality | Project 2 gallery 2 | 1920x1080px | ❌ Required |
| `hotel-2-c.jpg` | Hospitality | Project 2 gallery 3 | 1920x1080px | ❌ Required |
| `testimonial-1.jpg` | Hospitality | Testimonial photo 1 | 400x400px | ❌ Required |
| `testimonial-2.jpg` | Hospitality | Testimonial photo 2 | 400x400px | ❌ Required |
| `gallery-web-1.jpg` | Hospitality | Gallery carousel web 1 | 1920x1080px | ❌ Required |
| `gallery-web-2.jpg` | Hospitality | Gallery carousel web 2 | 1920x1080px | ❌ Required |
| `gallery-portal-1.jpg` | Hospitality | Gallery carousel portal 1 | 1920x1080px | ❌ Required |
| `gallery-portal-2.jpg` | Hospitality | Gallery carousel portal 2 | 1920x1080px | ❌ Required |
| `gallery-dashboard-1.jpg` | Hospitality | Gallery carousel dashboard 1 | 1920x1080px | ❌ Required |
| `gallery-dashboard-2.jpg` | Hospitality | Gallery carousel dashboard 2 | 1920x1080px | ❌ Required |
| `fintech-portal-1.jpg` | FinTech | Project 1 portal | 1920x1080px | ❌ Required |
| `fintech-dashboard-1.jpg` | FinTech | Project 1 dashboard | 1920x1080px | ❌ Required |
| `fintech-security-1.jpg` | FinTech | Project 1 security | 1920x1080px | ❌ Required |
| `fintech-portal-2.jpg` | FinTech | Project 2 portal | 1920x1080px | ❌ Required |
| `fintech-dashboard-2.jpg` | FinTech | Project 2 dashboard | 1920x1080px | ❌ Required |
| `fintech-security-2.jpg` | FinTech | Project 2 security | 1920x1080px | ❌ Required |
| `food-restaurant-1.jpg` | Food Industry | Project 1 restaurant | 1920x1080px | ❌ Required |
| `food-qr-menu-1.jpg` | Food Industry | Project 1 QR menu | 1920x1080px | ❌ Required |
| `food-kds-1.jpg` | Food Industry | Project 1 KDS | 1920x1080px | ❌ Required |
| `food-restaurant-2.jpg` | Food Industry | Project 2 restaurant | 1920x1080px | ❌ Required |
| `food-qr-menu-2.jpg` | Food Industry | Project 2 QR menu | 1920x1080px | ❌ Required |
| `food-kds-2.jpg` | Food Industry | Project 2 KDS | 1920x1080px | ❌ Required |
| `ecom-store-1.jpg` | E-Commerce | Project 1 store | 1920x1080px | ❌ Required |
| `ecom-mobile-1.jpg` | E-Commerce | Project 1 mobile | 1920x1080px | ❌ Required |
| `ecom-dashboard-1.jpg` | E-Commerce | Project 1 dashboard | 1920x1080px | ❌ Required |
| `ecom-analytics-1.jpg` | E-Commerce | Project 1 analytics | 1920x1080px | ❌ Required |
| `ecom-store-2.jpg` | E-Commerce | Project 2 store | 1920x1080px | ❌ Required |
| `ecom-mobile-2.jpg` | E-Commerce | Project 2 mobile | 1920x1080px | ❌ Required |
| `ecom-dashboard-2.jpg` | E-Commerce | Project 2 dashboard | 1920x1080px | ❌ Required |
| `ecom-analytics-2.jpg` | E-Commerce | Project 2 analytics | 1920x1080px | ❌ Required |

**Used In**: `src/components/HospitalitySolutions.tsx`, `src/components/FintechSolutions.tsx`, `src/components/FoodIndustrySolutions.tsx`, `src/components/EcommerceSolutions.tsx`

---

## CONTACT INFORMATION
*Placeholder emails and contact details*

| Email | Location | Purpose |
|-------|----------|---------|
| `contact@quriv.com` | Contact section, Footer | General contact |
| `cto@quriv.com` | Team section | CTO contact |
| `architecture@quriv.com` | Team section | Architecture team |
| `design@quriv.com` | Team section | Design team |
| `cloud@quriv.com` | Team section | Cloud team |
| `alexandria@quriv.com` | Locations section | Alexandria office |

---


