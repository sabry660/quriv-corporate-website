## VIDEOS
### Hero Background Video
**File**: `/public/videos/hero-placeholder.mp4`
**Purpose**: Cinematic background video for the hero section
**Used In**: `src/components/HeroVideoEngine.tsx`
**Required Format**: MP4, H.264 codec, 1920x1080 resolution, loop-capable, muted autoplay
**Fallback**: `/public/videos/hero-placeholder.webm` (WebM format for browser compatibility)
**Online Fallback**: `https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-and-black-3d-lines-41238-large.mp4`
---
## GALLERY
### Gallery Images Structure
**Base Path**: `/public/gallery/`
### Websites Category
**Folder**: `/public/gallery/websites/`
| File | Title | Purpose | Recommended Resolution |
|------|-------|---------|------------------------|
| `website-1.jpg` | High-Concurrency Web Portal | Enterprise Software showcase | 1920x1080px |
| `website-2.jpg` | Direct-to-Consumer Storefront | E-Commerce showcase | 1920x1080px |
| `website-3.jpg` | Culinary Brand Property | Food Industry showcase | 1920x1080px |
### Dashboards Category
**Folder**: `/public/gallery/dashboards/`
| File | Title | Purpose | Recommended Resolution |
|------|-------|---------|------------------------|
| `dashboard-1.jpg` | Financial Settlement Console | FinTech dashboard showcase | 1920x1080px |
| `dashboard-2.jpg` | Kitchen Display System | Food Industry KDS showcase | 1920x1080px |
| `dashboard-3.jpg` | Rate Distribution Gateway | Hospitality dashboard showcase | 1920x1080px |
### Guest Portals Category

**Folder**: `/public/gallery/guest-portals/`

| File | Title | Purpose | Recommended Resolution |
|------|-------|---------|------------------------|
| `portal-1.jpg` | Keyless Mobile Guest Portal | Hospitality portal showcase | 1920x1080px |
| `portal-2.jpg` | Client Wealth Management Portal | FinTech portal showcase | 1920x1080px |
#videos Category
---------------------------------------------------------
## PROJECTS

### Industry Project Images

**Base Path**: Referenced via Unsplash URLs in `src/data/siteData.ts`

The following industries have hero images that can be replaced with local assets:

| Industry | Current URL | Suggested Local Path |
|----------|-------------|---------------------|
| Hospitality | `https://images.unsplash.com/photo-1566073771259-6a8506099945` | `/public/industries/hospitality-hero.jpg` |
| E-Commerce | `https://images.unsplash.com/photo-1556742049-0a67dd3952d7` | `/public/industries/ecommerce-hero.jpg` |
| Food Industry | `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4` | `/public/industries/food-hero.jpg` |
| FinTech | `https://images.unsplash.com/photo-1559526324-4b87b5e36e44` | `/public/industries/fintech-hero.jpg` |

**Gallery Images by Industry** (also Unsplash URLs, can be localized):

- Hospitality: 2 gallery images
- E-Commerce: 2 gallery images
- Food Industry: 2 gallery images
- FinTech: 2 gallery images

**Used In**: `src/data/siteData.ts` (DETAILED_INDUSTRIES_DATA)

**Recommended Size**: 1200x675px (16:9 aspect ratio)

---


## INDUSTRIES

### Industry Placeholder Images

**Base Path**: `/public/industries/`

Currently using Unsplash URLs. Can be replaced with local assets:

| Suggested File | Industry | Purpose |
|-----------------|----------|---------|
| `hospitality-hero.jpg` | Hospitality | Hero section background |
| `hospitality-gallery-1.jpg` | Hospitality | Gallery item 1 |
| `hospitality-gallery-2.jpg` | Hospitality | Gallery item 2 |
| `ecommerce-hero.jpg` | E-Commerce | Hero section background |
| `ecommerce-gallery-1.jpg` | E-Commerce | Gallery item 1 |
| `ecommerce-gallery-2.jpg` | E-Commerce | Gallery item 2 |
| `food-hero.jpg` | Food Industry | Hero section background |
| `food-gallery-1.jpg` | Food Industry | Gallery item 1 |
| `food-gallery-2.jpg` | Food Industry | Gallery item 2 |
| `fintech-hero.jpg` | FinTech | Hero section background |
| `fintech-gallery-1.jpg` | FinTech | Gallery item 1 |
| `fintech-gallery-2.jpg` | FinTech | Gallery item 2 |

**Used In**: `src/data/siteData.ts` (DETAILED_INDUSTRIES_DATA)

**Recommended Resolution**: 1200x675px (16:9)
---
## LINKS


### Placeholder Emails

| Email | Location | Purpose |
|-------|----------|---------|
| `contact@quriv.com` | Contact section, Footer | General contact |
| `cto@quriv.com` | Team section | CTO contact |
| `architecture@quriv.com` | Team section | Architecture team |
| `design@quriv.com` | Team section | Design team |
| `cloud@quriv.com` | Team section | Cloud team |
| `alexandria@quriv.com` | Locations section | Alexandria office |


## FORMS



### Hospitality Industry Form Fields

**Location**: `src/components/HospitalitySolutions.tsx`

| Field Name | Type | Placeholder | Backend Integration Required |
|------------|------|-------------|------------------------------|
| `fullName` | Text | "e.g. Alexander Vance" | Yes - Lead capture |
| `company` | Text | "e.g. Grand Horizon Hotel Group" | Yes - Lead capture |
| `email` | Email | "alexander@enterprise.com" | Yes - Lead capture |
| `phone` | Tel | "+1 (555) 000-0000" | Yes - Lead capture |
| `propertySize` | Text | "e.g. 150 rooms" | Yes - Qualification |
| `currentPMS` | Text | "e.g. Opera, CloudBeds" | Yes - Technical assessment |

---
## LOCATIONS
### Location Images
**Base Path**: `/public/locations/`
| File | Location | Purpose | Recommended Resolution |
|------|----------|---------|------------------------|
| `alexandria-hq.jpg` | Alexandria, Egypt (Head Office) | Office photo | 1920x1080px |
**Used In**: `src/components/LocationsShowcase.tsx`

